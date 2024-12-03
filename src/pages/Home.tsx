import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMemories, deleteMemory } from '../services/memoryService'
import { SortDropdown } from '../components/SortDropdown'
import { MemoryList } from '../components/MemoryList'
import Button from '../components/ui/Button'
import { Memory } from '../types/memory'
import { FaClipboardCheck, FaShareAlt } from 'react-icons/fa'

export const Home = () => {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchMemoriesData = async () => {
      try {
        const memoriesData = await getMemories()
        setMemories(memoriesData)
      } catch (err) {
        setError('Failed to load memories. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchMemoriesData()
  }, [])

  const sortMemories = (order: 'asc' | 'desc') => {
    const sorted = [...memories].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return order === 'asc' ? dateA - dateB : dateB - dateA
    })
    setMemories(sorted)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMemory(id)
      setMemories((prev) => prev.filter((memory) => memory.id !== id))
    } catch (err) {
      setError('Failed to delete memory.')
    }
  }

  const handleEdit = (memory: Memory) => {
    navigate(`/edit/${memory.id}`)
  }

  const handleCopyLink = async () => {
    try {
      const shareableLink = `${window.location.origin}`
      await navigator.clipboard.writeText(shareableLink)
      alert('copied link to clipboard')
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Reset icon after 2 seconds
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className='bg-gray-900 text-white'>
      {/* Page Container */}
      <div className='max-w-4xl mx-auto p-6 space-y-8'>
        {/* Header Section */}
        <header className='text-center'>
          <h1 className='text-4xl font-bold'>Memory Lane</h1>

          <div className='flex justify-center space-x-5'>
            <p className='text-gray-400 mt-2'>
              Relive and manage your most cherished moments.
            </p>
            <button
              onClick={handleCopyLink}
              aria-label={`Share Link"`}
              className=' animate-pulse top-3 right-3 p-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 hover:text-white'
            >
              {isCopied ? (
                <FaClipboardCheck
                  size={18}
                  className='text-green-400 hover:text-green-500'
                />
              ) : (
                <FaShareAlt
                  size={18}
                  className='text-gray-300 hover:text-white'
                />
              )}
            </button>
          </div>
        </header>

        {/* Sort and New Memory Button */}
        <div className='flex justify-between items-center'>
          {/* Sort Dropdown */}
          <SortDropdown onSort={sortMemories} />

          {/* Button Container */}
          <div>
            <Button
              onClick={() => navigate('/create')}
              label='New Memory'
              backgroundColor='bg-amber-500 hover:bg-amber-600'
              ariaLabel='Create a new memory'
            />
          </div>
        </div>

        {/* Memory List */}
        {loading ? (
          <p className='text-center text-gray-400'>Loading memories...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : (
          <MemoryList
            memories={memories}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  )
}
