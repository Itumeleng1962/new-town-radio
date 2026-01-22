"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode, defaultLanguage } from '../i18n/i18n-config';

// Import all translation files
import en from '../i18n/translations/en.json';
import af from '../i18n/translations/af.json';
import st from '../i18n/translations/st.json';
import zu from '../i18n/translations/zu.json';
import xh from '../i18n/translations/xh.json';
import tn from '../i18n/translations/tn.json';
import nso from '../i18n/translations/nso.json';
import ts from '../i18n/translations/ts.json';
import ss from '../i18n/translations/ss.json';
import ve from '../i18n/translations/ve.json';
import nr from '../i18n/translations/nr.json';
import es from '../i18n/translations/es.json';
import pt from '../i18n/translations/pt.json';

const translations = {
    en,
    af,
    st,
    zu,
    xh,
    tn,
    nso,
    ts,
    ss,
    ve,
    nr,
    es,
    pt,
};

type TranslationKey = string;

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);
    const [isClient, setIsClient] = useState(false);

    // Load language from localStorage on mount
    useEffect(() => {
        setIsClient(true);
        const savedLanguage = localStorage.getItem('language') as LanguageCode;
        if (savedLanguage && translations[savedLanguage]) {
            setLanguageState(savedLanguage);
        }
    }, []);

    // Save language to localStorage when it changes
    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        if (isClient) {
            localStorage.setItem('language', lang);
            // Update html lang attribute
            document.documentElement.lang = lang;
        }
    };

    // Translation function
    const t = (key: TranslationKey): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if key not found
                value = translations.en;
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if not found in English either
                    }
                }
                break;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
