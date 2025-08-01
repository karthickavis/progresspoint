// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
<nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-violet-700 text-white p-4 shadow-md">
  <Link to="/" className="text-lg font-bold">ProgressPoint</Link>
  <div className="space-x-4">
    {user ? (
      <>
        <span className="text-sm">Hi, {user.name}</span>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </>
    ) : (
      <Link to="/login" className="bg-white text-violet-700 px-3 py-1 rounded hover:bg-slate-100">
        Login
      </Link>
    )}
  </div>
</nav>


  );
};

export default Navbar;
