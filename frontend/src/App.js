import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";

const API = "http://localhost:8080/api/tasks";

function App() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useAuth();

  const [showRegister, setShowRegister] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // filtro

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (!title.trim()) return alert("O título é obrigatório");

    if (editId) {
      const taskToUpdate = tasks.find((t) => t.id === editId);
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          completed: taskToUpdate ? taskToUpdate.completed : false,
        }),
      });
      setEditId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
    }

    setTitle("");
    fetchTasks();
  };

  const startEdit = (task) => {
    setTitle(task.title);
    setEditId(task.id);
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleCompleted = async (task) => {
    await fetch(`${API}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task.title, completed: !task.completed }),
    });
    fetchTasks();
  };

  if (!currentUser) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register />
            <p className="text-center mt-2">
              Já tem conta?{" "}
              <button
                className="btn btn-link"
                onClick={() => setShowRegister(false)}
              >
                Entrar
              </button>
            </p>
          </>
        ) : (
          <>
            <Login />
            <p className="text-center mt-2">
              Não tem conta?{" "}
              <button
                className="btn btn-link"
                onClick={() => setShowRegister(true)}
              >
                Registrar
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Filtra as tarefas conforme o filtro selecionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div
      className={`container mt-4 ${dark ? "bg-dark text-light" : ""}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Minhas Tarefas</h1>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={toggleTheme}>
            {dark ? "🌞 Claro" : "🌙 Escuro"}
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Sair
          </button>
        </div>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          {editId ? "Salvar" : "Adicionar"}
        </button>
      </div>

      {/* Navbar de filtro */}
      <div className="btn-group mb-3" role="group" aria-label="Filtro de tarefas">
        <button
          type="button"
          className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completas
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${filter === "incomplete" ? "active" : ""}`}
          onClick={() => setFilter("incomplete")}
        >
          Pendentes
        </button>
      </div>

      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </span>
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => startEdit(task)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
