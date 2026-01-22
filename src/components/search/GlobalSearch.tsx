"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { shows } from '@/lib/data/shows';
import { hosts } from '@/lib/data/hosts';
import { events } from '@/lib/data/events';
import { products } from '@/lib/data/products';

interface SearchResult {
    type: 'show' | 'host' | 'event' | 'product';
    id: string;
    title: string;
    subtitle: string;
    url: string;
}

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const searchResults: SearchResult[] = [];
        const lowerQuery = query.toLowerCase();

        // Search shows
        shows.forEach(show => {
            if (show.title.toLowerCase().includes(lowerQuery) ||
                show.host.toLowerCase().includes(lowerQuery) ||
                show.genre.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'show',
                    id: show.id,
                    title: show.title,
                    subtitle: `Show • ${show.host}`,
                    url: `/shows/${show.id}`
                });
            }
        });

        // Search hosts
        hosts.forEach(host => {
            if (host.name.toLowerCase().includes(lowerQuery) ||
                host.role.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'host',
                    id: host.id,
                    title: host.name,
                    subtitle: `Host • ${host.role}`,
                    url: `/hosts/${host.id}`
                });
            }
        });

        // Search events
        events.forEach(event => {
            if (event.title.toLowerCase().includes(lowerQuery) ||
                event.description.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'event',
                    id: event.id,
                    title: event.title,
                    subtitle: `Event • ${event.category}`,
                    url: `/events/${event.id}`
                });
            }
        });

        // Search products
        products.forEach(product => {
            if (product.name.toLowerCase().includes(lowerQuery) ||
                product.description.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'product',
                    id: product.id,
                    title: product.name,
                    subtitle: `Shop • R${product.price}`,
                    url: `/shop/${product.id}`
                });
            }
        });

        setResults(searchResults.slice(0, 8));
    }, [query]);

    return (
        <div ref={searchRef} className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-black hover:text-brand-gray transition-colors"
            >
                <Search className="w-5 h-5" />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 z-40" />

                    {/* Search Modal */}
                    <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
                        <div className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center gap-4 p-4 border-b border-white/10">
                                <Search className="w-5 h-5 text-neutral-500" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search shows, hosts, events, products..."
                                    className="flex-grow bg-transparent text-white placeholder-neutral-500 focus:outline-none text-lg"
                                    autoFocus
                                />
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setQuery('');
                                    }}
                                    className="p-2 text-neutral-500 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {results.length > 0 ? (
                                    <div className="p-2">
                                        {results.map((result) => (
                                            <Link
                                                key={`${result.type}-${result.id}`}
                                                href={result.url}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setQuery('');
                                                }}
                                            >
                                                <div className="p-4 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer">
                                                    <div className="text-white font-bold mb-1">{result.title}</div>
                                                    <div className="text-neutral-400 text-sm">{result.subtitle}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : query.length >= 2 ? (
                                    <div className="p-8 text-center text-neutral-500">
                                        No results found for "{query}"
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-neutral-500">
                                        Type at least 2 characters to search
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
