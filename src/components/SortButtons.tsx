import Button from './ui/Button'

interface SortButtonsProps {
  onSort: (order: 'asc' | 'desc') => void
}

export const SortButtons = ({ onSort }: SortButtonsProps) => {
  return (
    <div className='flex space-x-4 justify-center'>
      <Button
        onClick={() => onSort('asc')}
        label='Sort Ascending'
        backgroundColor='bg-blue-600'
      />
      <Button
        onClick={() => onSort('desc')}
        label='Sort Descending'
        backgroundColor='bg-red-600'
      />
    </div>
  )
}
