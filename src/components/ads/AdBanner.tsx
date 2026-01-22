"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Ad {
  id: string;
  title: string;
  type: 'image' | 'video';
  image: string | null;
  videoUrl: string | null;
  link: string | null;
  placement: string;
}

interface AdBannerProps {
  placement: 'homepage' | 'sidebar' | 'banner' | 'between-content';
  className?: string;
}

export default function AdBanner({ placement, className = '' }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads?placement=${placement}`);
        if (res.ok) {
          const data = await res.json();
          // Check if we got valid ad data (not null and has required fields)
          if (data && data.id) {
            // Verify it has the required media based on type
            const hasValidMedia = (data.type === 'image' && data.image) || (data.type === 'video' && data.videoUrl);
            if (hasValidMedia) {
              setAd(data);
              // Track impression
              fetch(`/api/ads/${data.id}/impression`, { method: 'POST' }).catch(err => console.error('Failed to track impression', err));
            } else {
              console.warn(`Ad ${data.id} for placement ${placement} is missing required media (type: ${data.type})`);
            }
          } else {
            // No ad found - this is normal, don't log as error
            console.debug(`No active ad found for placement: ${placement}`);
          }
        } else {
          console.error(`Failed to fetch ad for placement ${placement}: ${res.status} ${res.statusText}`);
        }
      } catch (error) {
        console.error(`Failed to load ad for placement ${placement}:`, error);
      }
    };

    fetchAd();
  }, [placement]);

  // Don't return null - let the parent section handle visibility
  // This way ad placement areas are always defined

  const handleClick = () => {
    if (!ad) return;
    // Track click
    fetch(`/api/ads/${ad.id}/click`, { method: 'POST' });
  };

  // If no ad loaded, return empty div (section will still exist but be empty)
  if (!ad) {
    return <div className={className} style={{ display: 'none' }} />;
  }

  const isVideo = ad.type === 'video' && ad.videoUrl;
  const isImage = ad.type === 'image' && ad.image;

  if (!isVideo && !isImage) {
    console.warn(`Ad ${ad.id} has no valid media (type: ${ad.type}, image: ${!!ad.image}, video: ${!!ad.videoUrl})`);
    return <div className={className} style={{ display: 'none' }} />;
  }

  const adContent = (
    <div className={`relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900 ${className}`}>
      <div className="absolute top-2 right-2 z-10">
        <span className="text-xs text-neutral-500 uppercase font-bold px-2 py-1 bg-black/50 rounded">Ad</span>
      </div>

      {isVideo ? (
        ad.link ? (
          <Link href={ad.link} target="_blank" rel="noopener noreferrer" onClick={handleClick} className="block">
            <video
              src={ad.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain"
              style={{ maxHeight: placement === 'sidebar' ? '250px' : '400px' }}
            />
          </Link>
        ) : (
          <video
            src={ad.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-contain"
            style={{ maxHeight: placement === 'sidebar' ? '250px' : '400px' }}
          />
        )
      ) : (
        ad.link ? (
          <Link href={ad.link} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            <Image
              src={ad.image!}
              alt={ad.title}
              width={placement === 'sidebar' ? 300 : 728}
              height={placement === 'sidebar' ? 250 : 90}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </Link>
        ) : (
          <Image
            src={ad.image!}
            alt={ad.title}
            width={placement === 'sidebar' ? 300 : 728}
            height={placement === 'sidebar' ? 250 : 90}
            className="w-full h-auto object-contain"
            unoptimized
          />
        )
      )}
    </div>
  );

  return adContent;
}
