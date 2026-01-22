export const languages = {
    en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
    af: { name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
    st: { name: 'Sesotho', nativeName: 'Sesotho', flag: '🇿🇦' },
    zu: { name: 'isiZulu', nativeName: 'isiZulu', flag: '🇿🇦' },
    xh: { name: 'isiXhosa', nativeName: 'isiXhosa', flag: '🇿🇦' },
    tn: { name: 'Setswana', nativeName: 'Setswana', flag: '🇿🇦' },
    nso: { name: 'Sepedi', nativeName: 'Sepedi', flag: '🇿🇦' },
    ts: { name: 'Xitsonga', nativeName: 'Xitsonga', flag: '🇿🇦' },
    ss: { name: 'siSwati', nativeName: 'siSwati', flag: '🇿🇦' },
    ve: { name: 'Tshivenda', nativeName: 'Tshivenda', flag: '🇿🇦' },
    nr: { name: 'isiNdebele', nativeName: 'isiNdebele', flag: '🇿🇦' },
    es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
} as const;

export type LanguageCode = keyof typeof languages;

export const defaultLanguage: LanguageCode = 'en';

export const getLanguageConfig = (code: LanguageCode) => languages[code];
