import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMemory } from '../services/memoryService'
import { MemoryForm } from '../components/MemoryForm'
import { Memory } from '../types/memory'

export const CreateMemory = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (
    memory: Omit<Memory, 'id' | 'image_url'>,
    imageFile: File | null
  ) => {
    try {
      setLoading(true)

      // Call the service function directly
      await createMemory(memory, imageFile)

      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Failed to create memory. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-white text-center py-6'>
        Create New Memory
      </h1>
      {error && <p className='text-red-500'>{error}</p>}
      <MemoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
