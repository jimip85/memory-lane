const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
const port = 4001
const upload = require('./src/utils/fileUpload')

// SQLite Database Initialization
const db = new sqlite3.Database('memories.db')

// Middleware
app.use(cors())
app.use(express.json())
app.use(
  '/uploads',
  express.static(path.join(__dirname, './src/assets/uploads'))
)

// Create memories table with image_url column
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      timestamp TEXT,
      image_url TEXT
    )
  `)
})

// Fetch all memories, including image_url
app.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories ORDER BY timestamp DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ memories: rows })
  })
})

// Create a new memory with image_url
app.post('/memories', upload.single('image'), (req, res) => {
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    return res.status(400).json({
      error: 'Please provide all fields: name, description, and timestamp',
    })
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, image_url) VALUES (?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, imageUrl, (err) => {
    stmt.finalize()
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res
      .status(201)
      .json({ success: true, message: 'Memory created successfully' })
  })
})

// Fetch a single memory by ID, including image_url
app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (!row) {
      return res.status(404).json({ error: 'Memory not found' })
    }
    res.json({ memory: row })
  })
})

// Update an existing memory, including image_url
app.put('/memories/:id', upload.single('image'), (req, res) => {
  const { id } = req.params
  const { name, description, timestamp } = req.body

  if (!name || !description || !timestamp) {
    return res.status(400).json({
      error: 'Please provide all fields: name, description, and timestamp',
    })
  }

  let imageUrl = req.file ? `/uploads/${req.file.filename}` : null

  // Retain the old image if no new one is uploaded
  db.get('SELECT image_url FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (!imageUrl) {
      imageUrl = row?.image_url // Use existing image URL
    }

    const stmt = db.prepare(
      'UPDATE memories SET name = ?, description = ?, timestamp = ?, image_url = ? WHERE id = ?'
    )

    stmt.run(name, description, timestamp, imageUrl, id, (err) => {
      stmt.finalize()
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ success: true, message: 'Memory updated successfully' })
    })
  })
})

// Delete a memory by ID
app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ success: true, message: 'Memory deleted successfully' })
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
