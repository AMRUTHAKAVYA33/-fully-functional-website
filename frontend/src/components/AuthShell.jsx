function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white/85 shadow-soft backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-brand-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">Task Manager</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Organize work with a calm, simple dashboard.
            </h1>
            <p className="mt-4 max-w-md text-base text-white/80">
              Track every task in one place, stay focused, and keep your workflow moving from any device.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-sm text-white/85">
            Secure JWT authentication, responsive UI, and full CRUD task management.
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <div className="mx-auto max-w-md">
            <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer ? <div className="mt-6 text-sm text-slate-600">{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthShell;
