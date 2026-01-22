"use client";

import { useState, useEffect, useRef } from 'react';

export function useAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentStation, setCurrentStation] = useState<string | null>(null);
    const [volume, setVolume] = useState(0.7);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio();
        audioRef.current.volume = volume;
        audioRef.current.preload = 'none';

        // Event listeners
        const handleCanPlay = () => {
            setLoading(false);
            setError(null);
        };

        const handleError = () => {
            setLoading(false);
            setError('Failed to load stream. The station may be offline.');
            setIsPlaying(false);
        };

        const handleLoadStart = () => {
            setLoading(true);
        };

        audioRef.current.addEventListener('canplay', handleCanPlay);
        audioRef.current.addEventListener('error', handleError);
        audioRef.current.addEventListener('loadstart', handleLoadStart);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current.removeEventListener('canplay', handleCanPlay);
                audioRef.current.removeEventListener('error', handleError);
                audioRef.current.removeEventListener('loadstart', handleLoadStart);
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const play = (streamUrl: string, stationId: string) => {
        if (!audioRef.current) return;

        setError(null);

        // If same station, just toggle play/pause
        if (currentStation === stationId && audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                setLoading(true);
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setLoading(false);
                    })
                    .catch(() => {
                        setError('Failed to play stream');
                        setLoading(false);
                    });
            }
            return;
        }

        // New station - stop current and load new
        audioRef.current.pause();
        audioRef.current.src = streamUrl;
        setCurrentStation(stationId);
        setLoading(true);

        audioRef.current.load();
        audioRef.current.play()
            .then(() => {
                setIsPlaying(true);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to play stream');
                setLoading(false);
                setIsPlaying(false);
            });
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
            setIsPlaying(false);
            setCurrentStation(null);
            setError(null);
        }
    };

    const changeVolume = (newVolume: number) => {
        setVolume(newVolume);
    };

    return {
        isPlaying,
        currentStation,
        volume,
        loading,
        error,
        play,
        stop,
        changeVolume
    };
}
