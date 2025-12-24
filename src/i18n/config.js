import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
    en: {
        translation: {
            "welcome": "Welcome to MindMate",
            "dashboard": "Dashboard",
            "journal": "Journal",
            "mood": "Mood Tracker",
            "chatbot": "AI Chat",
            "settings": "Settings",
            "login": "Login",
            "register": "Register",
            "logout": "Logout",
            "dark_mode": "Dark Mode",
            "language": "Language",
            "email": "Email Address",
            "password": "Password",
            "submit": "Submit",
            "mood_checkin": "How are you feeling?",
            "support": "Support Tools",
            "meditation": "Meditation",
            "breathing": "Breathing Exercises",
        }
    },
    bn: {
        translation: {
            "welcome": "মাইন্ডমেট-এ স্বাগতম",
            "dashboard": "ড্যাশবোর্ড",
            "journal": "জার্নাল",
            "mood": "মুড ট্র্যাকার",
            "chatbot": "এআই চ্যাট",
            "settings": "সেটিংস",
            "login": "লগইন",
            "register": "নিবন্ধন",
            "logout": "লগআউট",
            "dark_mode": "ডার্ক মোড",
            "language": "ভাষা",
            "email": "ইমেল ঠিকানা",
            "password": "পাসওয়ার্ড",
            "submit": "জমা দিন",
            "mood_checkin": "আপনার কেমন লাগছে?",
            "support": "সহায়তা সরঞ্জাম",
            "meditation": "ধ্যান",
            "breathing": "শ্বাস-প্রশ্বাসের ব্যায়াম",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
