"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useState } from 'react';
import { LayoutDashboard, Radio, Calendar, ShoppingBag, Mic, Users, Trash2, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { deleteShow, createShow, deleteEvent, createEvent, deleteProduct, createProduct, createEpisode, deleteEpisode, createAd, deleteAd, toggleAdStatus } from '@/app/actions/admin';
import { toast } from 'sonner';

interface AdminDashboardClientProps {
    users: any[];
    shows: any[];
    events: any[];
    products: any[];
    episodes: any[];
    ads: any[];
    stats: {
        userCount: number;
        showCount: number;
        eventCount: number;
        productCount: number;
        adCount: number;
    };
}

export default function AdminDashboardClient({ users, shows, events, products, episodes, ads, stats }: AdminDashboardClientProps) {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('overview');

    // Forms State
    const [showForm, setShowForm] = useState(false);
    const [eventForm, setEventForm] = useState(false);
    const [productForm, setProductForm] = useState(false);
    const [episodeForm, setEpisodeForm] = useState(false);
    const [adForm, setAdForm] = useState(false);
    const [adType, setAdType] = useState<'image' | 'video'>('image');

    const handleDeleteShow = async (id: string) => {
        if (confirm('Delete this show?')) {
            await deleteShow(id);
            toast.success("Show deleted");
        }
    }

    const handleDeleteEvent = async (id: string) => {
        if (confirm('Delete this event?')) {
            await deleteEvent(id);
            toast.success("Event deleted");
        }
    }

    const handleDeleteProduct = async (id: string) => {
        if (confirm('Delete this product?')) {
            await deleteProduct(id);
            toast.success("Product deleted");
        }
    }

    const handleDeleteEpisode = async (id: string) => {
        if (confirm('Delete this episode?')) {
            await deleteEpisode(id);
            toast.success("Episode deleted");
        }
    }

    const handleDeleteAd = async (id: string) => {
        if (confirm('Delete this advertisement?')) {
            await deleteAd(id);
            toast.success("Ad deleted");
            window.location.reload();
        }
    }

    const handleToggleAd = async (id: string, currentStatus: boolean) => {
        await toggleAdStatus(id, !currentStatus);
        toast.success(`Ad ${!currentStatus ? 'activated' : 'deactivated'}`);
        window.location.reload();
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-black border-r border-white/10 flex flex-col">
                    <div className="p-6">
                        <h1 className="text-xl font-black text-brand-lemon uppercase">Station Admin</h1>
                        <p className="text-xs text-neutral-500">Content Management System</p>
                    </div>

                    <nav className="flex-1 px-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'overview' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <LayoutDashboard size={18} /> Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('shows')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'shows' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Radio size={18} /> Shows
                        </button>
                        <button
                            onClick={() => setActiveTab('episodes')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'episodes' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Mic size={18} /> Episodes
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'events' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Calendar size={18} /> Events
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'products' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <ShoppingBag size={18} /> Shop Products
                        </button>
                        <button
                            onClick={() => setActiveTab('ads')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'ads' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Megaphone size={18} /> Advertisements
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'users' ? 'bg-brand-lemon text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                        >
                            <Users size={18} /> Users
                        </button>

                        {(session?.user as any)?.role === 'SUPER_ADMIN' && (
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <Link
                                    href="/super-admin"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
                                >
                                    <LayoutDashboard size={18} /> Super Admin
                                </Link>
                            </div>
                        )}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-xs">
                                AD
                            </div>
                            <div className="text-sm">
                                <p className="font-bold">Admin User</p>
                                <p className="text-xs text-neutral-500">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-neutral-900 p-8">
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-8">System Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Total Users</h3>
                                    <p className="text-4xl font-black text-white">{stats.userCount}</p>
                                </div>
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Shows</h3>
                                    <p className="text-4xl font-black text-white">{stats.showCount}</p>
                                </div>
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Events</h3>
                                    <p className="text-4xl font-black text-white">{stats.eventCount}</p>
                                </div>
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Products</h3>
                                    <p className="text-4xl font-black text-white">{stats.productCount}</p>
                                </div>
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6">
                                    <h3 className="text-neutral-400 text-sm font-bold uppercase mb-2">Ads</h3>
                                    <p className="text-4xl font-black text-white">{stats.adCount}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- SHOWS --- */}
                    {activeTab === 'shows' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-white">Manage Shows</h2>
                                <Button onClick={() => setShowForm(!showForm)}>
                                    {showForm ? 'Cancel' : '+ Add New Show'}
                                </Button>
                            </div>

                            {showForm && (
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6 mb-8 animate-fade-in">
                                    <h3 className="font-bold text-lg mb-4">New Show Details</h3>
                                    <form action={async (formData) => {
                                        const res = await createShow(formData);
                                        if (res.success) { setShowForm(false); toast.success("Show created"); }
                                        else toast.error(res.error);
                                    }} className="space-y-4">
                                        <div><label className="text-xs font-bold text-neutral-400">Title</label><input name="title" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div><label className="text-xs font-bold text-neutral-400">Description</label><textarea name="description" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-neutral-400">Day</label>
                                                <select name="day" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white">
                                                    <option value="">Select day</option>
                                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div><label className="text-xs font-bold text-neutral-400">Host</label>
                                                <select name="hostId" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white">
                                                    <option value="">Select Host</option>
                                                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-neutral-400">Start Time</label>
                                                <input type="time" name="startTime" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-neutral-400">End Time</label>
                                                <input type="time" name="endTime" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-neutral-400">Cover Image (Upload)</label>
                                            <input type="file" name="coverImageFile" accept="image/*" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="featured" name="featured" className="w-4 h-4" />
                                            <label htmlFor="featured" className="text-xs font-bold text-neutral-400">Mark as Featured Show</label>
                                        </div>
                                        <Button type="submit">Save Show</Button>
                                    </form>
                                </div>
                            )}

                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                        <tr><th className="p-4">Show</th><th className="p-4">Schedule</th><th className="p-4">Actions</th></tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-white/5">
                                        {shows.map((show) => (
                                            <tr key={show.id}>
                                                <td className="p-4 font-bold">{show.title}</td>
                                                <td className="p-4">{show.schedule}</td>
                                                <td className="p-4"><button onClick={() => handleDeleteShow(show.id)} className="text-red-500 hover:text-white"><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- EPISODES --- */}
                    {activeTab === 'episodes' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-white">Manage Episodes</h2>
                                <Button onClick={() => setEpisodeForm(!episodeForm)}>
                                    {episodeForm ? 'Cancel' : '+ Add New Episode'}
                                </Button>
                            </div>

                            {episodeForm && (
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6 mb-8 animate-fade-in">
                                    <h3 className="font-bold text-lg mb-4">New Episode Details</h3>
                                    {shows.length === 0 ? (
                                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg text-sm mb-4">
                                            <strong>Warning:</strong> You must create a Show first before adding an Episode. Go to the "Shows" tab to create one.
                                        </div>
                                    ) : (
                                        <form action={async (formData) => {
                                            const res = await createEpisode(formData);
                                            if (res.success) { setEpisodeForm(false); toast.success("Episode added"); }
                                            else toast.error(res.error);
                                        }} className="space-y-4">
                                            <div><label className="text-xs font-bold text-neutral-400">Episode Title</label><input name="title" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="text-xs font-bold text-neutral-400">Show</label>
                                                    <select name="showId" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white">
                                                        <option value="">Select Show</option>
                                                        {shows.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                                                    </select>
                                                </div>
                                                <div><label className="text-xs font-bold text-neutral-400">Duration (min)</label><input type="number" name="duration" defaultValue="60" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                            </div>
                                            <div><label className="text-xs font-bold text-neutral-400">Audio URL (MP3 Link)</label><input name="audioUrl" placeholder="https://..." className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                            <div>
                                                <label className="text-xs font-bold text-neutral-400">Episode Image (Upload)</label>
                                                <input type="file" name="imageFile" accept="image/*" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                            </div>
                                            <Button type="submit">Save Episode</Button>
                                        </form>
                                    )}
                                </div>
                            )}

                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                        <tr><th className="p-4">Episode</th><th className="p-4">Show</th><th className="p-4">Date</th><th className="p-4">Actions</th></tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-white/5">
                                        {episodes.map((ep) => (
                                            <tr key={ep.id}>
                                                <td className="p-4 font-bold">{ep.title}</td>
                                                <td className="p-4 text-neutral-400">{ep.show?.title}</td>
                                                <td className="p-4">{new Date(ep.releaseDate).toLocaleDateString()}</td>
                                                <td className="p-4"><button onClick={() => handleDeleteEpisode(ep.id)} className="text-red-500 hover:text-white"><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'events' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-white">Manage Events</h2>
                                <Button onClick={() => setEventForm(!eventForm)}>
                                    {eventForm ? 'Cancel' : '+ Add New Event'}
                                </Button>
                            </div>

                            {eventForm && (
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6 mb-8 animate-fade-in">
                                    <form action={async (formData) => {
                                        const res = await createEvent(formData);
                                        if (res.success) { setEventForm(false); toast.success("Event created"); }
                                    }} className="space-y-4">
                                        <div><label className="text-xs font-bold text-neutral-400">Title</label><input name="title" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="text-xs font-bold text-neutral-400">Date (YYYY-MM-DD)</label><input type="date" name="date" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                            <div><label className="text-xs font-bold text-neutral-400">Location</label><input name="location" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        </div>
                                        <div><label className="text-xs font-bold text-neutral-400">Description</label><textarea name="description" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div><label className="text-xs font-bold text-neutral-400">Ticket Link</label><input name="ticketLink" placeholder="https://..." className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div>
                                            <label className="text-xs font-bold text-neutral-400">Event Image (Upload)</label>
                                            <input type="file" name="imageFile" accept="image/*" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                        </div>
                                        <Button type="submit">Save Event</Button>
                                    </form>
                                </div>
                            )}

                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                        <tr><th className="p-4">Event</th><th className="p-4">Date</th><th className="p-4">Location</th><th className="p-4">Actions</th></tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-white/5">
                                        {events.map((e) => (
                                            <tr key={e.id}>
                                                <td className="p-4 font-bold">{e.title}</td>
                                                <td className="p-4">{new Date(e.date).toLocaleDateString()}</td>
                                                <td className="p-4">{e.location}</td>
                                                <td className="p-4"><button onClick={() => handleDeleteEvent(e.id)} className="text-red-500 hover:text-white"><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- PRODUCTS --- */}
                    {activeTab === 'products' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-white">Manage Products</h2>
                                <Button onClick={() => setProductForm(!productForm)}>
                                    {productForm ? 'Cancel' : '+ Add New Product'}
                                </Button>
                            </div>

                            {productForm && (
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6 mb-8 animate-fade-in">
                                    <form action={async (formData) => {
                                        const res = await createProduct(formData);
                                        if (res.success) { setProductForm(false); toast.success("Product created"); }
                                    }} className="space-y-4">
                                        <div><label className="text-xs font-bold text-neutral-400">Product Name</label><input name="name" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="text-xs font-bold text-neutral-400">Price (R)</label><input type="number" step="0.01" name="price" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                            <div><label className="text-xs font-bold text-neutral-400">Category</label><input name="category" placeholder="Apparel" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        </div>
                                        <div><label className="text-xs font-bold text-neutral-400">Description</label><textarea name="description" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div>
                                            <label className="text-xs font-bold text-neutral-400">Product Image (Upload)</label>
                                            <input type="file" name="imageFile" accept="image/*" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                        </div>
                                        <Button type="submit">Save Product</Button>
                                    </form>
                                </div>
                            )}

                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                        <tr><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Category</th><th className="p-4">Actions</th></tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-white/5">
                                        {products.map((p) => (
                                            <tr key={p.id}>
                                                <td className="p-4 font-bold">{p.name}</td>
                                                <td className="p-4">R{p.price}</td>
                                                <td className="p-4">{p.category}</td>
                                                <td className="p-4"><button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-white"><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- ADVERTISEMENTS --- */}
                    {activeTab === 'ads' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-black text-white">Manage Advertisements</h2>
                                <Button onClick={() => setAdForm(!adForm)}>
                                    {adForm ? 'Cancel' : '+ Add New Ad'}
                                </Button>
                            </div>

                            {adForm && (
                                <div className="bg-neutral-800 border border-white/10 rounded-xl p-6 mb-8 animate-fade-in">
                                    <h3 className="font-bold text-lg mb-4">New Advertisement</h3>
                                    <form action={async (formData) => {
                                        const res = await createAd(formData);
                                        if (res.success) { setAdForm(false); toast.success("Ad created"); window.location.reload(); }
                                        else toast.error(res.error);
                                    }} className="space-y-4" id="adForm">
                                        <div><label className="text-xs font-bold text-neutral-400">Ad Title/Advertiser Name</label><input name="title" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        <div>
                                            <label className="text-xs font-bold text-neutral-400">Ad Type</label>
                                            <select name="adType" id="adType" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" value={adType} onChange={(e) => setAdType(e.target.value as 'image' | 'video')}>
                                                <option value="image">Image Ad</option>
                                                <option value="video">Video Ad</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-neutral-400">Placement</label>
                                                <select name="placement" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white">
                                                    <option value="">Select Placement</option>
                                                    <option value="homepage">Homepage</option>
                                                    <option value="sidebar">Sidebar</option>
                                                    <option value="banner">Banner</option>
                                                    <option value="between-content">Between Content</option>
                                                </select>
                                            </div>
                                            <div><label className="text-xs font-bold text-neutral-400">Position (Priority)</label><input type="number" name="position" defaultValue="0" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="text-xs font-bold text-neutral-400">Start Date (Optional)</label><input type="date" name="startDate" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                            <div><label className="text-xs font-bold text-neutral-400">End Date (Optional)</label><input type="date" name="endDate" className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        </div>
                                        <div><label className="text-xs font-bold text-neutral-400">Click-Through URL (Optional)</label><input name="link" placeholder="https://..." className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" /></div>
                                        {adType === 'image' ? (
                                            <div>
                                                <label htmlFor="imageFile" className="text-xs font-bold text-neutral-400">Ad Image (Upload)</label>
                                                <input type="file" id="imageFile" name="imageFile" accept="image/*" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                            </div>
                                        ) : (
                                            <div>
                                                <label htmlFor="videoFile" className="text-xs font-bold text-neutral-400">Ad Video (Upload)</label>
                                                <input type="file" id="videoFile" name="videoFile" accept="video/*" required className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-white" />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="adActive" name="active" defaultChecked className="w-4 h-4 accent-brand-lemon" />
                                            <label htmlFor="adActive" className="text-xs font-bold text-neutral-400">Active</label>
                                        </div>
                                        <Button type="submit">Save Advertisement</Button>
                                    </form>
                                </div>
                            )}

                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                        <tr><th className="p-4">Title</th><th className="p-4">Type</th><th className="p-4">Placement</th><th className="p-4">Status</th><th className="p-4">Clicks</th><th className="p-4">Impressions</th><th className="p-4">Actions</th></tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-white/5">
                                        {ads.length === 0 ? (
                                            <tr><td colSpan={7} className="p-4 text-center text-neutral-500">No advertisements found. Add your first ad!</td></tr>
                                        ) : (
                                            ads.map((ad) => (
                                                <tr key={ad.id}>
                                                    <td className="p-4 font-bold">{ad.title}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${ad.type === 'video' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                            {ad.type === 'video' ? 'Video' : 'Image'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-neutral-400 uppercase">{ad.placement}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${ad.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                            {ad.active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-neutral-400">{ad.clicks || 0}</td>
                                                    <td className="p-4 text-neutral-400">{ad.impressions || 0}</td>
                                                    <td className="p-4 flex gap-2">
                                                        <button onClick={() => handleToggleAd(ad.id, ad.active)} className={`text-xs px-2 py-1 rounded ${ad.active ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}>
                                                            {ad.active ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                        <button onClick={() => handleDeleteAd(ad.id)} className="text-red-500 hover:text-white"><Trash2 size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- USERS --- */}
                    {activeTab === 'users' && (
                        <div>
                            <h2 className="text-3xl font-black text-white mb-8">Registered Users</h2>
                            <div className="bg-neutral-800 border border-white/10 rounded-xl overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-black text-neutral-400 text-xs font-bold uppercase">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Role</th>
                                            <th className="p-4">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-white/5">
                                        {users.length === 0 ? (
                                            <tr><td colSpan={4} className="p-4 text-center text-neutral-500">No users found.</td></tr>
                                        ) : (
                                            users.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="p-4 font-bold flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-xs">
                                                            {user.name?.charAt(0) || 'U'}
                                                        </div>
                                                        {user.name}
                                                    </td>
                                                    <td className="p-4 text-neutral-400">{user.email}</td>
                                                    <td className="p-4">
                                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.role === 'ADMIN' ? 'bg-brand-lemon text-black' : 'bg-neutral-700 text-white'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-neutral-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
