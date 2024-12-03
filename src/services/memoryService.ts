import { Memory } from "../types/memory";

const BASE_URL = "http://localhost:4001/memories";

// Helper function to create FormData
const createFormData = (memory: Omit<Memory, 'id'>, file: File | null): FormData => {
  const formData = new FormData();
  formData.append("name", memory.name);
  formData.append("description", memory.description);
  formData.append("timestamp", memory.timestamp);
  if (file) formData.append("image", file);
  return formData;
};

// Fetch all memories
export const getMemories = async (): Promise<Memory[]> => {
  const response = await fetch(BASE_URL, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data.memories;
};

// Fetch a single memory by ID
export const getMemory = async (id: string): Promise<Memory> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data.memory;
};

// Create a new memory with image
export const createMemory = async (
  memory: Omit<Memory, 'id'>,
  file: File | null
): Promise<Memory> => {
  const formData = createFormData(memory, file);
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// Update an existing memory with image
export const updateMemory = async (
  memory: Memory,
  file: File | null
): Promise<Memory> => {
  const formData = createFormData(memory, file);
  const response = await fetch(`${BASE_URL}/${memory.id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// Delete a memory by ID
export const deleteMemory = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
};
