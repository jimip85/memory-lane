import { Memory } from '../types/memory'

interface MemoryItemProps {
  memory: Memory
  onDelete: (id: string) => void
  onEdit: (memory: Memory) => void
}

export const MemoryItem = ({ memory, onDelete, onEdit }: MemoryItemProps) => {
  const formattedDate = new Date(memory.timestamp).toLocaleDateString('en-US', {
    timeZone: 'UTC', // Use UTC timezone to avoid any local timezone offset
  })

  return (
    <div className='p-6 bg-gray-900 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
      <h3 className='text-2xl font-semibold'>{memory.name}</h3>
      <p className='text-sm text-gray-400 mt-2'>{memory.description}</p>
      <div className='mt-4 overflow-hidden rounded-lg shadow-sm'>
        <img
          src={memory.image_url}
          alt={memory.name}
          className='w-full h-56 object-cover transition-transform duration-300 hover:scale-105'
        />
      </div>
      <p className='text-sm text-gray-500 mt-4'>{formattedDate}</p>
      <div className='mt-4 flex justify-between items-center space-x-6'>
        <button
          onClick={() => onEdit(memory)}
          className='px-6 py-2 bg-transparent text-white border-2 border-blue-500 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-gray-900'
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(memory.id)}
          className='px-6 py-2 bg-transparent text-white border-2 border-red-500 rounded-md transition-all duration-300 hover:bg-red-500 hover:text-gray-900'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
