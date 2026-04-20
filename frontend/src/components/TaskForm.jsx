import { useEffect, useState } from "react";

const initialTask = {
  title: "",
  status: "Pending"
};

function TaskForm({ onSubmit, activeTask, onCancel, loading }) {
  const [formData, setFormData] = useState(initialTask);

  useEffect(() => {
    if (activeTask) {
      setFormData({
        title: activeTask.title,
        status: activeTask.status
      });
    } else {
      setFormData(initialTask);
    }
  }, [activeTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          {activeTask ? "Edit task" : "Create a new task"}
        </h2>
        {activeTask ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Title</span>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
            placeholder="Finish project deployment"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Status</span>
          <select
            value={formData.status}
            onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-300"
      >
        {loading ? "Saving..." : activeTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
