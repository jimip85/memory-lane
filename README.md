# Memory Lane

Memory Lane is a web application designed to help users relive and manage their cherished moments. It allows users to create, view, edit, and delete memories, with features to sort and share them effortlessly. The application is built with React and leverages modern design principles and accessibility standards.

## Features

- **Memory Management**: Create, view, edit, and delete memories.
- **Sorting**: Sort memories by date in ascending or descending order.
- **Universal Link Navigation**: Quickly navigate to a universal link service.
- **Responsive Design**: Optimized for all devices.
- **Accessibility**: Proper ARIA labels and focus indicators.

## Application Structure

### Key Components
- **`Home`**: Fetches and displays memories, with controls for sorting, editing, and deleting.
- **SortDropdown**: Dropdown for sorting memories.
- **MemoryList**: Renders the list of memories.
- **Button**: Reusable button for various actions.

### Service Layer
- **`getMemories`**: Fetches memories from the backend.
- **`deleteMemory`**: Deletes a memory by its ID.

## Usage

### Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run serve:api
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open `http://localhost:5173` in your browser.

### Interacting with the App
- **New Memory**: Create a memory by clicking "New Memory" and filling out details.
- **Sort Memories**: Use the dropdown to sort memories by date.
- **Share Memories**: Click "Universal Link" to share your memories.


