import { useState } from "react";
const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = () => {
    if (title.trim() != "" && description.trim !== "") {
      setTodos([...todos, { title, description }]);
    }
  };
  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>Todo Project with MERN</h1>
      </div>
      <div className="row">
        <h3>Add item</h3>
        <p className="text-success">Item added sucessfully</p>
        <div className="form-group d-flex gap-2">
          <input
            placeholder="Title"
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn btn-dark" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
