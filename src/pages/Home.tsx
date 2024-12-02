import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { Link } from 'react-router-dom'
import { getMemories, deleteMemory } from '../services/memoryService'
import { SortButtons } from '../components/SortButtons'
import { MemoryList } from '../components/MemoryList'
import { Memory } from '../types/memory'

export const Home = () => {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate() // Initialize navigate

  useEffect(() => {
    const fetchMemoriesData = async () => {
      try {
        const memoriesData = await getMemories()
        setMemories(memoriesData)
      } catch (err) {
        setError((err as Error).message || 'Failed to load memories')
      } finally {
        setLoading(false)
      }
    }

    fetchMemoriesData()
  }, [])

  const sortMemories = (order: 'asc' | 'desc') => {
    const sortedMemories = [...memories]
    sortedMemories.sort((a, b) => {
      const dateA = new Date(a.timestamp)
      const dateB = new Date(b.timestamp)

      return order === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
    setMemories(sortedMemories)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMemory(id) // Delete memory from the backend
      setMemories(memories.filter((memory) => memory.id !== id)) // Remove from state
    } catch (error) {
      setError('Failed to delete memory')
    }
  }

  const handleEdit = (memory: Memory) => {
    navigate(`/edit/${memory.id}`) // Navigate to the EditMemory page with the memory's id
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-center py-6'>Memory Gallery</h1>
      {loading && <p>Loading memories...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      <div className='flex justify-between items-center mb-4'>
        <SortButtons onSort={sortMemories} />
        <Link to='/create'>
          <button className='bg-blue-500 text-white p-3 rounded-md'>
            Create New Memory
          </button>
        </Link>
      </div>
      <MemoryList
        memories={memories}
        onDelete={handleDelete}
        onEdit={handleEdit} // Pass handleEdit to MemoryList
      />
    </div>
  )
}
