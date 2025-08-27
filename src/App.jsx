import { useState, useEffect } from "react";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoList")) || [];
  });
  const [completed, setCompleted] = useState(() => {
    return JSON.parse(localStorage.getItem("completedList")) || [];
  });
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Save to localStorage whenever list/completed changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
    localStorage.setItem("completedList", JSON.stringify(completed));
  }, [list, completed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedItem = item.trim();
    if (trimmedItem === "") return;

    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = trimmedItem;
      setList(updatedList);
      setEditIndex(null);
    } else {
      if (
        list.map((i) => i.toLowerCase()).includes(trimmedItem.toLowerCase()) ||
        completed.map((i) => i.toLowerCase()).includes(trimmedItem.toLowerCase())
      ) {
        alert("⚠️ Item already exists!");
      } else {
        setList([...list, trimmedItem]);
      }
    }
    setItem("");
  };

  const handleDelete = (val) => {
    setList(list.filter((i) => i !== val));
    setCompleted(completed.filter((c) => c !== val));
  };

  const toggleComplete = (val) => {
    if (completed.includes(val)) {
      setCompleted(completed.filter((c) => c !== val));
    } else {
      setCompleted([...completed, val]);
    }
  };

  const handleEdit = (val, index) => {
    setItem(val);
    setEditIndex(index);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div
        className="shadow-lg p-5 w-100"
        style={{
          maxWidth: "700px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#10a37f" }}>
          📝 To-Do List
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center gap-3 mt-3"
          style={{ width: "100%" }}
        >
          <input
            type="text"
            className="form-control text-center"
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "14px 18px",
              fontSize: "18px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              outline: "none",
            }}
            placeholder="✍️ Enter your task..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2"
            style={{
              fontSize: "18px",
              borderRadius: "14px",
              backgroundColor: "#10a37f",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            {editIndex !== null ? "✏️ Update Task" : "➕ Add Task"}
          </button>
        </form>

        {/* List */}
        <ul className="list-group mt-4" style={{ background: "transparent" }}>
          {list.map((val, index) => (
            <li
              key={index}
              className="d-flex justify-content-between align-items-center"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: "12px",
                marginBottom: "10px",
                padding: "12px 16px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span
                onClick={() => toggleComplete(val)}
                style={{
                  cursor: "pointer",
                  textDecoration: completed.includes(val)
                    ? "line-through"
                    : "none",
                  color: completed.includes(val) ? "#10a37f" : "#fff",
                  fontWeight: "500",
                }}
              >
                {val}
              </span>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm"
                  style={{
                    border: "1px solid #ffc107",
                    color: "#ffc107",
                    background: "transparent",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleEdit(val, index)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm"
                  style={{
                    border: "1px solid #ff4d4d",
                    color: "#ff4d4d",
                    background: "transparent",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleDelete(val)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
