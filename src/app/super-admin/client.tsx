"use client";

import Link from 'next/link';

import { useState, useEffect } from 'react';
import { Users, Activity, Settings as SettingsIcon, LayoutDashboard, Shield, DollarSign, BarChart3, Trash2, Database, Download } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
    getAllUsers, updateUserRole, getAuditLogs, getSystemSettings, updateSystemSetting, getSuperAdminStats,
    getFinancialStats, getRecentOrders, getTopProducts, getRevenueByCategory,
    getContentAnalytics, getAdPerformance, getShowsByHost,
    exportData, bulkDeleteContent, getLowStockProducts
} from '@/app/actions/super-admin';
import { toast } from 'sonner';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    RevenueByCategory,
    OrderStatusChart,
    ProductPerformanceChart,
    AdPerformanceChart,
    ShowsByHostChart,
    ContentDistributionChart
} from './charts';

export default function SuperAdminClient() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState<any[]>([]);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [settings, setSettings] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [financialStats, setFinancialStats] = useState<any>(null);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
    const [revenueByCategory, setRevenueByCategory] = useState<any[]>([]);
    const [contentAnalytics, setContentAnalytics] = useState<any>(null);
    const [adPerformance, setAdPerformance] = useState<any[]>([]);
    const [showsByHost, setShowsByHost] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Chart colors
    const COLORS = ['#C4F500', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'users') {
                const data = await getAllUsers();
                setUsers(data);
            } else if (activeTab === 'audit') {
                const data = await getAuditLogs();
                setAuditLogs(data);
            } else if (activeTab === 'settings') {
                const data = await getSystemSettings();
                setSettings(data);
            } else if (activeTab === 'overview') {
                const data = await getSuperAdminStats();
                setStats(data);
            } else if (activeTab === 'financial') {
                const [finStats, orders, products, lowStock, revByCategory] = await Promise.all([
                    getFinancialStats(),
                    getRecentOrders(),
                    getTopProducts(),
                    getLowStockProducts(),
                    getRevenueByCategory(),
                ]);
                setFinancialStats(finStats);
                setRecentOrders(orders);
                setRevenueByCategory(revByCategory);
                setTopProducts(products);
                setLowStockProducts(lowStock);
            } else if (activeTab === 'analytics') {
                const [content, ads, hosts] = await Promise.all([
                    getContentAnalytics(),
                    getAdPerformance(),
                    getShowsByHost(),
                ]);
                setContentAnalytics(content);
                setAdPerformance(ads);
                setShowsByHost(hosts);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await updateUserRole(userId, newRole);
            toast.success('User role updated');
            loadData();
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleSettingUpdate = async (key: string, value: string) => {
        try {
            await updateSystemSetting(key, value);
            toast.success('Setting updated');
            loadData();
        } catch (error) {
            toast.error('Failed to update setting');
        }
    };

    const handleExport = async (type: string) => {
        try {
            const data = await exportData(type);
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            toast.success(`${type} data exported successfully`);
        } catch (error) {
            toast.error('Failed to export data');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-black border-r border-white/10 flex flex-col overflow-y-auto">
                    <div className="p-6">
                        <h1 className="text-xl font-black text-red-500 uppercase">Super Admin</h1>
                        <p className="text-xs text-neutral-500">System Management</p>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 pb-4">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'overview' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <LayoutDashboard size={18} /> Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'users' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Users size={18} /> User Management
                        </button>
                        <button
                            onClick={() => setActiveTab('financial')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'financial' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <DollarSign size={18} /> Financial
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'analytics' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <BarChart3 size={18} /> Content Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('export')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'export' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Download size={18} /> Data Export
                        </button>
                        <button
                            onClick={() => setActiveTab('audit')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'audit' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Activity size={18} /> Audit Logs
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'settings' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <SettingsIcon size={18} /> System Settings
                        </button>

                        <div className="pt-4 mt-4 border-t border-white/10">
                            <Link
                                href="/admin"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                            >
                                <LayoutDashboard size={18} /> Admin Dashboard
                            </Link>
                        </div>
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center font-bold text-xs text-red-400">
                                <Shield size={16} />
                            </div>
                            <div className="text-sm">
                                <p className="font-bold">{session?.user?.name || 'Super Admin'}</p>
                                <p className="text-xs text-neutral-500">SUPER_ADMIN</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-neutral-900 p-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-lemon mx-auto"></div>
                            <p className="text-neutral-400 mt-4">Loading...</p>
                        </div>
                    ) : (
                        <>
                            {/* Overview Tab */}
                            {activeTab === 'overview' && stats && (
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-8">System Overview</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <div className="text-brand-lemon text-sm font-bold uppercase mb-2">Total Users</div>
                                            <div className="text-4xl font-black text-white">{stats.userCount}</div>
                                        </div>
                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <div className="text-blue-500 text-sm font-bold uppercase mb-2">Shows</div>
                                            <div className="text-4xl font-black text-white">{stats.showCount}</div>
                                        </div>
                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <div className="text-green-500 text-sm font-bold uppercase mb-2">Events</div>
                                            <div className="text-4xl font-black text-white">{stats.eventCount}</div>
                                        </div>
                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <div className="text-purple-500 text-sm font-bold uppercase mb-2">Products</div>
                                            <div className="text-4xl font-black text-white">{stats.productCount}</div>
                                        </div>
                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <div className="text-red-500 text-sm font-bold uppercase mb-2">Advertisements</div>
                                            <div className="text-4xl font-black text-white">{stats.adCount}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* User Management Tab */}
                            {activeTab === 'users' && (
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-8">User Management</h2>
                                    <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                                    <tr>
                                                        <th className="p-4">Name</th>
                                                        <th className="p-4">Email</th>
                                                        <th className="p-4">Role</th>
                                                        <th className="p-4">Joined</th>
                                                        <th className="p-4">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-white/5">
                                                    {users.map((user) => (
                                                        <tr key={user.id}>
                                                            <td className="p-4 font-bold">{user.name || 'N/A'}</td>
                                                            <td className="p-4 text-neutral-400">{user.email}</td>
                                                            <td className="p-4">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'SUPER_ADMIN' ? 'bg-red-500/20 text-red-400' :
                                                                    user.role === 'ADMIN' ? 'bg-brand-lemon/20 text-brand-lemon' :
                                                                        'bg-neutral-700 text-white'
                                                                    }`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-neutral-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                            <td className="p-4">
                                                                <select
                                                                    value={user.role}
                                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                                    className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-xs text-white"
                                                                >
                                                                    <option value="USER">USER</option>
                                                                    <option value="ADMIN">ADMIN</option>
                                                                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Financial Dashboard */}
                            {activeTab === 'financial' && financialStats && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-black text-white mb-8">Financial Dashboard</h2>

                                        {/* Revenue Overview */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-green-500 text-sm font-bold uppercase mb-2">Total Revenue</div>
                                                <div className="text-4xl font-black text-white">R{financialStats.totalRevenue.toFixed(2)}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-blue-500 text-sm font-bold uppercase mb-2">Monthly Revenue</div>
                                                <div className="text-4xl font-black text-white">R{financialStats.monthlyRevenue.toFixed(2)}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-purple-500 text-sm font-bold uppercase mb-2">Avg Order Value</div>
                                                <div className="text-4xl font-black text-white">R{financialStats.averageOrderValue.toFixed(2)}</div>
                                            </div>
                                        </div>

                                        {/* Order Statistics */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-neutral-400 text-sm font-bold uppercase mb-2">Total Orders</div>
                                                <div className="text-3xl font-black text-white">{financialStats.totalOrders}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-yellow-500 text-sm font-bold uppercase mb-2">Pending</div>
                                                <div className="text-3xl font-black text-white">{financialStats.pendingOrders}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-green-500 text-sm font-bold uppercase mb-2">Completed</div>
                                                <div className="text-3xl font-black text-white">{financialStats.completedOrders}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Charts Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <RevenueByCategory data={revenueByCategory} />
                                        <OrderStatusChart
                                            pending={financialStats.pendingOrders}
                                            completed={financialStats.completedOrders}
                                        />
                                    </div>

                                    {/* Top Products with Chart */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        {/* Top Products Table */}
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-4">Top Products</h3>
                                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                                <table className="w-full text-left">
                                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                                        <tr>
                                                            <th className="p-4">Product</th>
                                                            <th className="p-4">Units Sold</th>
                                                            <th className="p-4">Revenue</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm divide-y divide-white/5">
                                                        {topProducts.slice(0, 5).map((product: any) => (
                                                            <tr key={product.id}>
                                                                <td className="p-4 font-bold">{product.name}</td>
                                                                <td className="p-4 text-neutral-400">{product.unitsSold}</td>
                                                                <td className="p-4 text-green-400 font-bold">R{product.revenue.toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <ProductPerformanceChart data={topProducts} />
                                    </div>

                                    {/* Low Stock Alert */}
                                    {lowStockProducts.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-black text-white mb-4">⚠️ Low Stock Alert</h3>
                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                                <div className="space-y-2">
                                                    {lowStockProducts.map((product: any) => (
                                                        <div key={product.id} className="flex justify-between items-center">
                                                            <span className="text-white font-bold">{product.name}</span>
                                                            <span className="text-red-400 font-bold">{product.stock} left</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recent Orders */}
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-4">Top Products</h3>
                                        <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                                    <tr>
                                                        <th className="p-4">Product</th>
                                                        <th className="p-4">Units Sold</th>
                                                        <th className="p-4">Revenue</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-white/5">
                                                    {topProducts.map((product: any) => (
                                                        <tr key={product.id}>
                                                            <td className="p-4 font-bold">{product.name}</td>
                                                            <td className="p-4 text-neutral-400">{product.unitsSold}</td>
                                                            <td className="p-4 text-green-400 font-bold">R{product.revenue.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Low Stock Alert */}
                                    {lowStockProducts.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-4">⚠️ Low Stock Alert</h3>
                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                                <div className="space-y-2">
                                                    {lowStockProducts.map((product: any) => (
                                                        <div key={product.id} className="flex justify-between items-center">
                                                            <span className="text-white font-bold">{product.name}</span>
                                                            <span className="text-red-400 font-bold">{product.stock} left</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recent Orders */}
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-4">Recent Orders</h3>
                                        <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                                    <tr>
                                                        <th className="p-4">Order ID</th>
                                                        <th className="p-4">Customer</th>
                                                        <th className="p-4">Total</th>
                                                        <th className="p-4">Status</th>
                                                        <th className="p-4">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-white/5">
                                                    {recentOrders.map((order: any) => (
                                                        <tr key={order.id}>
                                                            <td className="p-4 font-mono text-xs">{order.id.slice(0, 8)}</td>
                                                            <td className="p-4">{order.user.email}</td>
                                                            <td className="p-4 font-bold text-green-400">R{order.total.toFixed(2)}</td>
                                                            <td className="p-4">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                                                    order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-red-500/20 text-red-400'
                                                                    }`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Content Analytics */}
                            {activeTab === 'analytics' && contentAnalytics && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-black text-white mb-8">Content Analytics</h2>

                                        {/* Content Overview */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-blue-500 text-sm font-bold uppercase mb-2">Total Shows</div>
                                                <div className="text-4xl font-black text-white">{contentAnalytics.totalShows}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-purple-500 text-sm font-bold uppercase mb-2">Total Episodes</div>
                                                <div className="text-4xl font-black text-white">{contentAnalytics.totalEpisodes}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-green-500 text-sm font-bold uppercase mb-2">Upcoming Events</div>
                                                <div className="text-4xl font-black text-white">{contentAnalytics.upcomingEvents}</div>
                                            </div>
                                            <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <div className="text-red-500 text-sm font-bold uppercase mb-2">Active Ads</div>
                                                <div className="text-4xl font-black text-white">{contentAnalytics.activeAds}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ad Performance */}
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-4">Advertisement Performance</h3>
                                        <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                                    <tr>
                                                        <th className="p-4">Ad Title</th>
                                                        <th className="p-4">Clicks</th>
                                                        <th className="p-4">Impressions</th>
                                                        <th className="p-4">CTR</th>
                                                        <th className="p-4">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-white/5">
                                                    {adPerformance.map((ad: any) => (
                                                        <tr key={ad.id}>
                                                            <td className="p-4 font-bold">{ad.title}</td>
                                                            <td className="p-4 text-blue-400">{ad.clicks}</td>
                                                            <td className="p-4 text-neutral-400">{ad.impressions}</td>
                                                            <td className="p-4 text-green-400 font-bold">{ad.ctr}%</td>
                                                            <td className="p-4">
                                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${ad.active ? 'bg-green-500/20 text-green-400' : 'bg-neutral-700 text-neutral-400'}`}>
                                                                    {ad.active ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Shows by Host */}
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-4">Shows by Host</h3>
                                        <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                            <table className="w-full text-left">
                                                <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                                    <tr>
                                                        <th className="p-4">Host</th>
                                                        <th className="p-4">Shows</th>
                                                        <th className="p-4">Episodes</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm divide-y divide-white/5">
                                                    {showsByHost.map((host: any, index: number) => (
                                                        <tr key={index}>
                                                            <td className="p-4 font-bold">{host.hostName}</td>
                                                            <td className="p-4 text-blue-400">{host.showCount}</td>
                                                            <td className="p-4 text-purple-400">{host.episodeCount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Data Export */}
                            {activeTab === 'export' && (
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-8">Data Export</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {['users', 'orders', 'products', 'shows', 'events', 'auditLogs'].map((type) => (
                                            <div key={type} className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                                <h3 className="text-xl font-bold text-white mb-4 capitalize">{type}</h3>
                                                <p className="text-neutral-400 text-sm mb-4">Export all {type} data as JSON</p>
                                                <button
                                                    onClick={() => handleExport(type)}
                                                    className="w-full px-4 py-2 bg-brand-lemon text-black rounded font-bold hover:bg-brand-lemon/80 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Download size={18} />
                                                    Export {type}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Audit Logs Tab */}
                            {activeTab === 'audit' && (
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-8">Audit Logs</h2>
                                    <div className="space-y-4">
                                        {auditLogs.map((log) => (
                                            <div key={log.id} className="bg-neutral-800 p-4 rounded-lg border border-white/10">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="px-2 py-1 bg-brand-lemon/20 text-brand-lemon text-xs font-bold rounded">
                                                                {log.action}
                                                            </span>
                                                            <span className="text-xs text-neutral-500">
                                                                {new Date(log.createdAt).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-neutral-300">{log.details || 'No details'}</p>
                                                        <p className="text-xs text-neutral-500 mt-1">
                                                            By: {log.user?.name || log.user?.email || 'Unknown'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {auditLogs.length === 0 && (
                                            <p className="text-center text-neutral-500 py-8">No audit logs yet</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* System Settings Tab */}
                            {activeTab === 'settings' && (
                                <div>
                                    <h2 className="text-3xl font-black text-white mb-8">System Settings</h2>
                                    <div className="space-y-4">
                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <h3 className="font-bold text-lg mb-4">Maintenance Mode</h3>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleSettingUpdate('maintenance_mode', 'false')}
                                                    className="px-4 py-2 bg-green-500/20 text-green-400 rounded font-bold hover:bg-green-500/30"
                                                >
                                                    Disable
                                                </button>
                                                <button
                                                    onClick={() => handleSettingUpdate('maintenance_mode', 'true')}
                                                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded font-bold hover:bg-red-500/30"
                                                >
                                                    Enable
                                                </button>
                                                <span className="text-sm text-neutral-400">
                                                    Current: {settings.find(s => s.key === 'maintenance_mode')?.value || 'false'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
                                            <h3 className="font-bold text-lg mb-4">Global Announcement</h3>
                                            <input
                                                type="text"
                                                placeholder="Enter announcement message"
                                                defaultValue={settings.find(s => s.key === 'announcement')?.value || ''}
                                                onBlur={(e) => handleSettingUpdate('announcement', e.target.value)}
                                                className="w-full bg-neutral-900 border border-white/10 rounded p-3 text-white"
                                            />
                                        </div>

                                        {settings.length === 0 && (
                                            <p className="text-center text-neutral-500 py-8">No settings configured</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
