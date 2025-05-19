import React from 'react';

// You can replace this with your actual SVG or chart image
const FinancialDashboard = () => (
  <div className="flex flex-col h-full">
    {/* Top card with income tracker */}
    <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex items-center max-w-md">
      <div className="bg-[#8A3FFC] bg-opacity-20 p-3 rounded-full mr-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13" stroke="#8A3FFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Track Your Income & Expenses</p>
        <p className="text-2xl font-bold">$430,000</p>
      </div>
    </div>

    {/* Bottom chart section */}
    <div className="bg-white rounded-xl shadow-md p-6 flex-1">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-bold text-lg">All Transactions</h3>
          <p className="text-sm text-gray-500">2nd Jan to 11th Dec</p>
        </div>
        <button className="bg-[#F4F0FF] text-[#8A3FFC] px-4 py-2 rounded-lg text-sm">
          View More
        </button>
      </div>
      
      {/* Chart visualization - this would be a component with actual chart library */}
      <div className="h-64 mt-6 relative">
        {/* Sample chart - you would use a real chart library here */}
        <div className="absolute inset-0 flex items-end justify-between">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => {
            // Generate dynamic heights for visualization
            const height1 = 30 + Math.random() * 70;
            const height2 = 10 + Math.random() * 30;
            
            return (
              <div key={month} className="flex flex-col items-center">
                <div className="w-12 flex flex-col items-center">
                  <div 
                    className="w-10 bg-[#F4F0FF]" 
                    style={{height: `${height2}px`}}
                  ></div>
                  <div 
                    className="w-10 bg-[#8A3FFC]" 
                    style={{height: `${height1}px`}}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{month}</span>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
          {['400', '230', '160', '120', '50', '0'].map((value) => (
            <span key={value} className="text-xs text-gray-500">{value}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-[#F8F5FF]">
      {/* Left content side */}
      <div className="flex-1 md:w-[55%] px-12 pt-10 pb-12 flex flex-col">
        <h2 className="text-xl font-bold text-black mb-20">Expense Tracker</h2>
        <div className="flex-1 flex items-center">
          {children}
        </div>
      </div>

      {/* Right visual side with financial dashboard */}
      <div className="hidden md:block md:w-[45%] bg-[#F8F5FF] relative overflow-hidden">
        {/* Top purple corner */}
        <div className="w-96 h-96 rounded-[40px] bg-[#8A3FFC] absolute -top-16 -right-16"></div>
        
        {/* Bottom magenta corner */}
        <div className="w-96 h-96 rounded-[40px] bg-[#B721FF] absolute -bottom-16 -right-16"></div>
        
        {/* Financial dashboard display */}
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="w-full max-w-lg">
            <FinancialDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;