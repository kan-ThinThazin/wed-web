import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Heart, Home, Users, Calendar, Camera, Mail, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, MapPin, Music } from 'lucide-react';

// --- IMPORTANT: PLACEHOLDER IMPORTS ---
import homeBg from './assets/Home-bg1.jpg';
import bridePhoto from './assets/bride3422-3865.jpg';
import groomPhoto from './assets/groom3422-3856.jpg';
import moment1 from "./assets/m-w-1.jpg";
import moment2 from "./assets/m-b-1.jpg";
import moment3 from "./assets/m-r-1.jpg";
import moment4 from "./assets/m-w-2.jpg";
import moment5 from "./assets/m-b-2.jpg";
import moment6 from "./assets/m-r-2.jpg";
import moment7 from "./assets/m-w-3.jpg";
import moment8 from "./assets/m-b-3.jpg";
import moment9 from "./assets/m-r-3.jpg";
import moment10 from "./assets/m-w-4.jpg";
import moment11 from "./assets/m-b-4.jpg";
import moment12 from "./assets/m-r-4.jpg";


import letterBg from './assets/letter.jpg';
import song from './assets/song.mp3'; // Placeholder for your music file

const customStyles = `
  /* Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Inter:wght@100..900&family=Babylonica&display=swap');

  .font-script {
    font-family: 'Dancing Script', cursive;
  }
  .font-sans {
    font-family: 'Inter', sans-serif;
  }
  .font-babylonica {
    font-family: 'Babylonica', cursive;
  }

  /* Base Gray, Brown, and Cold Theme Colors */
  :root {
    --color-primary: #8B7355;    /* Warm brown */
    --color-secondary: #6B8E9C;  /* Cold blue-gray */
    --color-accent: #A0522D;     /* Dark brown accent */
    --color-light: #F5F5F5;      /* Light gray */
    --color-dark: #2F4F4F;       /* Dark slate gray */
    --color-text: #4A4A4A;       /* Text gray */
    --color-background: #FAFAFA; /* Background light gray */
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Navigation Styles */
  .nav-modern {
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.15) 0%, rgba(107, 142, 156, 0.15) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 8px 32px rgba(139, 115, 85, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .nav-item-modern {
    position: relative;
    transition: all 0.3s ease;
    background: transparent;
    border: none;
  }

  .nav-item-modern::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    transition: all 0.3s ease;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  .nav-item-modern.active::before {
    width: 70%;
  }

  .nav-item-modern:hover::before {
    width: 50%;
  }

  /* NEW: Click effect for navigation */
  .nav-item-modern:active {
    transform: scale(0.95);
    transition: transform 0.1s ease;
  }

  .nav-item-modern.clicked {
    animation: navClick 0.3s ease;
  }

  @keyframes navClick {
    0% { transform: scale(1); }
    50% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }

  /* Moving effect for letter nav item */
  .letter-moving {
    animation: letterFloat 3s ease-in-out infinite;
  }

  @keyframes letterFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
  }

  /* Elegant Effect for Headings */
  .heading-elegant {
    text-shadow: 
      2px 2px 4px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(139, 115, 85, 0.3);
    color: var(--color-dark);
    position: relative;
  }

  .heading-elegant::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: 2px;
  }

  /* NEW: Neon Effect for Home Heading & All h2 titles */
  .neon-text {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff,
      0 0 20px var(--color-primary),
      0 0 35px var(--color-primary),
      0 0 40px var(--color-primary),
      0 0 50px var(--color-primary),
      0 0 75px var(--color-primary);
    animation: neonFlicker 3s infinite alternate;
  }

  @keyframes neonFlicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
      text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #fff,
        0 0 20px var(--color-primary),
        0 0 35px var(--color-primary),
        0 0 40px var(--color-primary),
        0 0 50px var(--color-primary),
        0 0 75px var(--color-primary);
    }
    20%, 24%, 55% {
      text-shadow: none;
    }
  }

  /* NEW: Fade In/Out Animation for Home Heading */
  .fade-in-out {
    animation: fadeInOut 4s ease-in-out infinite;
  }

  @keyframes fadeInOut {
    0%, 100% { opacity: 0.7; transform: scale(0.98); }
    50% { opacity: 1; transform: scale(1.02); }
  }

  /* NEW: Scroll Animation for Section Titles */
  .section-title {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }

  .section-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Removed glass-heading styles */
  .glass-heading {
    /* Kept definition but removed all styles to comply with request */
  }

  /* Plan Section Styling */
  .plan-card {
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(107, 142, 156, 0.1) 100%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 
      0 10px 25px -5px rgba(139, 115, 85, 0.15),
      0 5px 10px -5px rgba(107, 142, 156, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .plan-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 
      0 20px 40px -12px rgba(139, 115, 85, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  /* Heart Animation - Slow and Beautiful */
  .heart-burst {
    position: absolute;
    width: 24px;
    height: 24px;
    background: transparent;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    animation: heartRise 3s ease-in-out forwards;
    bottom: 0;
  }

  @keyframes heartRise {
    0% {
      transform: translateY(0) scale(0.8) rotate(0deg);
      opacity: 0.8;
    }
    20% {
      transform: translateY(-20vh) scale(1.2) rotate(90deg);
      opacity: 1;
    }
    40% {
      transform: translateY(-40vh) scale(1) rotate(180deg);
      opacity: 0.9;
    }
    60% {
      transform: translateY(-60vh) scale(1.1) rotate(270deg);
      opacity: 0.8;
    }
    80% {
      transform: translateY(-80vh) scale(0.9) rotate(360deg);
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100vh) scale(0.7) rotate(450deg);
      opacity: 0;
    }
  }

  /* Floating Hearts from Bottom - Slower */
  .floating-heart {
    position: fixed;
    pointer-events: none;
    opacity: 0;
    bottom: 0;
    animation: floatFromBottom 8s ease-in-out forwards;
  }

  @keyframes floatFromBottom {
    0% {
      transform: translateY(0) rotate(0deg) scale(0.8);
      opacity: 0.7;
    }
    25% {
      transform: translateY(-25vh) rotate(90deg) scale(1.1);
      opacity: 0.9;
    }
    50% {
      transform: translateY(-50vh) rotate(180deg) scale(0.9);
      opacity: 0.8;
    }
    75% {
      transform: translateY(-75vh) rotate(270deg) scale(1);
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg) scale(0.7);
      opacity: 0;
    }
  }

  /* Glassmorphism Effects - Applied to Letter Section Paragraph */
  .glass-effect {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 
      0 15px 35px rgba(139, 115, 85, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  /* Glossy Modal (Popup BG) - Improved Responsiveness */
  .glossy-modal {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 
      0 25px 50px -12px rgba(139, 115, 85, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    max-width: 90vw; /* Fix: ensures it's not too big */
    max-height: 85vh; /* Fix: ensures it's not too big */
  }
  
  /* Modal Overlay - Fix for all devices */
  .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px; /* Slight padding to prevent edge touch issues */
  }

  /* Three Image Slider with Touch Support */
  .slider-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    perspective: 1000px;
    position: relative;
    touch-action: pan-y;
  }

  .slider-image {
    transition: all 0.8s ease-in-out;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .slider-image.left,
  .slider-image.right {
    width: 25%;
    height: 180px;
    filter: brightness(0.8) blur(0.5px);
    opacity: 0.7;
    transform: scale(0.85);
  }

  .slider-image.center {
    width: 35%;
    height: 250px;
    filter: brightness(1);
    opacity: 1;
    transform: scale(1);
    box-shadow: 
      0 15px 30px rgba(139, 115, 85, 0.2),
      0 0 20px rgba(107, 142, 156, 0.3);
    z-index: 10;
  }

  /* Mobile View for Slider */
  @media (max-width: 768px) {
    .slider-container {
      gap: 8px;
      padding: 0 15px;
      touch-action: pan-y;
    }
    
    .slider-image.left,
    .slider-image.right {
      width: 28%;
      height: 120px;
      opacity: 0.6;
      transform: scale(0.8);
    }
    
    .slider-image.center {
      width: 55%;
      height: 160px;
      z-index: 20;
    }

    /* Half hide side images behind center */
    .slider-image.left {
      margin-right: -30px;
    }
    .slider-image.right {
      margin-left: -30px;
    }
  }

  /* Desktop adjustments */
  @media (min-width: 1024px) {
    .slider-image.center {
      width: 30%;
      height: 280px;
    }
  }

  /* Fade Animation for Auto Slider */
  @keyframes fadeSlide {
    0% { opacity: 0.8; transform: scale(0.85); }
    20% { opacity: 1; transform: scale(1); }
    80% { opacity: 1; transform: scale(1); }
    100% { opacity: 0.8; transform: scale(0.85); }
  }

  .auto-fade {
    animation: fadeSlide 6s ease-in-out infinite;
  }

  /* Modal without scrolling */
  .modal-no-scroll {
    overflow: hidden;
  }

  .modal-content {
    max-height: 85vh;
    overflow: hidden;
  }

  /* Instagram-like heart animation - Slower */
  .instagram-heart {
    transition: all 0.4s ease;
  }

  .instagram-heart:hover {
    transform: scale(1.1);
  }

  .heart-pulse {
    animation: heartPulse 1s ease-in-out;
  }

  @keyframes heartPulse {
    0% { transform: scale(1); }
    25% { transform: scale(1.4); }
    50% { transform: scale(1.2); }
    75% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  /* Footer Glass Effect */
  .footer-glass {
    background: rgba(139, 115, 85, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }

  /* Prevent horizontal scroll */
  body {
    overflow-x: hidden;
  }

  /* Home section background */
  .home-bg-perfect {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  @media (max-width: 768px) {
    .home-bg-perfect {
      background-attachment: scroll;
    }
  }

  /* Touch-friendly buttons */
  .touch-button {
    padding: 12px 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .touch-button:active {
    transform: scale(0.95);
  }

  /* Improved modal layout for better text visibility */
  .modal-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .modal-image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 300px;
  }

  .modal-content-area {
    padding: 20px;
    border-top: 1px solid rgba(139, 115, 85, 0.1);
  }

  /* NEW: Enhanced scroll down arrow with better visibility */
  .scroll-down-container {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
    transition: all 0.5s ease;
    cursor: pointer;
  }

  .scroll-down-arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-radius: 50px;
    background: linear-gradient(135deg, 
      rgba(139, 115, 85, 0.9) 0%, 
      rgba(107, 142, 156, 0.9) 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(139, 115, 85, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s ease;
    animation: arrowGlow 3s ease-in-out infinite;
  }

  .scroll-down-arrow:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(139, 115, 85, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  @keyframes arrowGlow {
    0%, 100% {
      box-shadow: 
        0 10px 25px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(139, 115, 85, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow: 
        0 10px 25px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(139, 115, 85, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
  }

  .scroll-down-text {
    color: white;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .scroll-down-chevron {
    color: white;
    animation: bounceArrow 2s ease-in-out infinite;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  @keyframes bounceArrow {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }

  /* Animation for the start button */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Slow spin for music icon */
  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = customStyles;
  document.head.appendChild(style);
}

// --- Mock Data ---
const WEDDING_DATA = {
  names: "Htun & Akari",
  date: "November 1st Saturday",
  time: "09:00am - 11:00am",
  location: "Shwe Yadi Poinlon Hall",
  locationDetails: "N0 (27/3) , Ba Yint Naung Road (Kyaung Lan) , near ShwePinlon(City Mall) , North Dagon , Yangon.",
  groom: {
    name: "မောင်တင်ထွန်းအောင်",
    photoUrl: groomPhoto,
    description: "ဦးခင်အောင်+ဒေါ်ခင်ခင်ဝင်းတို့၏ \n\n သား",
  },
  bride: {
    name: "မနှင်းဧကရီ (ခ) မခင်လပြည့်",
    photoUrl: bridePhoto,
    description: "(ဦးအောင်ကြီးမြင့်)+ဒေါ်ဝင်းဝင်းမော် တို့၏ \n\n သမီး",
  },
  gallery: [
    { id: 1, src: moment1, title: "Htun & Akari" },
    { id: 2, src: moment2, title: "Htun & Akari" },
    { id: 3, src: moment3, title: "Htun & Akari" },
    { id: 4, src: moment4, title: "Htun & Akari" },
    { id: 5, src: moment5, title: "Htun & Akari" },
    { id: 6, src: moment6, title: "Htun & Akari" },
    { id: 7, src: moment7, title: "Htun & Akari" },
    { id: 8, src: moment8, title: "Htun & Akari" },
    { id: 9, src: moment9, title: "Htun & Akari" },
    { id: 10, src: moment10, title: "Htun & Akari" },
    { id: 11, src: moment11, title: "Htun & Akari" },
    { id: 12, src: moment12, title: "Htun & Akari" },
  ],
  letter: "ဒီနေ့လေးဟာ ကျွန်တော်ကျွန်မတို့ နှစ်ဦးအတွက် ဘဝတစ်လျှောက်လုံး မမေ့နိုင်သည့် နေ့တစ်နေ့ဖြစ်ပါတယ်။ အချစ် ၊ သံယောဇဉ် နဲ့ နှလုံးသားနှစ်ခု ပေါင်းစပ်ပြီး တစ်ခုဖြစ်လာတဲ့ အချိန်လေးလည်းဖြစ်ပါတယ် ။ ထို့အပြင် ကျွန်တော်ကျွန်မတို့နှစ်ဦး ရှေ့ဆက်လျှောက်ရမဲ့ ဘဝခရီးမှာလည်း နှစ်ယောက်အတူတူ ကောင်းခြင်းဆိုးခြင်းတွေကိုလက်ခံပြီး အတူတူ စတင်ကျော်ဖြတ်ရမဲ့ ပထမဆုံးနေ့လေးလည်းဖြစ်ပါတယ်။ \n\n အချစ်ဆိုတာ တစ်ခါတလေ ပန်းတစ်ပွင့်လို မနာကျင်ပဲ မျှော်လင့်ချက်နဲ့ ပွင့်လာတတ်တယ်။ ဒီနေ့မှာတော့ အဲ့ဒီပန်းပွင့်တစ်ပွင့်ကို သင်တို့နဲ့အတူ ပိုလှလာစေခဲ့ကြပါတယ်။ \n\n ယခုလိုနေ့လေးကို အလှပဆုံး အမှတ်တရတစ်ခုအဖြစ် ပြီးပြည့်စုံအောင် ကျွန်တော်ကျွန်မတို့ မင်္ဂလာအခမ်းအနားသို့ လာရောက်အားဖြည့်ပေးကျတဲ့ မိသားစုနှင့် မိတ်ဆွေသူငယ်ချင်းများအားလုံးကို အထူးပင်ကျေးဇူးတင်ပါတယ်။ ",
};


// --- Custom Icon Components ---
const HomeIcon = ({ isActive }) => (
  <Home className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-[#8B7355]' : 'text-[#6B8E9C]'}`} />
);

const UsersIcon = ({ isActive }) => (
  <Users className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-[#8B7355]' : 'text-[#6B8E9C]'}`} />
);

const CalendarIcon = ({ isActive }) => (
  <Calendar className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-[#8B7355]' : 'text-[#6B8E9C]'}`} />
);

const CameraIcon = ({ isActive }) => (
  <Camera className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-[#8B7355]' : 'text-[#6B8E9C]'}`} />
);

const MailIcon = ({ isActive }) => (
  <Mail className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-[#8B7355]' : 'text-[#6B8E9C]'}`} />
);


// --- Heart Animation Component (Slower and More Beautiful) ---
const HeartAnimation = ({ bursts }) => (
  <div className="fixed inset-0 pointer-events-none z-[1001] overflow-hidden">
    {bursts.map((b) => (
      <div
        key={b.id}
        className="heart-burst"
        style={{
          left: b.x,
          bottom: '0px',
          animationDuration: `${Math.random() * 2 + 2}s`, // Slower animation
          transform: `scale(${Math.random() * 0.6 + 0.7})`,
        }}
      >
        <Heart className="w-6 h-6 fill-current text-[#A0522D]" />
      </div>
    ))}
  </div>
);

// --- Floating Hearts from Bottom - Slower ---
const FloatingHearts = ({ count = 12 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8, // Longer delay
      size: Math.random() * 20 + 12,
      duration: Math.random() * 4 + 6, // Longer duration
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          <Heart className="fill-[#A0522D] text-[#A0522D] opacity-60" />
        </div>
      ))}
    </div>
  );
};

// --- Enhanced Scroll Down Arrow Component ---
const ScrollDownArrow = ({ isHomeActive }) => {
  const handleClick = () => {
    // Scroll to the next section (Our Story)
    document.getElementById('ours')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`scroll-down-container ${
        isHomeActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClick}
    >
      <div className="scroll-down-arrow">
        <span className="scroll-down-text">အောက်သို့</span>
        <ChevronDown className="w-6 h-6 scroll-down-chevron" />
      </div>
    </div>
  );
};

// --- Modern Navigation Component ---
const Nav = ({ scrollToSection, activeSection }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'ours', label: 'Our Story', Icon: UsersIcon },
    { id: 'plan', label: 'Our Plan', Icon: CalendarIcon },
    { id: 'moments', label: 'Our Moments', Icon: CameraIcon },
    { id: 'letter', label: 'A Letter for You', Icon: MailIcon },
  ];

  const handleClick = (id) => {
    setClickedItem(id);
    setTimeout(() => setClickedItem(null), 300);
    
    if (typeof scrollToSection === "function") scrollToSection(id);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className={`nav-modern flex justify-center h-20 p-2 rounded-2xl transition-all duration-300 ${isSticky ? "scale-95" : "scale-100"}`}>
          <div className="flex space-x-1 sm:space-x-8 items-center">
            {navItems.map(({ id, label, Icon }) => {
              const isActive = activeSection === id;
              const isLetter = id === 'letter';
              const isClicked = clickedItem === id;
              
              return (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={`nav-item-modern flex flex-col items-center justify-center p-4 transition-all duration-300 group ${
                    isActive ? 'scale-105 active' : 'hover:scale-105'
                  } ${isLetter ? 'letter-moving' : ''} ${isClicked ? 'clicked' : ''}`}
                  style={{ minWidth: 80 }}
                >
                  <div className="relative p-2">
                    <Icon isActive={isActive} />
                  </div>
                  <span className={`mt-1 text-xs font-babylonica transition-all duration-300 ${
                    isActive ? 'text-[#8B7355] font-bold scale-110' : 'text-[#6B8E9C] group-hover:text-[#8B7355]'
                  }`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="sm:hidden fixed top-0 left-0 right-0 z-50 nav-modern"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="p-4 flex justify-between items-center">
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeSection === id;
            const isLetter = id === 'letter';
            const isClicked = clickedItem === id;
            
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`nav-item-modern flex-1 flex flex-col items-center justify-center py-2 px-1 transition-all duration-200 ${
                  isActive ? 'active' : ''
                } ${isLetter ? 'letter-moving' : ''} ${isClicked ? 'clicked' : ''}`}
                title={label}
              >
                <div className="relative p-1">
                  <Icon isActive={isActive} />
                </div>
                <span className={`mt-1 text-[10px] font-babylonica transition-all ${
                  isActive ? 'text-[#8B7355] font-bold' : 'text-[#6B8E9C]'
                }`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

// --- Home Section ---
const HomeSection = () => (
  <section
    id="home"
    className="relative h-screen flex items-center justify-center home-bg-perfect"
    style={{ backgroundImage: `url(${homeBg})` }}
  >
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="relative text-center p-8">
      <h1 className="text-4xl sm:text-7xl lg:text-8xl font-script text-white neon-text fade-in-out mb-6">
        {WEDDING_DATA.names}
      </h1>
      <p className="mt-4 text-xl sm:text-3xl font-sans text-white tracking-widest uppercase mb-8">
        We're getting married
      </p>
    </div>
  </section>
);

// --- Ours Section ---
const OursSection = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const title = document.getElementById('ours-title');
    if (title) observer.observe(title);

    return () => {
      if (title) observer.unobserve(title);
    };
  }, []);

  return (
    <section id="ours" className="py-20 bg-[#FAFAFA] font-sans">
      <div className="max-w-5xl mx-auto px-4">
        <h2 
          id="ours-title"
          className={`text-5xl font-script text-center text-white mb-16 section-title neon-text ${
            isTitleVisible ? 'visible' : ''
          }`}
        >
          Our Story
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-20 p-6 rounded-2xl bg-white shadow-lg">
          <div className="lg:w-1/2 p-4">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src={WEDDING_DATA.groom.photoUrl}
                alt={WEDDING_DATA.groom.name}
                className="w-full h-96 object-cover transform hover:scale-105 transition duration-700"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-4 text-center lg:text-left">
            <p className="text-[#4A4A4A] leading-relaxed text-lg">
              {WEDDING_DATA.groom.description}
            </p>
            <h5 className="text-xl font-script text-[#8B7355] mb-4 heading-elegant">
              {WEDDING_DATA.groom.name}
            </h5>
            
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 p-6 rounded-2xl bg-white shadow-lg">
          <div className="lg:w-1/2 p-4">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src={WEDDING_DATA.bride.photoUrl}
                alt={WEDDING_DATA.bride.name}
                className="w-full h-96 object-cover transform hover:scale-105 transition duration-700"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-4 text-center lg:text-right">
            <p className="text-[#4A4A4A] leading-relaxed text-lg">
              {WEDDING_DATA.bride.description}
            </p>
            <h5 className="text-xl font-script text-[#6B8E9C] mb-4 heading-elegant">
              {WEDDING_DATA.bride.name}
            </h5>
            
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Plan Section ---
const PlanCard = ({ title, value, description, isSpecial = false }) => (
  <div className="plan-card rounded-2xl p-6 text-center w-full max-w-sm mx-auto flex flex-col justify-center items-center relative min-h-[200px]">
    <p className="text-sm uppercase tracking-widest text-[#8B7355] font-semibold mb-2">{title}</p>
    <div className="flex items-center justify-center text-2xl font-bold text-[#2F4F4F] mb-3">
      {value.split(' ').map((word, index) => (
        <span key={index} className="mx-1">
          {isSpecial && word.match(/\d+/) ? (
            <span className="relative inline-flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg text-3xl text-[#2F4F4F] mx-2 border-2 border-[#8B7355]">
              {word}
            </span>
          ) : (
            <span className="text-xl">{word}</span>
          )}
        </span>
      ))}
    </div>
    {description && (
      <p className="text-sm text-[#4A4A4A] mt-2 opacity-80 leading-tight">
        {description}
      </p>
    )}
  </div>
);

const PlanSection = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('plan');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const title = document.getElementById('plan-title');
    if (title) observer.observe(title);

    return () => {
      if (title) observer.unobserve(title);
    };
  }, []);

  return (
    <section id="plan" className="py-20 bg-[#FAFAFA] font-sans relative overflow-hidden">
      {isInView && <FloatingHearts count={10} />}
      
      <div className="max-w-6xl mx-auto px-4 relative z-20">
        <h2 
          id="plan-title"
          className={`text-5xl font-script text-center text-white mb-16 section-title neon-text ${
            isTitleVisible ? 'visible' : ''
          }`}
        >
          Our Plan
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <PlanCard 
            title="Our Day is" 
            value={WEDDING_DATA.date} 
            description="Join us for this beautiful Saturday celebration"
            isSpecial 
          />
          <PlanCard 
            title="Our Time is" 
            value={WEDDING_DATA.time} 
            description="Morning ceremony followed by reception"
          />
          <PlanCard 
            title="Our Location is" 
            value={WEDDING_DATA.location} 
            description="Traditional venue in the heart of the city"
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowLocation(!showLocation)}
            className="bg-gradient-to-r from-[#8B7355] to-[#6B8E9C] text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto space-x-2 touch-button"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Location Details</span>
            {showLocation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className={`location-box mt-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-500 ${showLocation ? 'open p-6 max-h-96' : 'max-h-0 p-0'}`} style={{ transitionProperty: 'max-height, padding' }}>
            {showLocation && (
              <div className="text-center">
                <h3 className="text-xl font-script text-[#8B7355] mb-3 heading-elegant">
                  Venue Information
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed text-sm">
                  {WEDDING_DATA.locationDetails}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Moments Section with Touch Support ---
const MomentsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [likeCount, setLikeCount] = useState(1234);
  const [isLiked, setIsLiked] = useState(false);
  const [heartBursts, setHeartBursts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const gallery = WEDDING_DATA.gallery;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const title = document.getElementById('moments-title');
    if (title) observer.observe(title);

    return () => {
      if (title) observer.unobserve(title);
    };
  }, []);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto slider effect
  useEffect(() => {
    if (!autoPlay || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, isModalOpen, gallery.length]);

  const openModal = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
    setLikeCount(Math.floor(Math.random() * 2000) + 1000);
    setIsLiked(false);
    setHeartBursts([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % gallery.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(gallery[nextIndex]);
    setLikeCount(Math.floor(Math.random() * 2000) + 1000);
    setIsLiked(false);
  };

  const prevPhoto = () => {
    const prevIndex = (currentPhotoIndex - 1 + gallery.length) % gallery.length;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(gallery[prevIndex]);
    setLikeCount(Math.floor(Math.random() * 2000) + 1000);
    setIsLiked(false);
  };

  const handleLike = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create continuous heart bursts
    const createHearts = () => {
      const newBursts = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: x + (Math.random() * 100 - 50),
        y: y + (Math.random() * 100 - 50),
      }));

      setHeartBursts((prev) => [...prev, ...newBursts].slice(-40));
      
      // Remove hearts after animation
      setTimeout(() => {
        setHeartBursts((current) => current.filter((b) => !newBursts.some(nb => nb.id === b.id)));
      }, 3000);
    };

    // Create multiple bursts over time
    createHearts();
    setTimeout(createHearts, 500);
    setTimeout(createHearts, 1000);

    if (!isLiked) {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const getVisibleImages = () => {
    const prevIndex = (currentSlide - 1 + gallery.length) % gallery.length;
    const nextIndex = (currentSlide + 1) % gallery.length;
    
    return [
      { ...gallery[prevIndex], position: 'left' },
      { ...gallery[currentSlide], position: 'center' },
      { ...gallery[nextIndex], position: 'right' }
    ];
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="moments" className="py-20 bg-[#FAFAFA] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 
          id="moments-title"
          className={`text-5xl font-script text-center text-white mb-16 section-title neon-text ${
            isTitleVisible ? 'visible' : ''
          }`}
        >
          Our Moments
        </h2>

        {/* Three Image Slider with Touch Support */}
        <div className="relative mb-8">
          <div 
            className="slider-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {getVisibleImages().map((photo, index) => (
              <div
                key={`${photo.id}-${photo.position}`}
                className={`slider-image ${photo.position} ${photo.position === 'center' ? 'auto-fade' : ''}`}
                onClick={() => photo.position === 'center' && openModal(photo, currentSlide)}
              >
                <img
                  src={photo.src}
                  alt={`Moment ${photo.id}`}
                  className="w-full h-full object-cover"
                />
                {photo.position === 'center' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition duration-500 flex items-end justify-center p-4">
                    <div className="text-white text-center">
                      <h4 className="text-lg font-bold mb-1">{photo.title}</h4>
                      <p className="text-sm opacity-90">Click to view</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button 
              onClick={prevSlide}
              className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition transform hover:scale-110 touch-button"
            >
              <ChevronLeft className="w-5 h-5 text-[#8B7355]" />
            </button>
            <span className="text-lg font-semibold text-[#8B7355] bg-white/80 px-4 py-2 rounded-full shadow-md">
              {currentSlide + 1} / {gallery.length}
            </span>
            <button 
              onClick={nextSlide}
              className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition transform hover:scale-110 touch-button"
            >
              <ChevronRight className="w-5 h-5 text-[#8B7355]" />
            </button>
          </div>
        </div>

        <HeartAnimation bursts={heartBursts} />

        {/* Glass Effect Modal - Improved Layout */}
        {isModalOpen && selectedPhoto && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="glossy-modal modal-content w-full max-w-4xl mx-auto" onClick={(e) => e.stopPropagation()}>
              <div className="modal-layout">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-script text-[#8B7355]">
                    {selectedPhoto.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition touch-button"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Image Container */}
                <div className="modal-image-container">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={selectedPhoto.src}
                      alt={selectedPhoto.title}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 p-3 bg-white/80 rounded-full shadow-lg hover:bg-white transition transform hover:scale-110 touch-button"
                    >
                      <ChevronLeft className="w-6 h-6 text-[#8B7355]" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 p-3 bg-white/80 rounded-full shadow-lg hover:bg-white transition transform hover:scale-110 touch-button"
                    >
                      <ChevronRight className="w-6 h-6 text-[#8B7355]" />
                    </button>
                  </div>
                </div>

                {/* Footer with Like Button */}
                <div className="modal-content-area">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`p-3 rounded-full transition duration-300 transform hover:scale-110 touch-button ${
                          isLiked ? 'heart-pulse' : ''
                        }`}
                      >
                        <Heart
                          className={`instagram-heart w-8 h-8 ${
                            isLiked
                              ? "fill-[#A0522D] text-[#A0522D]"
                              : "text-gray-400 hover:text-[#A0522D]"
                          }`}
                        />
                      </button>
                      <div>
                        <span className="text-2xl font-bold text-[#8B7355] block">
                          {likeCount.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">Likes</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-center italic text-lg mt-4">
                    "A beautiful memory that we will cherish forever in our hearts."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Updated Letter Section with integrated Glass Background ---
const LetterSection = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const title = document.getElementById('letter-title');
    if (title) observer.observe(title);

    return () => {
      if (title) observer.unobserve(title);
    };
  }, []);

  return (
    <section 
      id="letter" 
      className="py-20 bg-cover bg-fixed bg-center relative min-h-[80vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${letterBg})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 
          id="letter-title"
          className={`text-5xl font-script text-center text-white mb-16 section-title neon-text ${
            isTitleVisible ? 'visible' : ''
          }`}
        >
          A Letter For You
        </h2>
        
        <div className="glass-effect p-8 max-w-2xl mx-auto">
          <div className="p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-6 text-[#8B7355] neon-text" />
            
            <p className="text-lg font-script text-[#4A4A4A] leading-loose whitespace-pre-line mb-8">
              {WEDDING_DATA.letter}
            </p>
            
            <div className="flex justify-center space-x-4">
              <Heart className="w-6 h-6 fill-[#A0522D] text-[#A0522D] heart-pulse" />
              <Heart className="w-6 h-6 fill-[#A0522D] text-[#A0522D] heart-pulse" style={{ animationDelay: '0.3s' }} />
              <Heart className="w-6 h-6 fill-[#A0522D] text-[#A0522D] heart-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Music Player Component (Updated to use triggerPlay) ---
const MusicPlayer = ({ triggerPlay }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.loop = true;
    
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);
    
            audioRef.current.addEventListener('play', handlePlay);
            audioRef.current.addEventListener('pause', handlePause);

            // Play when triggered by a user gesture (StartScreen click)
            if (triggerPlay) {
                audioRef.current.play().catch(error => {
                    console.log("Music play failed, button is still available.", error);
                });
            }
    
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('play', handlePlay);
                    audioRef.current.removeEventListener('pause', handlePause);
                }
            };
        }
    }, [triggerPlay]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src={song} /> 
            <button
                onClick={togglePlay}
                className={`fixed bottom-4 right-4 p-4 rounded-full shadow-xl z-[1002] transition-all duration-300 transform touch-button 
                    ${isPlaying ? 'bg-[#8B7355] hover:bg-[#A0522D] text-white' : 'bg-white hover:bg-gray-100 text-[#8B7355]'}`}
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                <Music className={`w-6 h-6 ${isPlaying ? 'animate-spin-slow' : ''}`} />
            </button>
        </>
    );
};

// --- Footer with Glass Effect ---
const Footer = () => (
  <footer className="footer-glass py-12 text-center">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
        <h3 className="text-3xl font-script text-[#8B7355] mr-4 mb-3 sm:mb-0 heading-elegant">
          {WEDDING_DATA.names}
        </h3>
        <span className="text-sm text-[#6B8E9C] uppercase tracking-widest">
          {WEDDING_DATA.date.split(',')[0]}
        </span>
      </div>
      
      <p className="text-[#4A4A4A] mb-6 max-w-2xl mx-auto">
        Thank you for being part of our special day. Our wedding, made with love and cherished memories.
      </p>
      
      <div className="border-t border-[#8B7355]/30 pt-6">
        <p className="text-sm text-[#8B7355]">
          &copy; {new Date().getFullYear()} {WEDDING_DATA.names}. All Rights Reserved.
        </p>
        <p className="text-xs text-[#6B8E9C] mt-2">
          Made with ❤️ for our special day
        </p>
      </div>
    </div>
  </footer>
);

// --- New Start Screen Component to force User Gesture ---
const StartScreen = ({ onStart, names, homeBg }) => (
    <div 
        className="fixed inset-0 z-[10000] bg-black/90 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${homeBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative glass-heading text-white p-6 rounded-xl">
            <p className="text-xl font-sans mb-2 tracking-wider">Welcome to the wedding of</p>
            <h1 className="text-6xl sm:text-7xl font-script neon-text">{names}</h1>
            <p className="mt-4 text-lg font-sans text-white tracking-widest uppercase">{WEDDING_DATA.date.split(',')[0]}</p>
        </div>
        <button
            onClick={onStart}
            className="mt-12 bg-[#8B7355] text-white py-3 px-8 rounded-full text-lg font-semibold shadow-2xl transition transform hover:scale-105 touch-button animate-pulse flex items-center justify-center space-x-2"
        >
            <span> ဤနေရာကိုနှိပ်ပါ </span> <Music className="w-5 h-5" />
        </button>
        <p className="relative mt-4 text-sm text-white/70"> မင်္ဂလာဖိတ်ကြားလွှာ </p>
    </div>
);

// --- Main App Component (Updated to handle Start Screen and Music) ---
export default function App() {
  const sectionRefs = {
    home: useRef(null),
    ours: useRef(null),
    plan: useRef(null),
    moments: useRef(null),
    letter: useRef(null),
  };

  const [activeSection, setActiveSection] = useState('home');
  const [siteStarted, setSiteStarted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleStartSite = () => {
      setSiteStarted(true);
      setMusicStarted(true); 
      document.body.style.overflow = '';
  };

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    if (!siteStarted) {
        document.body.style.overflow = 'hidden';
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      const sections = Object.keys(sectionRefs);
      for (const sectionId of sections) {
        const section = sectionRefs[sectionId]?.current;
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      if (window.scrollY < 50) {
          setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [siteStarted, sectionRefs]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
        
      {!siteStarted && (
        <StartScreen 
            onStart={handleStartSite} 
            names={WEDDING_DATA.names}
            homeBg={homeBg} 
        />
      )}
      
      <div style={{ visibility: siteStarted ? 'visible' : 'hidden' }}>
        <Nav scrollToSection={scrollToSection} activeSection={activeSection} />
        <MusicPlayer triggerPlay={musicStarted} />
        
        <ScrollDownArrow isHomeActive={activeSection === 'home'} />
        
        <main className="pt-[78px] sm:pt-0">
            <div ref={sectionRefs.home}><HomeSection /></div>
            <div ref={sectionRefs.ours}><OursSection /></div>
            <div ref={sectionRefs.plan}><PlanSection /></div>
            <div ref={sectionRefs.moments}><MomentsSection /></div>
            <div ref={sectionRefs.letter}><LetterSection /></div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
