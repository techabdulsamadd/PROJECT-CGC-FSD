import { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    subject: "",
    estimatedTime: "",
    priority: "",
  });

  const getTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", task);
    setTask({ taskName: "", subject: "", estimatedTime: "", priority: "" });
    getTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="dashboard">
      <h1>📚 Smart Study Tracker</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          placeholder="Task Name"
          value={task.taskName}
          onChange={(e) => setTask({ ...task, taskName: e.target.value })}
          required
        />
        <input
          placeholder="Subject"
          value={task.subject}
          onChange={(e) => setTask({ ...task, subject: e.target.value })}
          required
        />
        <input
          placeholder="Estimated Time"
          value={task.estimatedTime}
          onChange={(e) => setTask({ ...task, estimatedTime: e.target.value })}
          required
        />
        <input
          placeholder="Priority"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id} className="task-item">
            <div>
              <strong>{t.taskName}</strong> — {t.subject} ({t.priority})
            </div>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
