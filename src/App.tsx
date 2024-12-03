import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { CreateMemory } from './pages/CreateMemory'
import EditMemory from './pages/EditMemory'
import { MemoryPage } from './pages/MemoryPage'

const App = () => {
  return (
    <Router>
      <div className='container mx-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateMemory />} />
          <Route path='/edit/:id' element={<EditMemory />} />
          <Route path='/memory/:id' element={<MemoryPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
