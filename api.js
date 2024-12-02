const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')

app.use(cors())
app.use(express.json())

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
  db.all('SELECT * FROM memories', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ memories: rows })
  })
})

// Create a new memory with image_url
app.post('/memories', (req, res) => {
  const { name, description, timestamp, image_url } = req.body

  if (!name || !description || !timestamp || !image_url) {
    res.status(400).json({
      error:
        'Please provide all fields: name, description, timestamp, and image_url',
    })
    return
  }

  const stmt = db.prepare(
    'INSERT INTO memories (name, description, timestamp, image_url) VALUES (?, ?, ?, ?)'
  )
  stmt.run(name, description, timestamp, image_url, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
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
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

// Update an existing memory, including image_url
app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { name, description, timestamp, image_url } = req.body

  if (!name || !description || !timestamp || !image_url) {
    res.status(400).json({
      error:
        'Please provide all fields: name, description, timestamp, and image_url',
    })
    return
  }

  const stmt = db.prepare(
    'UPDATE memories SET name = ?, description = ?, timestamp = ?, image_url = ? WHERE id = ?'
  )
  stmt.run(name, description, timestamp, image_url, id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ success: true, message: 'Memory updated successfully' })
  })
})

// Delete a memory by ID
app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ success: true, message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
