import React, { useState } from 'react';
import Sidebar from '../components/UserDashboard/Sidebar';
import Header from '../components/Header';
import BusinessMan from '../assets/images/business-man.jpg';
import Paypal from "../assets/images/paypal.png";
import { FaCreditCard } from "react-icons/fa6";
const Settings = () => {
  const[showSidebar,setShowSidebar]=useState(true)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    notifications: true,
    darkMode: false,
    referralCode: 'REF12345',
    paymentMethod: 'card', // default payment method
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
  };

  return (
    <div className="h-screen w-full flex">
     {showSidebar&&<Sidebar />} 
      <div className={`${showSidebar ? "lg:ml-[22rem]" : ""} flex-grow overflow-scroll bg-slate-100 `}>
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        
        {/* Tabs Navigation */}
        <div className="mx-auto px-[10px]  w-full max-w-4xl mt-8">
          <nav className="flex bg-white rounded-md  space-x-4 border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-2 h-[60px] px-3 text-gray-700 font-medium border-b-2 ${activeTab === 'profile' ? 'border-blue-600' : 'border-transparent'}`}
            >
              Profile
            </button>
          
            <button
              onClick={() => setActiveTab('referrals')}
              className={`pb-2 h-[60px] px-3 text-gray-700 font-medium border-b-2 ${activeTab === 'referrals' ? 'border-blue-600' : 'border-transparent'}`}
            >
              Referrals
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`pb-2 h-[60px] px-3 text-gray-700 font-medium border-b-2 ${activeTab === 'billing' ? 'border-blue-600' : 'border-transparent'}`}
            >
              Billing & Payment
            </button>
          </nav>
        </div>
        <div className='px-[10px]'>
        <div className="mx-auto  w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-lg">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              {/* Profile details */}
              <div className="flex pb-[30px] items-center gap-3">
                <div className="h-[3rem] w-[3rem] rounded-full overflow-hidden">
                  <img
                    src={BusinessMan}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">John Doe</span>
                  <span className="text-xs">johndoe2@gmail.com</span>
                </div>
              </div>
 {/* FullName */}
 <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                  FullName
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full h-[50px] bg-slate-100 rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full h-[50px] rounded-md bg-slate-100 border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 bg-slate-100 h-[50px] block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}

    

          {activeTab === 'referrals' && (
              <div>
              {/* Referrals */}
              <h2 className="text-xl font-bold text-gray-900 mb-6">Referral Program</h2>

              <div className="mb-6">
                <p className="text-sm text-gray-700">
                  Share this referral code with your friends and earn rewards when they sign up!
                </p>
                <div className="mt-2 bg-gray-100 p-4 rounded-md">
                  <span className="font-mono text-lg font-bold">{formData.referralCode}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Copy Referral Code
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Billing & Payment</h2>

              <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span>Select Payment Method</span>
            <div className="flex md:flex-row flex-col justify-between gap-4">
              <div
                onClick={() => setSelectedPaymentMethod(1)}
                className="flex justify-between items-center cursor-pointer p-4 bg-slate-100 w-full rounded-md"
              >
                <div className="flex gap-3 items-center">
                  <img src={Paypal} alt="" className="h-5" />
                  <span>Paypal</span>
                </div>
                <div
                  className={`h-5 w-5 rounded-full ${
                    selectedPaymentMethod === 1
                      ? "bg-primary"
                      : "bg-white border border-secondary"
                  }`}
                ></div>
              </div>
              <div
                onClick={() => setSelectedPaymentMethod(2)}
                className="flex justify-between items-center cursor-pointer p-4 bg-slate-100 w-full rounded-md"
              >
                <div className="flex gap-3 items-center">
                  <FaCreditCard color="#2a66b4" size={22} />
                  <span>Credit/Debit Card</span>
                </div>
                <div
                  className={`h-5 w-5 rounded-full ${
                    selectedPaymentMethod === 2
                      ? "bg-primary"
                      : "bg-slate-100 border border-secondary"
                  }`}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label>Card Holder Name</label>
              <input className="p-4 outline-none bg-slate-100 rounded-md"></input>
            </div>
            <div className="flex flex-col gap-3">
              <label>Card Number</label>
              <input className="p-4 outline-none bg-slate-100 rounded-md"></input>
            </div>
            <div className="flex md:flex-row flex-col justify-between">
              <div className="flex flex-col gap-3 md:w-[48%] w-full">
                <label>Expiry date</label>
                <input
                  type="date"
                  className="p-4 outline-none bg-slate-100 rounded-md"
                ></input>
              </div>
              <div className="flex flex-col pb-[20px] gap-3 md:w-[48%] w-full">
                <label>CVV</label>
                <input className="p-4 bg-slate-100 outline-none rounded-md"></input>
              </div>
            </div>
          </div>
        </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Payment Details
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Settings;
