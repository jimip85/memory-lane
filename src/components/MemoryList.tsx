import { Memory } from '../types/memory'
import { MemoryItem } from './MemoryItem'

interface MemoryListProps {
  memories: Memory[]
  onDelete: (id: string) => void
  onEdit: (memory: Memory) => void
}

export const MemoryList = ({ memories, onDelete, onEdit }: MemoryListProps) => {
  return (
    <ul className='space-y-4'>
      {memories.map((memory) => (
        <li key={memory.id}>
          <MemoryItem memory={memory} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}
