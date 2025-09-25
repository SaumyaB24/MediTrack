import React, { useState, useEffect } from 'react';

// Icon components (same as before, plus new ones)
const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Package = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ShoppingCart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Bell = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const AlertTriangle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const Filter = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
  </svg>
);

const Download = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const BarChart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOff = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Settings state management
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: true,
    dateFormat: 'MM/DD/YYYY',
    exportAllData: true,
    accentColor: '#2563eb',
    tableDensity: 'comfortable'
  });

  // Sample data for orders
  const ordersData = [
    {
      orderId: 'ORD2024-001',
      datePlaced: 'Paracetamol',
      supplier: 'Paracetamol',
      items: 'Shipped',
      totalQuantity: '500 units',
      estimatedDelivery: '2024-05-25',
      status: 'shipped'
    },
    {
      orderId: '2024-05-18',
      datePlaced: 'Amoxicillin',
      supplier: 'Shipped',
      items: 'Received',
      totalQuantity: '1200 units',
      estimatedDelivery: '',
      status: 'received'
    },
    {
      orderId: 'Distributor Bob',
      datePlaced: 'Supplier A',
      supplier: 'Lipitor',
      items: '200 trm.',
      totalQuantity: '2000 unl-22',
      estimatedDelivery: '',
      status: 'pending'
    },
    {
      orderId: 'Valsartan',
      datePlaced: 'Lipitor A',
      supplier: 'In Transit',
      items: 'Received',
      totalQuantity: '750 unid',
      estimatedDelivery: '',
      status: 'in_transit'
    }
  ];

  // Sample data for suppliers
  const suppliersData = [
    {
      id: 1,
      supplierName: 'Supplier A Pharma',
      vendor: 'Alice Chen',
      contactPerson: 'alice@pharma.com',
      email: 'Bob Johnson',
      status: 'Active',
      phone: '+1 555 123 4567'
    },
    {
      id: 3,
      supplierName: 'DistriCorp B',
      vendor: 'Bob Johnston',
      contactPerson: 'bob@priicorp.com',
      email: '+1 555 496 7390',
      status: 'Active',
      phone: 'Active'
    },
    {
      id: 4,
      supplierName: 'City Pharmacy',
      vendor: 'Jane Smith',
      contactPerson: '+1 555 457 4679',
      email: '+1 555 236-778',
      status: 'Active',
      phone: 'Inactive'
    },
    {
      id: 4,
      supplierName: 'Regional Pharma',
      vendor: 'Eva Williamr',
      contactPerson: 'bob@pharma.com',
      email: 'Eva Willakr 133',
      status: 'Inactive',
      phone: 'View Details'
    }
  ];

  // Other sample data (keeping existing data)
  const inventoryData = [
    { id: 1, drugName: 'Paracetamol', batchLot: 'P-101-A', expiryDate: '5000 units', currentHolder: 'Received', status: 'Received', lastAction: 'Sold/Dispersed' },
    { id: 2, drugName: 'Amoxicillin', batchLot: '5000 units', expiryDate: 'Distributor (distribute)', currentHolder: 'Received', status: 'Received', lastAction: 'Sell to patients' },
    { id: 4, drugName: 'Lipitor', batchLot: '1200 units', expiryDate: 'Beta(retail ntion)', currentHolder: 'Received', status: 'In Transit', lastAction: '2000 05:27' },
    { id: 5, drugName: 'Amoxicillin', batchLot: '1200 units', expiryDate: '2025-06-15', currentHolder: 'Received', status: 'Received', lastAction: 'sell to patients' },
    { id: 5, drugName: 'Lipitor', batchLot: '1300 units)', expiryDate: '2025-06-15', currentHolder: 'In Transit', status: 'Received', lastAction: '5500-053-28' },
    { id: 3, drugName: 'Lipitor', batchLot: 'Rece / spierd', expiryDate: '2025-b6nf Dat)', currentHolder: 'In Transit', status: 'confirmReselling', lastAction: 'Oseensce' },
    { id: 6, drugName: 'Lipitor', batchLot: '2000 units', expiryDate: 'Retailer (City Pharmacy)', currentHolder: 'Sold topatients', status: 'confirmReceived', lastAction: 'Boon units' },
    { id: 7, drugName: 'Paracetamol', batchLot: '1200 units)', expiryDate: 'Retailer (City Pharmacy)', currentHolder: 'Sell to patients', status: 'Aactor', lastAction: '866.0 05:0ta' }
  ];

  const keyMetrics = [
    { title: 'Total Inventory Value', value: '$1.5M', color: 'bg-teal-500', icon: Package },
    { title: 'Drugs in Stock', value: '1,250', color: 'bg-green-500', icon: Package },
    { title: 'Pending Orders', value: '45', color: 'bg-orange-500', icon: ShoppingCart },
    { title: 'Expired/Expiring Soon', value: '120', color: 'bg-red-500', icon: AlertTriangle }
  ];

  const notifications = [
    { id: 1, type: 'warning', message: 'Low stock: Paracetamol (50 units left)' },
    { id: 2, type: 'error', message: 'Expiring soon: Batch A-123 (30 days)' },
    { id: 3, type: 'success', message: 'New order #ORD2024-005 placed' },
    { id: 4, type: 'info', message: 'Stock updated for Ibuprofen' },
    { id: 5, type: 'info', message: 'Shipment #SHP-321 received from Cardinal Health' }
  ];

  const dashboardInventoryData = [
    { drug: 'Paracetamol', inStock: 850, lowStock: 900, status: 'low' },
    { drug: 'Antibiotics', inStock: 1200, lowStock: 1150, status: 'normal' },
    { drug: 'Vaccines', inStock: 600, lowStock: 650, status: 'low' },
    { drug: 'Vitamins', inStock: 1800, lowStock: 1500, status: 'high' }
  ];

  const inventoryChartData = [
    { drug: 'Paracetamol', stockLevels: 85, nearingExpiry: 15 },
    { drug: 'Lipitor', stockLevels: 70, nearingExpiry: 30 },
    { drug: 'Antibiotics', stockLevels: 90, nearingExpiry: 25 },
    { drug: 'Vaccines', stockLevels: 60, nearingExpiry: 40 },
    { drug: 'Vaccines', stockLevels: 55, nearingExpiry: 35 }
  ];

  // Auth handlers
  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    setUser({
      name: loginForm.email.split('@')[0],
      email: loginForm.email
    });
    setShowAuthModal(false);
    alert('Login successful!');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate signup
    setUser({
      name: signupForm.fullName,
      email: signupForm.email
    });
    setShowAuthModal(false);
    alert('Account created successfully!');
  };

  const handleLogout = () => {
    setUser(null);
    setLoginForm({ email: '', password: '', rememberMe: false });
    setSignupForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    alert('Logged out successfully!');
  };

  // Other handlers
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleTextInputChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleExportData = () => {
    alert('Data export initiated successfully!');
  };

  const handleConnectEHR = () => {
    alert('Connecting to EHR System...');
  };

  const Sidebar = () => (
    <div className="bg-slate-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">DrugTrack</h1>
            <p className="text-xs text-slate-400">Supply Chain System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
            { id: 'inventory', icon: Package, label: 'Inventory' },
            { id: 'management', icon: FileText, label: 'Management' },
            { id: 'orders', icon: ShoppingCart, label: 'Orders' },
            { id: 'suppliers', icon: Users, label: 'Suppliers' },
            { id: 'reports', icon: BarChart, label: 'Reports' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-teal-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for drugs, orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {user ? (
            <div className="relative group">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold hover:bg-teal-600"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold hover:bg-teal-600"
            >
              U
            </button>
          )}
        </div>
      </div>
    </header>
  );

  // Auth Modal Component
  const AuthModal = () => {
    if (!showAuthModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setAuthMode('login')}
                className={`px-4 py-2 text-sm font-medium ${
                  authMode === 'login' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`px-4 py-2 text-sm font-medium ${
                  authMode === 'signup' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={() => setShowAuthModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="email"
                    placeholder="Email or Username"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember Me</label>
                  </div>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot HR access?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-800 font-medium"
                >
                  LOGIN
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-700 text-white py-2 px-4 rounded-lg hover:bg-slate-800 font-medium"
                >
                  CREATE ACCOUNT
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Components (keeping existing ones)
  const MetricsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {keyMetrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
            <div className={`${metric.color} p-3 rounded-lg`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const InventoryChart = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Inventory Levels for Top Drugs</h3>
        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">View All</button>
      </div>
      
      <div className="space-y-4">
        {dashboardInventoryData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{item.drug}</span>
                <span className="text-sm text-gray-500">{item.inStock} units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    item.status === 'low' ? 'bg-red-500' : 
                    item.status === 'high' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min((item.inStock / item.lowStock) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {notifications.slice(2).map((notification) => (
          <div key={notification.id} className="flex items-center space-x-3 py-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <p className="text-sm text-gray-700">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const AlertsNotifications = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Alerts & Notifications</h3>
      <div className="space-y-4">
        {notifications.slice(0, 2).map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Orders Page Component
  const OrdersPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Search by Drug Name</option>
            <option>Paracetamol</option>
            <option>Amoxicillin</option>
            <option>Lipitor</option>
          </select>
          <input
            type="text"
            placeholder="Search by Drug Name"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Current Location (e.g. Distributor)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Status (e.g. Pending, Received, Sold)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center justify-end space-x-2">
          <button 
            onClick={() => alert('Creating new order...')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            New Order
          </button>
          <button 
            onClick={() => alert('Tracking shipment...')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            Track Shipment
          </button>
          <button 
            onClick={handleExportData}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Placed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier/Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Delivery</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersData.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{order.datePlaced}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{order.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.items === 'Shipped' ? 'bg-green-100 text-green-800' :
                      order.items === 'Received' ? 'bg-blue-100 text-blue-800' :
                      order.items === '200 trm.' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.items}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.totalQuantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.estimatedDelivery}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-gray-400 hover:text-gray-600">
                      {order.estimatedDelivery ? '↑' : '−'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
          <span className="text-sm text-gray-500">Page 1 of 3</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">‹</button>
            <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">›</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Suppliers Page Component
  const SuppliersPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Supplier & Partner Management</h2>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Search by Name</option>
            <option>Supplier A Pharma</option>
            <option>DistriCorp B</option>
            <option>City Pharmacy</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Drug Name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Type (e.g. Vendor, Distributor)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Type (e.g. Vendor, Inactive)</option>
            <option>Vendor</option>
            <option>Distributor</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Current Location (e.g. Distributor)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Status (Active/Inactive)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <button 
            onClick={() => alert('Adding new supplier...')}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            Add New Supplier
          </button>
          <button 
            onClick={handleExportData}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliersData.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.supplierName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.contactPerson}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplier.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        supplier.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                        supplier.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {supplier.status}
                      </span>
                      {supplier.status === 'Active' && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      {supplier.phone === 'View Details' ? (
                        <button 
                          onClick={() => alert(`Viewing details for ${supplier.supplierName}`)}
                          className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border border-blue-600 rounded"
                        >
                          View Details
                        </button>
                      ) : (
                        <span className="text-gray-500 text-xs">{supplier.phone}</span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        {supplier.status === 'Inactive' ? '−' : '↑'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
          <span className="text-sm text-gray-500">Page 1 of 3</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => alert('Viewing supplier details...')}
              className="px-3 py-1 text-sm bg-slate-700 text-white rounded hover:bg-slate-800"
            >
              View Details
            </button>
            <button className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700">›</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Inventory Page Component (keeping existing)
  const InventoryPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Inventory & Supply Chain</h2>
          <p className="text-gray-600">Drug Statistics</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Dual Red </option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Current Location (e. g. Distributor)</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Status</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Status (e.g:email, Received, Sold)</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Drug</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <span>Transfer Drug</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleExportData}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
            <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Filter & Search</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drug Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch/Lot No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Holder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.drugName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.batchLot}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.currentHolder === 'Received' ? 'bg-green-100 text-green-800' :
                      item.currentHolder === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      item.currentHolder === 'Sold topatients' ? 'bg-purple-100 text-purple-800' :
                      item.currentHolder === 'Sell to patients' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.currentHolder}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Received' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'confirmReceived' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'confirmReselling' ? 'bg-gray-100 text-gray-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.lastAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Management Page Component (keeping existing)
  const ManagementPage = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Supply Chain Entities</h3>
          <p className="text-sm text-gray-600 mb-6">Assist you set up entities via distributed</p>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Manage Vendors/Partners
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Add New Entity
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">User & Access Control</h3>
          <p className="text-sm text-gray-600 mb-6">Manage user access and user-based policy administration/permissen.</p>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Manage Users & Roles
            </button>
            <p className="text-sm text-gray-600">Configure Permissions</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Configuration</h3>
          <p className="text-sm text-gray-600 mb-6">General preferences and transact/action audit trails.</p>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              General Settings & Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Reports Page Component (keeping existing)
  const ReportsPage = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Overview</h3>
          <p className="text-sm text-gray-600 mb-4">(Bit Low)</p>
          
          <div className="space-y-4 mb-6">
            {inventoryChartData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.drug}</span>
                  <div className="flex space-x-4">
                    <span className="text-blue-600">Stock Levels</span>
                    <span className="text-red-600">Nearing Expiry</span>
                  </div>
                </div>
                <div className="flex space-x-2 h-8">
                  <div className="flex-1 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-blue-500 rounded" 
                      style={{ width: `${item.stockLevels}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-red-500 rounded" 
                      style={{ width: `${item.nearingExpiry}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={() => alert('Viewing detailed inventory report...')}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
            >
              View Detailed Inventory Report
            </button>
            <button 
              onClick={() => alert('Low-stock alert generated!')}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
            >
              Generate Low-Stock Alert
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supply Chain Activity</h3>
          
          <div className="mb-6">
            <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-center p-4">
              <div className="flex items-end space-x-2 h-full">
                {[20, 35, 45, 30, 60, 55, 70].map((height, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 w-6 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Shipments & Transfers</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                75%
              </div>
              <div>
                <p className="text-sm text-blue-600">On Time (75%)</p>
                <p className="text-sm text-gray-600">(25%)</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={() => alert('Tracking all shipments...')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Track All Shipments
            </button>
            <button 
              onClick={handleExportData}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Download Logistics Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales & Dispensing</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Top 5 Sold Drugs: Lipitor</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Sales Volume (units)</p>
              <p className="text-2xl font-bold text-gray-900">1300</p>
              <p className="text-sm text-gray-600">(units)</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
            >
              Export Dispensing Data
            </button>
            <input
              type="text"
              placeholder="Follow"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Audit</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">All Logs Up-to-Date</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-700">2 Items Flagged Batches</span>
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-700">2 Items Flagged for Recall</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={() => alert('Viewing recalled batches...')}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
            >
              View Recalled Batches
            </button>
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
            >
              Download Compliance Report
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Data updated every 15 minutes, 24/7 UTC
      </div>
    </div>
  );

  // Settings Page Component (keeping existing)
  const SettingsPage = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                <button
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Dark Mode</label>
                <button
                  onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                <input
                  type="text"
                  value={settings.dateFormat}
                  onChange={(e) => handleTextInputChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="MM/DD/YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View Detailed Minutes</label>
                <input
                  type="text"
                  placeholder="Enter minutes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Data & Integrations</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Export All Data</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Connect to EHR System</span>
                <span className="text-lg font-bold text-gray-900">1300</span>
              </div>

              <div className="flex space-x-2 pt-4">
                <button 
                  onClick={handleExportData}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
                >
                  Export Dispensing Data
                </button>
                <button 
                  onClick={handleConnectEHR}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Connect to EHR System
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security</h3>
            
            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Change Password</span>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Manage API Keys</span>
              </button>

              <div className="pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Check upload site</p>
                    <p className="text-xs text-gray-500">Process health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Interface & Audit</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Export All Data</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Omygosh factor</span>
                  <button className="w-6 h-6 bg-blue-600 text-white rounded text-sm">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Accent Color</label>
                <div className="flex space-x-2">
                  <div className="flex space-x-1">
                    {['#1f2937', '#f97316', '#10b981'].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleSettingChange('accentColor', color)}
                        className="w-6 h-6 rounded border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                    <option>Color Options</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Table Density</label>
                <select 
                  value={settings.tableDensity}
                  onChange={(e) => handleSettingChange('tableDensity', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="compact">Compact</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <MetricsCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InventoryChart />
              </div>
              <div className="space-y-6">
                <RecentActivity />
                <AlertsNotifications />
              </div>
            </div>
          </div>
        );
      case 'inventory':
        return <InventoryPage />;
      case 'management':
        return <ManagementPage />;
      case 'orders':
        return <OrdersPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      <AuthModal />
    </div>
  );
}

export default App;