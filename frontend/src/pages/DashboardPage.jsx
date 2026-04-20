import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [savingTask, setSavingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    setLoadingTasks(true);
    setError("");

    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load tasks."));
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleSaveTask = async (taskData) => {
    setSavingTask(true);
    setError("");

    try {
      if (activeTask) {
        await api.put(`/tasks/${activeTask.id}`, taskData);
      } else {
        await api.post("/tasks", taskData);
      }

      setActiveTask(null);
      await loadTasks();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to save task."));
    } finally {
      setSavingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError("");
    setDeletingTaskId(taskId);

    try {
      await api.delete(`/tasks/${taskId}`);
      if (activeTask?.id === taskId) {
        setActiveTask(null);
      }
      await loadTasks();
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to delete task."));
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-soft sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/60">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold">Hello, {user?.name || "there"}</h1>
              <p className="mt-2 max-w-2xl text-white/75">
                Keep your tasks organized, update progress, and stay on top of what matters most.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/20 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </header>

        {error ? <div className="mb-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <TaskForm
            onSubmit={handleSaveTask}
            activeTask={activeTask}
            onCancel={() => setActiveTask(null)}
            loading={savingTask}
          />

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Your tasks</h2>
              <p className="text-sm text-slate-500">{tasks.length} total</p>
            </div>
            <TaskList
              tasks={tasks}
              onEdit={setActiveTask}
              onDelete={handleDeleteTask}
              loading={loadingTasks}
              deletingTaskId={deletingTaskId}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
