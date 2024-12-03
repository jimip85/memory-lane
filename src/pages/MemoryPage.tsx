import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMemory } from '../services/memoryService'
import { Memory } from '../types/memory'
import Button from '../components/ui/Button'

export const MemoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [memory, setMemory] = useState<Memory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        if (!id) throw new Error('Memory ID is missing.')
        const fetchedMemory = await getMemory(id)
        setMemory(fetchedMemory)
      } catch (err) {
        setError('Failed to load memory.')
      } finally {
        setLoading(false)
      }
    }
    fetchMemory()
  }, [id])

  if (loading)
    return <p className='text-center text-gray-500'>Loading memory...</p>
  if (error) return <p className='text-center text-red-500'>{error}</p>
  if (!memory)
    return <p className='text-center text-gray-500'>Memory not found.</p>

  const BASE_URL = 'http://localhost:4001'

  return (
    <div className='flex items-center justify-center min-h-screen w-full p-4'>
      {/* Memory Card */}
      <div className='flex flex-col w-full max-w-3xl dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105'>
        {/* Memory Image */}
        <div className='relative w-full'>
          <img
            src={`${BASE_URL}${memory.image_url}`}
            alt={memory.name}
            className='w-full h-auto rounded-t-lg object-cover'
            loading='lazy'
          />
        </div>

        {/* Memory Content */}
        <div className='p-6 space-y-4'>
          {/* Memory Title */}
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white text-center'>
            {memory.name}
          </h1>

          {/* Memory Description */}
          <p className='text-gray-800 dark:text-gray-300 text-lg text-center'>
            {memory.description}
          </p>

          {/* Memory Timestamp */}
          <p className='text-gray-600 dark:text-gray-400 text-sm text-center'>
            {new Date(memory.timestamp).toLocaleDateString('en-US', {
              timeZone: 'UTC',
            })}
          </p>

          {/* Back Button */}
          <div className='flex justify-center pt-4'>
            <Button
              onClick={() => navigate('/')}
              label='Back to Home'
              backgroundColor='bg-amber-500 hover:bg-amber-600'
              ariaLabel='Go back to the home page'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
