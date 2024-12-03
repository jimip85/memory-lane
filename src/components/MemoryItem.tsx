import { useNavigate } from 'react-router-dom'
import { Memory } from '../types/memory'
import { FaShareAlt, FaClipboardCheck } from 'react-icons/fa'
import Button from './ui/Button'
import { useState } from 'react'

interface MemoryItemProps {
  memory: Memory
  onDelete: (id: string) => void
  onEdit: (memory: Memory) => void
}

export const MemoryItem = ({ memory, onDelete, onEdit }: MemoryItemProps) => {
  const navigate = useNavigate()
  const [isCopied, setIsCopied] = useState(false)

  // Format the timestamp for display
  const formattedDate = new Date(memory.timestamp).toLocaleDateString('en-US', {
    timeZone: 'UTC', // Standardized timezone
  })

  const handleCopyLink = async () => {
    try {
      const shareableLink = `${window.location.origin}/memory/${memory.id}`
      await navigator.clipboard.writeText(shareableLink)
      alert('copied link to clipboard')
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Reset icon after 2 seconds
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const BASE_URL = 'http://localhost:4001'

  // Navigate to the memory detail page
  const handleNavigateToDetail = () => {
    navigate(`/memory/${memory.id}`)
  }

  const handleShareButtonClick = () => {
    handleNavigateToDetail()
    handleCopyLink()
  }

  return (
    <article
      className='relative max-w-md mx-auto p-4 sm:p-6 bg-gray-800 text-white rounded-lg shadow-lg delay-150 hover:shadow-2xl transition-transform duration-300 hover:scale-105'
      aria-labelledby={`memory-title-${memory.id}`}
    >
      {/* Universal Link Button */}
      <button
        onClick={handleShareButtonClick}
        aria-label={`View details for "${memory.name}"`}
        className='absolute animate-pulse top-3 right-3 p-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 hover:text-white transition'
      >
        {isCopied ? (
          <FaClipboardCheck
            size={18}
            className='text-green-400 hover:text-green-500'
          />
        ) : (
          <FaShareAlt size={18} className='text-gray-300 hover:text-white' />
        )}
      </button>

      {/* Memory Title */}
      <h3
        id={`memory-title-${memory.id}`}
        className='text-2xl font-semibold truncate'
      >
        {memory.name}
      </h3>

      {/* Memory Description */}
      <p className='text-sm text-gray-400 mt-2 line-clamp-2'>
        {memory.description}
      </p>

      {/* Memory Image */}
      <div className='mt-4 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-sm'>
        <img
          src={`${BASE_URL}${memory.image_url}`}
          alt={`Image of memory titled "${memory.name}"`}
          className='object-cover w-full h-full'
          loading='lazy'
        />
      </div>

      {/* Memory Timestamp */}
      <p className='text-sm text-gray-500 mt-4'>{formattedDate}</p>

      {/* Edit and Delete Buttons */}
      <div className='mt-4 flex justify-between items-center space-x-4'>
        <Button
          onClick={() => onEdit(memory)}
          label='Edit'
          backgroundColor='bg-amber-500 hover:bg-amber-600'
          ariaLabel={`Edit memory titled "${memory.name}"`}
        />
        <Button
          onClick={() => onDelete(memory.id)}
          label='Delete'
          backgroundColor='bg-gray-700 hover:bg-gray-800'
          ariaLabel={`Delete memory titled "${memory.name}"`}
        />
      </div>
    </article>
  )
}
