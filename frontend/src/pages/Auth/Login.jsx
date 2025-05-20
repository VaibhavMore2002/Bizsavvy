import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { validateEmail } from '../../utils/helper';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a valid password");
      return;
    }
    // console.log('Login attempt with:', { email, password, rememberMe });
    setError("");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
          <p className="text-gray-600">Please enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email input */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#9BA3AF"/>
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent transition-all duration-200"
                placeholder="vaibhav.more@gmail.com"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 font-medium">Password</label>
              <a href="#" className="text-sm text-[#8A3FFC] hover:text-[#7433E0] font-medium">Forgot Password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1C8.676 1 6 3.676 6 7V8C4.895 8 4 8.895 4 10V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V10C20 8.895 19.105 8 18 8V7C18 3.676 15.324 1 12 1ZM12 3C14.216 3 16 4.784 16 7V8H8V7C8 4.784 9.784 3 12 3ZM12 13C13.105 13 14 13.895 14 15C14 16.105 13.105 17 12 17C10.895 17 10 16.105 10 15C10 13.895 10.895 13 12 13Z" fill="#9BA3AF"/>
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Login button */}
          <button
            type="submit"
            className="w-full py-3 px-4 flex justify-center items-center bg-[#8A3FFC] hover:bg-[#7433E0] text-white font-bold rounded-xl transition duration-200 shadow-md hover:shadow-lg"
          >
            Login to Your Account
          </button>

          {/* OR divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="absolute bg-[#F8F5FF] px-4 text-sm text-gray-500">OR CONTINUE WITH</span>
          </div>

          {/* Sign up link */}
          <div className="text-center pt-4">
            <p className="text-gray-600">
              Don't have an account? <Link className="font-medium text-[#8A3FFC] hover:text-[#7433E0] hover:underline transition-colors" to="/signup">Create Account</Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;