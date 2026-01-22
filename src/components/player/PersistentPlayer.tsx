"use client";

import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Share2, Heart, ListMusic } from 'lucide-react';
import Image from 'next/image';

export function PersistentPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(80);
    const audioRef = useRef<HTMLAudioElement>(null);
    const STREAM_URL = "https://stream.zeno.fm/0r0xa752kzquv"; // Validated Zeno stream from previous config or user preference

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Listen for volume changes (simplified)
    const handleVolume = (val: number) => {
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val / 100;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-white/10 text-white h-20 md:h-24 shadow-2xl shadow-black">
            <audio ref={audioRef} src={STREAM_URL} preload="none" />
            <div className="h-full container mx-auto px-4 flex items-center justify-between">

                {/* Track Info */}
                <div className="flex items-center w-1/3 min-w-0 pr-4">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 bg-neutral-800 rounded overflow-hidden mr-4 group">
                        {/* Placeholder for show art */}
                        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-600 font-bold text-xs">
                            LIVE
                        </div>
                    </div>
                    <div className="min-w-0 overflow-hidden">
                        <h4 className="text-sm md:text-base font-bold truncate text-white">Morning Drive</h4>
                        <p className="text-xs md:text-sm text-neutral-400 truncate">Host: DJ Tshepo</p>
                    </div>
                    <button className="ml-4 text-neutral-400 hover:text-brand-lemon hidden md:block">
                        <Heart size={18} />
                    </button>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex items-center space-x-6">
                        <button className="text-neutral-400 hover:text-white transition-colors hidden md:block">
                            <SkipBack size={20} />
                        </button>
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-lemon text-brand-gray flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                        </button>
                        <button className="text-neutral-400 hover:text-white transition-colors hidden md:block">
                            <SkipForward size={20} />
                        </button>
                    </div>
                    <div className="w-full max-w-xs mt-2 hidden md:flex items-center space-x-2 text-xs text-neutral-500 font-mono">
                        <span className="text-brand-lemon">● LIVE</span>
                        <div className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-brand-lemon/20 animate-pulse"></div>
                        </div>
                        <span>ON AIR</span>
                    </div>
                </div>

                {/* Volume / Extra */}
                <div className="flex items-center justify-end w-1/3 space-x-4 pl-4">
                    <button className="text-neutral-400 hover:text-white hidden md:block" title="Queue">
                        <ListMusic size={20} />
                    </button>

                    <div className="flex items-center group relative">
                        <button className="text-neutral-400 hover:text-white mr-2">
                            <Volume2 size={20} />
                        </button>
                        <div className="w-24 h-1 bg-neutral-800 rounded-full cursor-pointer overflow-hidden hidden md:block">
                            <div className="h-full bg-white group-hover:bg-brand-lemon w-[80%]"></div>
                        </div>
                    </div>

                    <button className="text-neutral-400 hover:text-white hidden md:block" title="Share">
                        <Share2 size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
}
