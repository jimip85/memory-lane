import { useState, useEffect } from 'react'
import Button from './ui/Button'
import { Memory } from '../types/memory'

export interface MemoryFormProps {
  onSubmit: (
    memory: Omit<Memory, 'id' | 'image_url'>,
    imageFile: File | null
  ) => void
  loading: boolean
  initialValues?: Memory
}

export const MemoryForm = ({
  onSubmit,
  loading,
  initialValues,
}: MemoryFormProps) => {
  const [newMemory, setNewMemory] = useState<Omit<Memory, 'id' | 'image_url'>>({
    name: '',
    description: '',
    timestamp: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialValues) {
      setNewMemory({
        name: initialValues.name,
        description: initialValues.description,
        timestamp: initialValues.timestamp.split('T')[0], // Adjust for date input
      })
    }
  }, [initialValues])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNewMemory((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      const maxFileSize = 5 * 1024 * 1024 // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG, PNG, or GIF files are allowed.')
        return
      }

      if (file.size > maxFileSize) {
        alert('File size must be less than 5MB.')
        return
      }

      setImageFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { name, description, timestamp } = newMemory

    if (!name || !description || !timestamp) {
      alert('All fields are required.')
      return
    }

    onSubmit(newMemory, imageFile)
  }

  return (
    <form className='space-y-4 '>
      <label className='block text-white'>
        Title:
        <input
          type='text'
          name='name'
          value={newMemory.name}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none'
          required
        />
      </label>

      <label className='block text-white'>
        Description:
        <textarea
          name='description'
          value={newMemory.description}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none'
          required
        />
      </label>

      <label className='block text-white'>
        Image:
        <div className='mt-2 flex items-center space-x-4'>
          <input
            id='file-upload'
            type='file'
            name='image'
            onChange={handleFileChange}
            className='hidden'
          />
          <label
            htmlFor='file-upload'
            className='cursor-pointer inline-flex items-center  px-6 py-2 text-sm font-medium text-white bg-black rounded-md shadow-sm hover:ring-2 hover:ring-opacity-50 hover:ring-[#050708] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition'
          >
            Upload Image
          </label>
          {imageFile && (
            <span className='text-white text-sm truncate max-w-[10rem]'>
              {imageFile.name}
            </span>
          )}
        </div>
      </label>

      <label className='block text-white'>
        Date:
        <input
          type='date'
          name='timestamp'
          value={newMemory.timestamp}
          onChange={handleChange}
          className='mt-1 block w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none'
          required
        />
      </label>

      <Button
        onClick={handleSubmit}
        label={loading ? 'Saving...' : 'Submit'}
        backgroundColor='bg-black'
      />
    </form>
  )
}
