import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import toast from "react-hot-toast";
import './App.css';
const API_BASE_URL = "http://localhost:3006/api";
import {truncateText} from "./utils/textTruncate";
const App = () => {
  const [isloading, setisloading] = useState(false);
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemStatus, setitemStatus] = useState("pending");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setisloading(true);
      const response = await axios.get(`${API_BASE_URL}/items`);
      setItems(response.data);
      setisloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setisloading(false);
    }
  };

  const handleCreate = async () => {
    try {
      if(!newItemText || !itemStatus){
        toast.error("please fill all field")
        return
      }
      setisloading(true);
      await axios.post(`${API_BASE_URL}/items`, {
        text: newItemText,
        status: itemStatus,
      });
      setNewItemText("");
      toast.success("Item created successfully");
      fetchData();
      setisloading(false);
    } catch (error) {
      toast.error("Error creating item:", error);
      setisloading(false);
    }
  };

  const handleUpdate = async (itemId, newText) => {
    try {
      setisloading(true);
      await axios.put(`${API_BASE_URL}/items/${itemId}`, {
        text: newText,
        status: itemStatus,
      });
      toast.success("Item updated successfully");

      fetchData();
      setSelectedItemId(null);
      setisloading(false);

      // Reset selected item after updating
    } catch (error) {
      toast.error("Error updating item:", error);

      setisloading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/items/${itemId}`);
      toast.success("Item deleted successfully");

      fetchData();
    } catch (error) {
      toast.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container">
      <h1>CRUD App</h1>

      <div>
        <div className="input-group mb-3" style={{ width: 650 }}>
          <select
            value={itemStatus}
            onChange={(e) => setitemStatus(e.target.value)}
            className="me-4 form-select"
            aria-label="Default select example"
          >
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>

          <input
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            type="text"
            className="form-control col-4"
            placeholder="enter text here"
          />
          <button className="btn btn-primary" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Details</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{truncateText(item.text,25)}</td>
              <td>{item.status}</td>

              <td>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setNewItemText(item.text);
                    setitemStatus(item.status);
                    setSelectedItemId(item.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="ms-4 btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit logs
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                value={itemStatus}
                onChange={(e) => setitemStatus(e.target.value)}
                className="me-4 form-select"
                aria-label="Default select example"
              >
                <option value="pending">pending</option>
                <option value="completed">completed</option>
              </select>

              <div className="input-group mb-3 mt-4">
                <input
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  type="text"
                  className="form-control col-4"
                  placeholder="enter text here"
                />
                <button
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={() => handleUpdate(selectedItemId, newItemText)}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Loader isLoading={isloading} />
    </div>
  );
};

export default App;
