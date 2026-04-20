function statusStyles(status) {
  if (status === "Completed") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "In Progress") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}

function TaskList({ tasks, onEdit, onDelete, loading, deletingTaskId }) {
  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-500">
        No tasks yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(task.status)}`}>
              {task.status}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(task)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-500 hover:text-brand-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              disabled={deletingTaskId === task.id}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              {deletingTaskId === task.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
