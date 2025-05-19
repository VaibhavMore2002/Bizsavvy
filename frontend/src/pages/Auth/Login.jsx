import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-10">Please enter your details to log in</p>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Email input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F4F7FE] border border-[#F4F7FE] rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8A3FFC] focus:border-[#8A3FFC]"
              placeholder="john@timetoprogram.com"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#F4F7FE] border border-[#F4F7FE] rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8A3FFC] focus:border-[#8A3FFC]"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#9BA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#9BA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 21L21 3" stroke="#9BA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#9BA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#9BA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#8A3FFC] hover:bg-[#7433E0] text-white font-bold uppercase tracking-wide rounded-lg transition duration-200 mb-4"
          >
            LOGIN
          </button>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account? <a href="#" className="font-medium text-[#8A3FFC] hover:underline">SignUp</a>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;