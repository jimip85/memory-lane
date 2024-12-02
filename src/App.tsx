import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { CreateMemory } from './pages/CreateMemory'
import EditMemory from './pages/EditMemory'

const App = () => {
  return (
    <Router>
      <div className='container mx-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateMemory />} />
          <Route path='/edit/:id' element={<EditMemory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
