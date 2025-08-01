import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter your name");
      return;
    }

    login(username);
    toast.success(`Welcome, ${username}`);
    navigate("/"); // ✅ make sure this route exists!
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white border border-slate-300 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
