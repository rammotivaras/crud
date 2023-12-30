import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3006";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null); // New state to track the selected item
  const [status, setStatus] = useState("");
  const [itemStatus, setitemStatus] = useState("pending");
  console.log(selectedItemId, "selectedItemId");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("Error fetching data");
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API_BASE_URL}/items`, { text: newItemText });
      setNewItemText("");
      setStatus("Item created successfully");
      fetchData();
    } catch (error) {
      console.error("Error creating item:", error);
      setStatus("Error creating item");
    }
  };

  const handleUpdate = async (itemId, newText) => {
    try {
      await axios.put(`${API_BASE_URL}/items/${itemId}`, { text: newText,status:itemStatus });
      setStatus(`Item with ID ${itemId} updated successfully`);
      fetchData();
      setSelectedItemId(null); // Reset selected item after updating
    } catch (error) {
      console.error("Error updating item:", error);
      setStatus("Error updating item");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/items/${itemId}`);
      setStatus(`Item with ID ${itemId} deleted successfully`);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setStatus("Error deleting item");
    }
  };

  const handleEdit = (itemId) => {
    // Set the selected item ID when the "Edit" button is clicked
    setSelectedItemId(itemId);
  };

  return (
    <div>
      <h1>CRUD App</h1>

      <div>
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {status && <p>Status: {status}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>ID: {item.id}</p>
            {selectedItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                />

                <select value={itemStatus} onChange={(e) => setitemStatus(e.target.value)}>
                  <option>fullfill</option>
                  <option>pending</option>
                  <option>error</option>
                </select>
                <button onClick={() => handleUpdate(item.id, newItemText)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{item.text}</span>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
