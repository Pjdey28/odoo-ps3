'use client'
import React, { useState } from 'react';
import { Search, User, Package, List, Check, X, AlertTriangle, Eye, Trash2, Filter, Menu } from 'lucide-react';
import { ordersData, listData, usersData  } from "@/config/adminPageData";
const ReWearAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mock data for orders
  const [orders, setOrders] = useState(ordersData);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for listings
  const [listings, setListings] = useState(listData);

  const [users, setUsers] = useState(usersData);

  const handleApproveItem = (id) => {
    setListings(listings.map(item => 
      item.id === id ? { ...item, status: 'approved' } : item
    ));
  };

  const handleRejectItem = (id) => {
    setListings(listings.map(item => 
      item.id === id ? { ...item, status: 'rejected' } : item
    ));
  };

  const handleConfirmOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'confirmed' } : order
    ));
  };

  const handleShipOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'shipped' } : order
    ));
  };

  const handleCompleteOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'completed' } : order
    ));
  };

  const handleCancelOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'cancelled' } : order
    ));
  };

  const handleRemoveItem = (id) => {
    setListings(listings.filter(item => item.id !== id));
  };

  const getOrderStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'disputed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredListings = listings.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = listings.filter(item => item.status === 'pending').length;
  const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl border border-white/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center justify-between sm:justify-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">ReWear Admin Panel</h1>
                <p className="text-sm sm:text-base text-green-600">Manage your sustainable fashion platform</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <div className={`flex flex-col sm:flex-row items-center gap-4 ${mobileMenuOpen ? 'flex' : 'hidden sm:flex'}`}>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80"
                />
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${mobileMenuOpen ? 'flex' : 'hidden sm:flex'}`}>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'listings'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              <Package className="inline h-4 w-4 mr-2" />
              Manage Listings
              {pendingCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              <User className="inline h-4 w-4 mr-2" />
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              <Package className="inline h-4 w-4 mr-2" />
              Manage Orders
              {pendingOrdersCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">Item Listings</h2>
                <div className="flex items-center gap-4">
                  <Filter className="h-4 w-4 text-green-600" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 sm:px-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 text-sm sm:text-base"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="flagged">Flagged</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredListings.map((item) => (
                  <div key={item.id} className="bg-white/60 rounded-xl p-4 border border-green-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      {/* User Avatar and Image */}
                      <div className="flex items-center gap-3 lg:gap-4 w-full lg:w-auto">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                          {item.user.charAt(0)}
                        </div>
                        
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.item}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base truncate">{item.item}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">by {item.user}</p>
                            <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                              <span>Category: {item.category}</span>
                              <span>Condition: {item.condition}</span>
                              <span>Date: {item.dateSubmitted}</span>
                              {item.reportCount > 0 && (
                                <span className="text-red-500">Reports: {item.reportCount}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto lg:min-w-[120px]">
                        <button
                          onClick={() => handleApproveItem(item.id)}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm"
                        >
                          <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectItem(item.id)}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Reject</span>
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 sm:mb-6">User Management</h2>
              
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-white/60 rounded-xl p-4 border border-green-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      {/* User Avatar */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {user.name.charAt(0)}
                      </div>
                      
                      {/* User Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base truncate">{user.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">{user.email}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                              <span>Joined: {user.joinDate}</span>
                              <span>Listed: {user.itemsListed}</span>
                              <span>Exchanged: {user.itemsExchanged}</span>
                              <span>Rating: {user.reputation}★</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto lg:min-w-[120px]">
                        <button className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">View Profile</span>
                        </button>
                        <button className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm">
                          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Flag User</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">Order Management</h2>
                <div className="flex items-center gap-4">
                  <Filter className="h-4 w-4 text-green-600" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 sm:px-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/80 text-sm sm:text-base"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="disputed">Disputed</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white/60 rounded-xl p-4 border border-green-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      {/* Order Image */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={order.itemImage} 
                          alt={order.item}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base truncate">{order.orderNumber}</h3>
                            <p className="text-base sm:text-lg font-medium text-gray-700 mb-1 truncate">{order.item}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                              <span>Buyer: {order.buyer}</span>
                              <span>Seller: {order.seller}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2">
                              <span>Date: {order.date}</span>
                              <span>Type: {order.exchangeType === 'swap' ? 'Item Swap' : 'Points Exchange'}</span>
                              {order.exchangeType === 'points' && <span>Points: {order.points}</span>}
                              {order.exchangeType === 'swap' && <span>Swap Item: {order.swapItem}</span>}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">Ship to: {order.shippingAddress}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto lg:min-w-[140px]">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleConfirmOrder(order.id)}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm"
                            >
                              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">Confirm</span>
                            </button>
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
                            >
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">Cancel</span>
                            </button>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => handleShipOrder(order.id)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs sm:text-sm"
                          >
                            <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Mark Shipped</span>
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm"
                          >
                            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Complete</span>
                          </button>
                        )}
                        {(order.status === 'completed' || order.status === 'cancelled') && (
                          <div className="flex-1 lg:flex-none flex items-center justify-center px-2 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs sm:text-sm">
                            {order.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </div>
                        )}
                        {order.status === 'disputed' && (
                          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
                            <button
                              onClick={() => handleCompleteOrder(order.id)}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm"
                            >
                              <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">Resolve</span>
                            </button>
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="flex-1 lg:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
                            >
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline">Cancel</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReWearAdminPanel;