import { useState } from 'react'

interface SortDropdownProps {
  onSort: (order: 'asc' | 'desc') => void
}

export const SortDropdown = ({ onSort }: SortDropdownProps) => {
  const [currentSort, setCurrentSort] = useState<'asc' | 'desc'>('desc')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as 'asc' | 'desc'
    setCurrentSort(newSort)
    onSort(newSort)
  }

  return (
    <div className='flex justify-center'>
      <label htmlFor='sort-dropdown' className='sr-only'>
        Sort
      </label>
      <select
        id='sort-dropdown'
        value={currentSort}
        onChange={handleChange}
        className={`p-3 border rounded-md shadow-sm focus:outline-none focus:ring ${
          currentSort === 'desc'
            ? 'bg-amber-500 hover:bg-amber-600'
            : 'bg-slate-600 hover:bg-slate-700'
        }`}
        aria-label='Sort options'
      >
        <option value='desc'>New to Old</option>
        <option value='asc'>Old to New</option>
      </select>
    </div>
  )
}
