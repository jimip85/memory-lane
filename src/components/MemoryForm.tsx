import { useState, useEffect } from 'react'
import Button from './ui/Button'
import { Memory } from '../types/memory'

export interface MemoryFormProps {
  onSubmit: (memory: Omit<Memory, 'id'>) => void
  loading: boolean
  initialValues?: Memory
}

export const MemoryForm = ({
  onSubmit,
  loading,
  initialValues,
}: MemoryFormProps) => {
  const [newMemory, setNewMemory] = useState<Omit<Memory, 'id'>>({
    name: '',
    description: '',
    image_url: '',
    timestamp: '',
  })

  // Use useEffect to update state whenever initialValues change
  useEffect(() => {
    if (initialValues) {
      setNewMemory({
        name: initialValues.name,
        description: initialValues.description,
        image_url: initialValues.image_url,
        timestamp: initialValues.timestamp
          ? new Date(initialValues.timestamp).toISOString().split('T')[0]
          : '',
      })
    }
  }, [initialValues])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNewMemory((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, description, image_url, timestamp } = newMemory

    if (!name || !description || !image_url || !timestamp) {
      alert('All fields are required to create a new memory.')
      return
    }

    onSubmit(newMemory)
    setNewMemory({ name: '', description: '', image_url: '', timestamp: '' }) // Reset form after submission
  }

  return (
    <form className='space-y-4'>
      <label className='block text-gray-700'>
        Title:
        <input
          type='text'
          name='name'
          value={newMemory.name}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#050708] focus:outline-none hover:ring-2 hover:ring-[#050708] hover:ring-opacity-50'
          required
        />
      </label>

      <label className='block text-gray-700'>
        Description:
        <textarea
          name='description'
          value={newMemory.description}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#050708] focus:outline-none hover:ring-2 hover:ring-[#050708] hover:ring-opacity-50'
          required
        />
      </label>

      <label className='block text-gray-700'>
        Image URL:
        <input
          type='text'
          name='image_url'
          value={newMemory.image_url}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#050708] focus:outline-none hover:ring-2 hover:ring-[#050708] hover:ring-opacity-50'
          required
        />
      </label>

      <label className='block text-gray-700'>
        Date:
        <input
          type='date'
          name='timestamp'
          value={newMemory.timestamp}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#050708] focus:outline-none hover:ring-2 hover:ring-[#050708] hover:ring-opacity-50'
          required
        />
      </label>

      <Button
        onClick={handleSubmit}
        label={loading ? 'Saving...' : 'Create Memory'}
        backgroundColor='bg-black'
      />
    </form>
  )
}
