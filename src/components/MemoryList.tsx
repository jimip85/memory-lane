import { Memory } from '../types/memory'
import { MemoryItem } from './MemoryItem'

interface MemoryListProps {
  memories: Memory[]
  onDelete: (id: string) => void
  onEdit: (memory: Memory) => void
}

export const MemoryList = ({ memories, onDelete, onEdit }: MemoryListProps) => {
  return (
    <ul className='space-y-8'>
      {memories.map((memory, index) => (
        <li
          key={memory.id}
          className='animate-fade-in-down'
          style={{
            animationFillMode: 'forwards',
          }}
        >
          <MemoryItem memory={memory} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}
