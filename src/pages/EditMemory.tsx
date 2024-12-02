import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMemory, updateMemory } from '../services/memoryService'
import { MemoryForm } from '../components/MemoryForm'
import { Memory } from '../types/memory'

const EditMemory = () => {
  const [memory, setMemory] = useState<Memory | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchMemory = async () => {
      if (id) {
        try {
          setLoading(true)
          const memoryData = await getMemory(id)
          setMemory(memoryData)
        } catch (err) {
          setError('Failed to fetch memory')
        } finally {
          setLoading(false)
        }
      }
    }
    fetchMemory()
  }, [id])

  const handleSubmit = async (updatedMemory: Omit<Memory, 'id'>) => {
    if (id && memory) {
      try {
        setLoading(true)
        // Add the 'id' back to the updated memory before sending it to updateMemory
        await updateMemory({ ...updatedMemory, id })
        navigate('/') // Redirect after update
      } catch (err) {
        setError('Failed to update memory')
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading) return <p>Loading memory...</p>

  return (
    <div>
      <h1 className='text-2xl font-bold text-center py-6'>Edit Memory</h1>
      {error && <p className='text-red-500'>{error}</p>}
      {memory && (
        <MemoryForm
          onSubmit={handleSubmit}
          loading={loading}
          initialValues={memory} // memory contains the id here
        />
      )}
    </div>
  )
}

export default EditMemory
