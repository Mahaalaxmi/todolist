import { useEffect, useState } from "react";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);

  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const apiUrl = "http://localhost:8000";

  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && desc.trim() !== "") {
      fetch(apiUrl + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, desc }),
      })
        .then((res) => {
          if (res.ok) {
            setTodos([
              ...todos,
              { title, desc, _id: Math.random().toString() },
            ]);
            setTitle("");
            setDesc("");
            setMessage("Item added successfully");
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch(() => setError("Unable to create Todo item"));
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todos")
      .then((res) => res.json())
      .then((res) => setTodos(res));
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDesc(item.desc);
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDesc.trim() !== "") {
      fetch(apiUrl + "/todos/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, desc: editDesc }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedTodos = todos.map((item) =>
              item._id === editId
                ? { ...item, title: editTitle, desc: editDesc }
                : item
            );
            setTodos(updatedTodos);
            setEditTitle("");
            setEditDesc("");
            setMessage("Item updated successfully");
            setTimeout(() => setMessage(""), 3000);
            setEditId(-1);
          } else {
            setError("Unable to update Todo item");
          }
        })
        .catch(() => setError("Unable to update Todo item"));
    }
  };

  const handleEditCancel = () => setEditId(-1);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(apiUrl + "/todos/" + id, { method: "DELETE" }).then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ padding: "30px", backgroundColor: "#f3f4f6" }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "25px",
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          margin: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          To-Do List
        </h1>
        {message && (
          <p style={{ color: "#28a745", fontWeight: "500" }}>{message}</p>
        )}

        <div
          className="form-group d-flex gap-2 mb-4"
          style={{ justifyContent: "center" }}
        >
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
            style={{
              flex: "1",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          />
          <input
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="form-control"
            type="text"
            style={{
              flex: "1",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          />
          <button
            className="btn"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Add
          </button>
        </div>

        {error && (
          <p style={{ color: "#dc3545", fontWeight: "500" }}>{error}</p>
        )}

        <div style={{ marginTop: "20px" }}>
          <ul
            className="list-group"
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              padding: "15px",
              width: "90%",
              margin: "0 auto",
              maxWidth: "500px",
            }}
          >
            {todos.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex justify-content-between align-items-center mb-2"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ flex: "1", textAlign: "left" }}>
                  {editId !== item._id ? (
                    <>
                      <strong style={{ display: "block" }}>{item.title}</strong>
                      <p style={{ margin: 0, color: "#666" }}>{item.desc}</p>
                    </>
                  ) : (
                    <div className="form-group d-flex gap-2">
                      <input
                        placeholder="Title"
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        className="form-control"
                        type="text"
                        style={{
                          borderRadius: "8px",
                          padding: "8px",
                          border: "1px solid #ddd",
                          width: "48%",
                        }}
                      />
                      <input
                        placeholder="Description"
                        onChange={(e) => setEditDesc(e.target.value)}
                        value={editDesc}
                        className="form-control"
                        type="text"
                        style={{
                          borderRadius: "8px",
                          padding: "8px",
                          border: "1px solid #ddd",
                          width: "48%",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="d-flex gap-2">
                  {editId === -1 || editId !== item._id ? (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleEdit(item)}
                      style={{ borderRadius: "8px", padding: "5px 15px" }}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleUpdate}
                      style={{ borderRadius: "8px", padding: "5px 15px" }}
                    >
                      Save
                    </button>
                  )}
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      editId !== -1
                        ? handleEditCancel()
                        : handleDelete(item._id)
                    }
                    style={{ borderRadius: "8px", padding: "5px 15px" }}
                  >
                    {editId !== -1 && editId === item._id ? "Cancel" : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
