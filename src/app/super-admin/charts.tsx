"use client";

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#C4F500', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

export function RevenueByCategory({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-black text-white mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) => {
                            const { category, percent } = props;
                            return `${category}: ${((percent || 0) * 100).toFixed(0)}%`;
                        }}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                    >
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `R${value.toFixed(2)}`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export function OrderStatusChart({ pending, completed }: { pending: number; completed: number }) {
    return (
        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-black text-white mb-4">Order Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={[
                            { name: 'Pending', value: pending },
                            { name: 'Completed', value: completed },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) => {
                            const { name, percent } = props;
                            return `${name}: ${((percent || 0) * 100).toFixed(0)}%`;
                        }}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        <Cell fill="#F59E0B" />
                        <Cell fill="#10B981" />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export function ProductPerformanceChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-black text-white mb-4">Product Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="name"
                        stroke="#999"
                        tick={{ fill: '#999', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis stroke="#999" tick={{ fill: '#999' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                        formatter={(value: any) => `R${value.toFixed(2)}`}
                    />
                    <Bar dataKey="revenue" fill="#C4F500" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function AdPerformanceChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-black text-white mb-4">Ad Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="title"
                        stroke="#999"
                        tick={{ fill: '#999', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis stroke="#999" tick={{ fill: '#999' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    />
                    <Bar dataKey="clicks" fill="#3B82F6" name="Clicks" />
                    <Bar dataKey="impressions" fill="#10B981" name="Impressions" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function ShowsByHostChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-black text-white mb-4">Shows by Host</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="hostName"
                        stroke="#999"
                        tick={{ fill: '#999', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis stroke="#999" tick={{ fill: '#999' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    />
                    <Bar dataKey="showCount" fill="#C4F500" name="Shows" />
                    <Bar dataKey="episodeCount" fill="#8B5CF6" name="Episodes" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function ContentDistributionChart({ data }: { data: any }) {
    if (!data) return null;

    const chartData = [
        { name: 'Shows', value: data.totalShows },
        { name: 'Episodes', value: data.totalEpisodes },
        { name: 'Events', value: data.totalEvents },
        { name: 'Ads', value: data.totalAds },
    ];

    return (
        <div className="bg-neutral-800 p-6 rounded-lg border border-white/10">
            <h3 className="text-xl font-black text-white mb-4">Content Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(props: any) => {
                            const { name, percent } = props;
                            return `${name}: ${((percent || 0) * 100).toFixed(0)}%`;
                        }}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
