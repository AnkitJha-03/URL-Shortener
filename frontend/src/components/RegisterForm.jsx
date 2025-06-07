import { useRef, useState } from "react";
import { register_user } from "../api/user.api"
import useAuthStore from "../stores/auth.store";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = ({setShowLogin}) => {
  const nameRef = useRef(), emailRef = useRef(), passwordRef = useRef(), confirmPasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const user = await register_user(name, email, password);
      login(user);
      navigate({ to: "/" });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name"> Full Name </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={nameRef}
          id="name"
          type="text"
          placeholder="Full Name"
          required
        />
      </div>
      
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
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Password </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="******************"
          required
          minLength={6}
        />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Confirm Password </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={confirmPasswordRef}
          id="confirm_password"
          type="password"
          placeholder="******************"
          required
          minLength={6}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </div>
      
      <div className="text-center mt-4">
        <p className="cursor-pointer text-sm text-gray-600">
          Already have an account? <span onClick={()=>setShowLogin(true)} className="text-blue-500 hover:text-blue-700">Sign In</span>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;