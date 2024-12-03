import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMemory, updateMemory } from '../services/memoryService'
import { MemoryForm } from '../components/MemoryForm'
import { Memory } from '../types/memory'

const EditMemory = () => {
  const [memory, setMemory] = useState<Memory | null>(null)
  const [fetching, setFetching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchMemory = async () => {
      if (id) {
        try {
          setFetching(true)
          const memoryData = await getMemory(id)
          setMemory(memoryData)
        } catch (err) {
          setError('Failed to fetch memory')
        } finally {
          setFetching(false)
        }
      }
    }
    fetchMemory()
  }, [id])

  const handleSubmit = async (
    updatedMemory: Omit<Memory, 'id' | 'image_url'>,
    imageFile: File | null
  ) => {
    setError(null) // Reset error before submission
    if (id) {
      try {
        setLoading(true)
        await updateMemory({ ...updatedMemory, id }, imageFile)
        navigate('/')
      } catch (err: any) {
        setError(err.message || 'Failed to update memory. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  if (fetching) return <p>Loading memory...</p>

  return (
    <div>
      <h1 className='text-2xl text-white font-bold text-center py-6'>
        Edit Memory
      </h1>
      {error && <p className='text-red-500'>{error}</p>}
      {memory && (
        <MemoryForm
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={memory}
        />
      )}
    </div>
  )
}

export default EditMemory
