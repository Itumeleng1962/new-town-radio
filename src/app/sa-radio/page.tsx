"use client";

import { saRadioStations } from '@/lib/data/sa-radio-stations';
import { useState } from 'react';
import { useAudioPlayer } from '@/lib/hooks/useAudioPlayer';
import { Button } from '@/components/ui/Button';
import { Play, Pause, Radio, MapPin, Globe, Volume2, Loader2, AlertCircle } from 'lucide-react';

export default function SARadioPage() {
    const [selectedGenre, setSelectedGenre] = useState<string>('All');
    const { isPlaying, currentStation, volume, loading, error, play, stop, changeVolume } = useAudioPlayer();

    const genres = ['All', ...Array.from(new Set(saRadioStations.map(s => s.genre)))];

    const filteredStations = selectedGenre === 'All'
        ? saRadioStations
        : saRadioStations.filter(station => station.genre === selectedGenre);

    const handlePlayPause = (stationId: string, streamUrl: string) => {
        if (currentStation === stationId && isPlaying) {
            stop();
        } else {
            play(streamUrl, stationId);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-4">
                    South African <span className="text-brand-lemon">Radio Stations</span>
                </h1>
                <p className="text-neutral-400 text-lg max-w-2xl">
                    Listen to the best radio stations from across South Africa. From Metro FM to Ukhozi FM, stream your favorites live.
                </p>
            </div>

            {/* Global Player Controls */}
            {currentStation && (
                <div className="mb-8 bg-brand-lemon/10 border border-brand-lemon/30 rounded-xl p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 gap-1">
                                <div className="w-1 bg-brand-lemon rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1 bg-brand-lemon rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-1 bg-brand-lemon rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <div>
                                <div className="text-brand-lemon text-xs font-bold uppercase mb-1">Now Playing</div>
                                <div className="text-white font-bold">
                                    {saRadioStations.find(s => s.id === currentStation)?.name}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Volume2 className="w-5 h-5 text-neutral-400" />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume * 100}
                                    onChange={(e) => changeVolume(parseInt(e.target.value) / 100)}
                                    className="w-24 accent-brand-lemon"
                                />
                            </div>
                            <Button variant="outline" size="sm" onClick={stop}>
                                Stop
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="mb-8 bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            )}

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 font-bold text-sm uppercase tracking-wider transition-all ${selectedGenre === genre
                                ? 'bg-brand-lemon text-brand-gray'
                                : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                            }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {/* Stations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStations.map((station) => {
                    const isCurrentStation = currentStation === station.id;
                    const isStationPlaying = isCurrentStation && isPlaying;
                    const isStationLoading = isCurrentStation && loading;

                    return (
                        <div
                            key={station.id}
                            className={`bg-neutral-900 border rounded-xl overflow-hidden transition-all group ${isCurrentStation ? 'border-brand-lemon/50' : 'border-white/10 hover:border-brand-lemon/50'
                                }`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 text-brand-lemon text-xs font-bold uppercase mb-2">
                                            <Radio size={14} />
                                            {station.frequency}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-brand-lemon transition-colors mb-1">
                                            {station.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-neutral-500 text-sm mb-3">
                                            <MapPin size={14} />
                                            {station.location}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handlePlayPause(station.id, station.streamUrl)}
                                        disabled={isStationLoading}
                                        className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${isStationPlaying
                                                ? 'bg-brand-lemon text-brand-gray'
                                                : 'bg-neutral-800 text-white hover:bg-brand-lemon hover:text-brand-gray'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isStationLoading ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : isStationPlaying ? (
                                            <Pause size={20} fill="currentColor" />
                                        ) : (
                                            <Play size={20} fill="currentColor" className="ml-0.5" />
                                        )}
                                    </button>
                                </div>

                                <div className="inline-block px-3 py-1 bg-neutral-800 text-neutral-400 text-xs font-bold uppercase rounded-full mb-3">
                                    {station.genre}
                                </div>

                                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {station.description}
                                </p>

                                <a
                                    href={station.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-brand-lemon text-sm font-bold hover:underline"
                                >
                                    <Globe size={14} />
                                    Visit Website
                                </a>
                            </div>

                            {isStationPlaying && (
                                <div className="bg-brand-lemon/10 border-t border-brand-lemon/30 px-6 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-4 gap-1">
                                            <div className="w-1 bg-brand-lemon rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-1 bg-brand-lemon rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-1 bg-brand-lemon rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                        <span className="text-brand-lemon text-xs font-bold uppercase">Now Playing</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {filteredStations.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-neutral-500 text-lg">No stations found in this genre.</p>
                </div>
            )}

            {/* Info Section */}
            <div className="mt-20 bg-neutral-900 border border-white/10 rounded-2xl p-8">
                <h2 className="text-3xl font-black text-white uppercase mb-4">About SA Radio Stations</h2>
                <p className="text-neutral-300 leading-relaxed mb-6">
                    South Africa has a rich and diverse radio landscape, with stations broadcasting in multiple languages and serving various communities across the country. From the massive reach of Ukhozi FM (the country's biggest station) to the urban sounds of Metro FM and 5FM, there's something for everyone.
                </p>
                <p className="text-neutral-300 leading-relaxed mb-6">
                    These stations are available on FM frequencies across different regions, and many also offer online streaming so you can listen from anywhere in the world. Click the play button on any station above to start listening live.
                </p>
                <div className="bg-brand-lemon/10 border border-brand-lemon/30 rounded-xl p-4">
                    <p className="text-brand-lemon text-sm font-bold">
                        💡 Tip: Use the volume slider in the player controls to adjust the audio level. Some streams may take a few seconds to buffer before playing.
                    </p>
                </div>
            </div>
        </div>
    );
}
