import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const ToDo = () => {

    const [todos, setTodos] = useState(() => {
        const storeTodos = localStorage.getItem('todos');
        return storeTodos ? JSON.parse(storeTodos) : [];
    })
    // state for storing new todo input value
    const [newTodo, setNewTodo] = useState("");
    const [completed, setCompleted] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState("");


    // handle input change
    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }

    // handle Form submission
    const handleSubmit = (event) => {
         event.preventDefault();
         if(newTodo.trim() === "") return;
         setTodos([...todos, newTodo]);
         setNewTodo("");
    }

    // Handle Delete function
    const handleDelete = (index) => {
      const updateTodos = todos.filter((todo, i) => i !== index);
      setTodos(updateTodos);
      setCompleted(completed.filter((i) => i !== index)); // remove from completed too
    }

    const handleEdit = (index) => {
  setEditingIndex(index);
  setEditingText(todos[index]);
};

const handleSaveEdit = (index) => {
  const updatedTodos = [...todos];
  updatedTodos[index] = editingText;
  setTodos(updatedTodos);
  setEditingIndex(null);
  setEditingText("");
};


const handleComplete = (index) => {
  if (completed.includes(index)) {
    setCompleted(completed.filter(i => i !== index));
  } else {
    setCompleted([...completed, index]);
  }
};

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos]);

    return (
        <div>
          <h1>ToDo List</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Add a new todo' value={newTodo} onChange={handleChange} />
            <button type='submit'>Add</button>
          </form>
  <ul>
  {todos.map((todo, index) => (
    <li
      key={index}
     className="todo-part"
    >
      {editingIndex === index ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onBlur={() => handleSaveEdit(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveEdit(index);
            if (e.key === "Escape") setEditingIndex(null);
          }}
          autoFocus
          style={{
            flex: 1,
            marginRight: "10px",
            padding: "4px",
            fontSize: "16px"
          }}
        />
      ) : (
        <span
          style={{
            textDecoration: completed.includes(index) ? "line-through" : "none",
            flex: 1
          }}
        >
          {todo}
        </span>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        <FaEdit
          onClick={() => handleEdit(index)}
          style={{ cursor: "pointer", color: "blue" }}
        />
        <FaCheck
          onClick={() => handleComplete(index)}
          style={{ cursor: "pointer", color: "green" }}
        />
        <FaTrash
          onClick={() => handleDelete(index)}
          style={{ cursor: "pointer", color: "red" }}
        />
      </div>
    </li>
  ))}
</ul>

 </div>
    )
}

export default ToDo;