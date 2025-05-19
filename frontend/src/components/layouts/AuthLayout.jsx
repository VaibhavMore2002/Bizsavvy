import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Sample data for the chart
const monthlyData = [
  { name: 'Jan', income: 320, expenses: 240 },
  { name: 'Feb', income: 300, expenses: 198 },
  { name: 'Mar', income: 340, expenses: 280 },
  { name: 'Apr', income: 380, expenses: 310 },
  { name: 'May', income: 400, expenses: 320 },
  { name: 'Jun', income: 420, expenses: 380 },
  { name: 'Jul', income: 380, expenses: 290 }
];

const FinancialDashboard = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Top cards row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Income & Expenses Card */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
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
        
        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Net Savings</p>
            <p className="text-2xl font-bold">$124,500</p>
          </div>
        </div>
      </div>

      {/* Middle statistics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Quick stats */}
        {[
          { label: 'Income', value: '$36,240', color: 'bg-purple-500' },
          { label: 'Expenses', value: '$28,150', color: 'bg-red-500' },
          { label: 'Savings', value: '18%', color: 'bg-green-500' },
          { label: 'Budget', value: '$40,000', color: 'bg-blue-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-3">
            <div className={`w-2 h-2 rounded-full ${stat.color} mb-2`}></div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-lg font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart section */}
      <div className="bg-white rounded-xl shadow-md p-6 flex-1">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-bold text-lg">All Transactions</h3>
            <p className="text-sm text-gray-500">2nd Jan to 11th Dec</p>
          </div>
          <button className="bg-[#F4F0FF] text-[#8A3FFC] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#E5DBFF] transition-colors">
            View More
          </button>
        </div>
        
        {/* Chart visualization with recharts */}
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#8A3FFC" 
                strokeWidth={3}
                dot={{ stroke: '#8A3FFC', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: '#8A3FFC' }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#E5DBFF" 
                strokeWidth={3}
                dot={{ stroke: '#E5DBFF', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, fill: '#E5DBFF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-screen bg-[#F8F5FF]">
      {/* Left content side */}
      <div className="w-full md:w-1/2 lg:w-[45%] px-6 md:px-12 py-8 md:py-10 flex flex-col">
        {/* Top navigation */}
        <div className="flex justify-between items-center mb-8 md:mb-16">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#8A3FFC] rounded-lg flex items-center justify-center mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-black">Finbuzz</h2>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">Help</a>
            <a href="#" className="text-[#8A3FFC] hover:text-[#7433E0] font-medium">Contact</a>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
        
        {/* Footer */}
        <div className="pt-8 md:pt-12">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 Expense Tracker. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 12.0331C22.5 6.5 18.2359 1.95814 12.7638 1.95814C7.29162 1.95814 3 6.5 3 12.0331C3 17.0341 6.44027 21.1683 11.0533 21.9831V14.9508H8.51402V12.0331H11.0533V9.78217C11.0533 7.24199 12.4526 5.93941 14.7466 5.93941C15.8477 5.93941 16.9979 6.13627 16.9979 6.13627V8.60155H15.7184C14.459 8.60155 14.0642 9.37748 14.0642 10.1749V12.0331H16.8758L16.4283 14.9508H14.0642V21.9831C18.6772 21.1683 22.5 17.0341 22.5 12.0331Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right visual side with financial dashboard */}
      <div className="hidden md:block md:w-1/2 lg:w-[55%] bg-[#F8F5FF] relative overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8A3FFC] via-[#B721FF] to-[#8A3FFC] opacity-90"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-white bg-opacity-10 rounded-lg transform rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Financial dashboard display */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-2xl backdrop-blur-sm bg-white bg-opacity-20 rounded-2xl shadow-lg p-6 border border-white border-opacity-20">
            <FinancialDashboard />
            
            {/* Floating notification */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg flex items-center space-x-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-sm">Payment Received!</p>
                <p className="text-xs text-gray-500">$2,500 from Client X</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;