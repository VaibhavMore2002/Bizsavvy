import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, User, CheckCircle, Briefcase, ChevronLeft } from 'lucide-react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link } from 'react-router-dom';

export default function SignupComponent() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // CA specific fields
    licenseNumber: '',
    yearOfRegistration: '',
    practiceArea: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (role === 'ca') {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData.yearOfRegistration.trim()) newErrors.yearOfRegistration = 'Year of registration is required';
      if (!formData.practiceArea.trim()) newErrors.practiceArea = 'Practice area is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && validateStep2()) {
      setStep(role === 'ca' ? 3 : 4);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setRole(null);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit the form data to your backend here
    console.log('Form submitted:', { role, ...formData });
    
    // Show success message
    setStep(5);
  };

  // Progress steps renderer
  const renderProgressSteps = () => (
    <div className="bg-[#8A3FFC] p-4 rounded-xl mb-6">
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= i ? 'bg-white text-[#8A3FFC]' : 'bg-[#B282FF] text-white'
            }`}>
              {step > i ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>{i}</span>
              )}
            </div>
            <div className={`text-xs mt-1 ${
              step >= i ? 'text-white' : 'text-[#E5DBFF]'
            }`}>
              {i === 1 && 'Role'}
              {i === 2 && 'Details'}
              {i === 3 && (role === 'ca' ? 'Verification' : '')}
              {i === 4 && 'Complete'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Content by step
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Choose your account type</h1>
            <p className="text-gray-600">Select the option that best describes you</p>
            
            <div className="grid grid-cols-1 gap-4 mt-6">
              <button
                onClick={() => handleRoleSelect('user')}
                className="flex items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#8A3FFC] hover:bg-[#F8F5FF] transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-[#F4F0FF] flex items-center justify-center">
                  <User className="h-6 w-6 text-[#8A3FFC]" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-medium text-gray-900">Normal User</h3>
                  <p className="text-sm text-gray-500">Access standard features and services</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
              </button>
              
              <button
                onClick={() => handleRoleSelect('ca')}
                className="flex items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#8A3FFC] hover:bg-[#F8F5FF] transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-[#F4F0FF] flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-[#8A3FFC]" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-medium text-gray-900">Chartered Accountant</h3>
                  <p className="text-sm text-gray-500">Access professional tools and client management</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Create your account</h1>
            
            <form className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#9BA3AF"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                    placeholder="john.doe@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1C8.676 1 6 3.676 6 7V8C4.895 8 4 8.895 4 10V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V10C20 8.895 19.105 8 18 8V7C18 3.676 15.324 1 12 1ZM12 3C14.216 3 16 4.784 16 7V8H8V7C8 4.784 9.784 3 12 3ZM12 13C13.105 13 14 13.895 14 15C14 16.105 13.105 17 12 17C10.895 17 10 16.105 10 15C10 13.895 10.895 13 12 13Z" fill="#9BA3AF"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1C8.676 1 6 3.676 6 7V8C4.895 8 4 8.895 4 10V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V10C20 8.895 19.105 8 18 8V7C18 3.676 15.324 1 12 1ZM12 3C14.216 3 16 4.784 16 7V8H8V7C8 4.784 9.784 3 12 3ZM12 13C13.105 13 14 13.895 14 15C14 16.105 13.105 17 12 17C10.895 17 10 16.105 10 15C10 13.895 10.895 13 12 13Z" fill="#9BA3AF"/>
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </form>
          </div>
        );
      
      case 3:
        return (
          <div>
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">CA Verification</h1>
            <p className="text-gray-600 mb-6">Please provide your professional details</p>
            
            <form className="space-y-5">
              <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  CA License Number
                </label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border ${
                    errors.licenseNumber ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                  placeholder="CA12345678"
                />
                {errors.licenseNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="yearOfRegistration" className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Registration
                </label>
                <input
                  type="text"
                  id="yearOfRegistration"
                  name="yearOfRegistration"
                  value={formData.yearOfRegistration}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border ${
                    errors.yearOfRegistration ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                  placeholder="YYYY"
                />
                {errors.yearOfRegistration && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearOfRegistration}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="practiceArea" className="block text-sm font-medium text-gray-700 mb-1">
                  Area of Practice
                </label>
                <select
                  id="practiceArea"
                  name="practiceArea"
                  value={formData.practiceArea}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-3 border ${
                    errors.practiceArea ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A3FFC] focus:border-transparent`}
                >
                  <option value="">Select area</option>
                  <option value="Taxation">Taxation</option>
                  <option value="Audit">Audit</option>
                  <option value="Corporate Finance">Corporate Finance</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
                {errors.practiceArea && (
                  <p className="mt-1 text-sm text-red-600">{errors.practiceArea}</p>
                )}
              </div>
            </form>
          </div>
        );
      
      case 4:
        return (
          <div>
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 mb-6"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review your information</h1>
            <p className="text-gray-600 mb-6">Please check all details before creating your account</p>
            
            <div className="bg-[#F8F5FF] p-6 rounded-xl mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Type</p>
                  <p className="text-gray-900 font-medium">{role === 'ca' ? 'Chartered Accountant' : 'Normal User'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-900 font-medium">{formData.fullName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-900 font-medium">{formData.email}</p>
                </div>
                
                {role === 'ca' && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-500">CA License</p>
                      <p className="text-gray-900 font-medium">{formData.licenseNumber}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Registered Since</p>
                      <p className="text-gray-900 font-medium">{formData.yearOfRegistration}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Practice Area</p>
                      <p className="text-gray-900 font-medium">{formData.practiceArea}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-6">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-[#8A3FFC] hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-[#8A3FFC] hover:underline">Privacy Policy</a>.
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Account Created!</h1>
            <p className="mt-2 text-gray-600">
              {role === 'ca' 
                ? 'Your Chartered Accountant account has been created successfully. We will verify your credentials shortly.'
                : 'Your account has been created successfully. Welcome aboard!'}
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Action button (Next or Submit)
  const renderActionButton = () => {
    if (step === 5) {
      return (
        <Link
          to="/login"
          className="w-full inline-block py-3 px-4 bg-[#8A3FFC] hover:bg-[#7433E0] text-white font-medium rounded-xl shadow-md transition-colors"
        >
          Continue to Login
        </Link>
      );
    }
    
    if (step === 4) {
      return (
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-4 bg-[#8A3FFC] hover:bg-[#7433E0] text-white font-medium rounded-xl shadow-md transition-colors"
        >
          Create Account
        </button>
      );
    }
    
    if (step >= 2) {
      return (
        <button
          onClick={handleNext}
          className="w-full py-3 px-4 bg-[#8A3FFC] hover:bg-[#7433E0] text-white font-medium rounded-xl shadow-md transition-colors"
        >
          {step === 3 ? 'Verify & Continue' : 'Continue'}
        </button>
      );
    }
    
    return null;
  };

  // Footer with sign in link
  const renderFooter = () => {
    if (step < 4) {
      return (
        <div className="mt-8 pt-6 text-center text-sm text-gray-600 border-t border-gray-200">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#8A3FFC] hover:text-[#7433E0] hover:underline">
            Sign in
          </Link>
        </div>
      );
    }
    return null;
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Only show progress indicator for steps 1-4 */}
        {step <= 4 && renderProgressSteps()}
        
        {/* Main content */}
        {renderStepContent()}
        
        {/* Action button */}
        <div className="mt-8">
          {renderActionButton()}
        </div>
        
        {/* Footer */}
        {renderFooter()}
      </div>
    </AuthLayout>
  );
}