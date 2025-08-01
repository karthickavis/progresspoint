
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Navbar from './component/Navbar';
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";


function App() {


  return (
    <>
     <Toaster position="top-right" />
      <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
