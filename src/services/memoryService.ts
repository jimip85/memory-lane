import { Memory } from "../types/memory"

const BASE_URL = 'http://localhost:4001/memories'
  
export const getMemories = async (): Promise<Memory[]> => {
  const response = await fetch(BASE_URL)
  if (!response.ok) throw new Error('Failed to fetch memories')
  const data = await response.json()
  return data.memories
}

export const getMemory = async (id: string): Promise<Memory> => {
  const response = await fetch(`${BASE_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch memory')
  const data = await response.json()
  return data.memory 
}

export const createMemory = async (memory: Omit<Memory, 'id'>): Promise<Memory> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memory),
  })
  if (!response.ok) throw new Error('Failed to create memory')
  return response.json()
}

export const updateMemory = async (memory: Memory): Promise<Memory> => {
  const response = await fetch(`${BASE_URL}/${memory.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memory),
  })
  if (!response.ok) throw new Error('Failed to update memory')
  return response.json()
}

export const deleteMemory = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete memory')
}
