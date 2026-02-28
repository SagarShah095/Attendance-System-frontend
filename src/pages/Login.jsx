import { useState } from "react";
import { login } from "../service"; // Fixed import
import { useNavigate } from "react-router-dom";
import Loader from "../components/shared/Loader";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Assuming login returns a promise
      // There was a logic error in previous code using undefined 'axios' directly sometimes if service.js wasn't fully abstracting
      const res = await login({ email, password });
      console.log("Login Response: ", res.data);

      if (res.data && res.data.token) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin" || user.role === "hr") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee/dashboard"); // Assuming employee route
        }
      } else {
        setError(res.data.message || "Failed to log in.");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 transition-colors duration-300">
      <div className="bg-surface w-full max-w-md rounded-2xl shadow-medium p-8 border border-border transition-colors">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-textPrimary">
            Welcome Back
          </h2>
          <p className="text-textSecondary mt-2">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-danger px-4 py-3 rounded-lg border border-red-100 dark:border-red-900 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-background text-textPrimary placeholder:text-textSecondary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-background text-textPrimary placeholder:text-textSecondary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primaryHover text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md active:scale-[0.98] flex justify-center items-center"
          >
            {loading ? <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-textSecondary mt-8">
          © 2026 Attendance System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
