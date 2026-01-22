"use client";

import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { languages, LanguageCode } from '@/lib/i18n/i18n-config';

interface LanguageSelectorProps {
    variant?: 'desktop' | 'mobile';
}

export function LanguageSelector({ variant = 'desktop' }: LanguageSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleLanguageChange = (code: LanguageCode) => {
        setLanguage(code);
        setIsOpen(false);
    };

    if (variant === 'mobile') {
        return (
            <div className="space-y-2">
                <h3 className="text-sm font-bold text-brand-gray px-4">{t('language.language')}</h3>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                    {Object.entries(languages).map(([code, lang]) => (
                        <button
                            key={code}
                            onClick={() => handleLanguageChange(code as LanguageCode)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${language === code
                                    ? 'bg-black/10 text-black font-bold'
                                    : 'text-black hover:bg-black/5'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-lg">{lang.flag}</span>
                                <span className="text-sm">{lang.nativeName}</span>
                            </span>
                            {language === code && <Check className="w-4 h-4 text-black" />}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-black hover:text-brand-gray transition-colors"
                aria-label={t('language.selectLanguage')}
            >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-bold hidden lg:inline">
                    {languages[language].nativeName}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl border border-black/10 overflow-hidden z-50">
                    <div className="p-2 border-b border-black/10 bg-brand-lemon/10">
                        <p className="text-xs font-bold text-brand-gray uppercase tracking-wider px-2">
                            {t('language.selectLanguage')}
                        </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {Object.entries(languages).map(([code, lang]) => (
                            <button
                                key={code}
                                onClick={() => handleLanguageChange(code as LanguageCode)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${language === code
                                        ? 'bg-brand-lemon text-black font-bold'
                                        : 'text-black hover:bg-brand-lemon/20'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="text-sm">{lang.nativeName}</span>
                                </span>
                                {language === code && <Check className="w-4 h-4 text-black" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
