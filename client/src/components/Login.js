import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { loginUser } from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(email, password);
      const { token, userId, isAdmin } = response.data;
      if (token && userId && typeof isAdmin === 'boolean') {
        login(token, userId, isAdmin);
        navigate('/admin-dashboard');
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Email or Password');
    }
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-600">
      <div className="relative sm:max-w-sm w-full">
        <div className="card bg-gradient-to-r from-purple-500 to-blue-700 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
        <div className="card bg-gradient-to-r from-blue-500 to-purple-700 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
        <div className="relative w-full rounded-3xl px-6 py-8 bg-gray-100 shadow-md">
          <label className="block mt-3 text-xl text-gray-900 text-center font-bold">
            Welcome to Admin Login
          </label>
          <form className="mt-10" onSubmit={handleLogin}>
          <div>
  <input
    type="email"
    placeholder="    Enter the G-Mail"
    className="mt-1 block w-full border-none h-11 rounded-xl  pl-5"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</div>
<div className="mt-7">
  <input
    type="password"
    placeholder="    Password"
    className="mt-1 block w-full border-none h-11 rounded-xl shadow-lg  pl-5"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</div>

            <div className="mt-7">
              <button
                type="submit"
                className="bg-purple-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
              >
                Login
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
