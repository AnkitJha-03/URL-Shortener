import { useRef, useState } from "react";
import { login_user } from "../api/user.api";
import useAuthStore from "../stores/auth.store.js"
import { useNavigate } from "@tanstack/react-router";


const LoginForm = ({setShowLogin}) => {
  const emailRef = useRef(), passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    try {
      const user = await login_user(email, password);
      console.log("user : ", user);
      login(user);
      console.log("user : ", user);
      navigate({ to: "/" });
    } catch (error) {
      setError(error.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-center mb-6"> Login </h2>

      {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
          </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email"> Email </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={emailRef}
          id="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Password </label>
        
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="******************"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="cursor-pointer text-sm text-gray-600">
          Don't have an account? <span onClick={() => setShowLogin(false)} className="text-blue-500 hover:text-blue-700">Register</span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;