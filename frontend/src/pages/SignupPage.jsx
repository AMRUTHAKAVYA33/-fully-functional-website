import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import AuthShell from "../components/AuthShell";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/register", formData);
      login(response.data.token, response.data.user);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to create account."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Start managing your personal tasks in a few seconds."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-600">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
            minLength={6}
            required
          />
        </label>

        {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-300"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthShell>
  );
}

export default SignupPage;
