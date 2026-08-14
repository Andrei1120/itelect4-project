import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name);
    navigate("/claims"); 
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
          Login
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Name
          </label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name to login..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        
        <button 
          onClick={handleLogin} 
          disabled={name.trim() === ""}
          className="w-full mt-2 rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
