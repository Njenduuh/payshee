import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ValentineProposal() {
  const scriptFont = "'Baloo 2', cursive";
  const [currentSection, setCurrentSection] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [petals, setPetals] = useState([]);
  const [noButtons, setNoButtons] = useState([{ id: 0, x: 150, y: 0, scale: 1, rotation: 0, text: 'No' }]);
  const [noButtonClicks, setNoButtonClicks] = useState(0);
  const [showMergeAnimation, setShowMergeAnimation] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [showYesMoment, setShowYesMoment] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [cursorHearts, setCursorHearts] = useState([]);
  const [nameLetters] = useState(['P', 'A', 'Y', 'S', 'H', 'E', 'E']);
  const [showLetters, setShowLetters] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if (currentSection === 0) {
      const timer = setInterval(() => {
        setShowLetters(prev => {
          if (prev < nameLetters.length) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 150);
      return () => clearInterval(timer);
    }
  }, [currentSection, nameLetters.length]);

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          duration: 4 + Math.random() * 3,
          delay: Math.random() * 0.5
        }
      ]);
    }, 400);

    const petalInterval = setInterval(() => {
      setPetals(prev => [
        ...prev.slice(-20),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          duration: 5 + Math.random() * 3,
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360
        }
      ]);
    }, 600);

    return () => {
      clearInterval(heartInterval);
      clearInterval(petalInterval);
    };
  }, []);

  useEffect(() => {
    if (currentSection === 3) {
      setNoButtonClicks(0);
      setShowMergeAnimation(false);
      setShowYesMoment(false);
      setNoButtons([{ id: 0, x: 150, y: 0, scale: 1, rotation: 0, text: 'No' }]);
    }
  }, [currentSection]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.85) {
        setCursorHearts(prev => [
          ...prev.slice(-10),
          {
            id: Date.now() + Math.random(),
            x: e.clientX,
            y: e.clientY
          }
        ]);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const photos = [
    { url: "https://i.imgur.com/434fZuN.jpg", caption: "Your beautiful smile" },
    { url: "https://i.imgur.com/2PUHFiK.jpg", caption: "You're absolutely stunning" },
    { url: "https://i.imgur.com/JJXs0Pm.jpg", caption: "My favorite person" },
    { url: "https://i.imgur.com/IrKWxAx.jpg", caption: "Everything about you" },
    { url: "https://i.imgur.com/lVFQqrF.jpg", caption: "MY Munschiii" },
    { url: "https://i.imgur.com/XE2B4kS.jpg", caption: "That beautiful energy" },
    { url: "https://i.imgur.com/JJXs0Pm.jpg", caption: "Your amazing style" },
    { url: "https://i.imgur.com/bqDCQf3.jpg", caption: "Wet😂💦!" }
  ];

  const handlePhotoSwipeStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handlePhotoSwipeEnd = (e) => {
    if (touchStartX === null) return;

    const swipeDistance = touchStartX - e.changedTouches[0].clientX;
    const swipeThreshold = 40;

    if (swipeDistance > swipeThreshold) {
      setCurrentPhoto((p) => (p + 1) % photos.length);
    } else if (swipeDistance < -swipeThreshold) {
      setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);
    }

    setTouchStartX(null);
  };

  const navigateToSection = (nextSection) => {
    if (nextSection === currentSection) return;
    setCurrentSection(nextSection);
  };

  const moveNoButton = () => {
    const clicks = noButtonClicks + 1;
    setNoButtonClicks(clicks);

    if (clicks === 1) {
      setNoButtons([{ 
        id: 0, 
        x: Math.random() * 80 + 80,
        y: Math.random() * 40 - 20,
        scale: 1,
        rotation: Math.random() * 12 - 6,
        text: 'Are you sure? 🥺'
      }]);
    } else if (clicks >= 2) {
      setShowMergeAnimation(true);
      setNoButtons([
        { id: 0, x: 0, y: 0, scale: 1.05, rotation: 0, text: 'Ah we banaa! 😂 YES! 💕' }
      ]);

      setTimeout(() => {
        handleYes();
      }, 900);
    }
  };

  const hugEdgeOnHover = (buttonId) => {
    if (showMergeAnimation || noButtonClicks > 0) return;

    setNoButtons(prev => prev.map((btn) => (
      btn.id === buttonId
        ? { ...btn, x: 110 + Math.random() * 80, y: Math.random() * 24 - 12 }
        : btn
    )));
  };

  const handleYes = () => {
    setShowYesMoment(true);
    const bigConfetti = Array.from({ length: 200 }, (_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 30,
      y: 50 + (Math.random() - 0.5) * 30,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
      color: ['#ec4899', '#f43f5e', '#be123c', '#fb7185', '#ff1493', '#ff69b4'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 0.3
    }));
    setConfetti(bigConfetti);
    
    setTimeout(() => {
      navigateToSection(4);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative overflow-hidden">
      {/* Background couple photo with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-25 z-0"
        style={{ backgroundImage: '/background.jpg'}}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200/50 via-rose-100/50 to-red-100/50 z-0" />
      
      <div className="fixed inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-rose-100/30 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            className="absolute text-pink-400 opacity-30"
            size={40}
            style={{
              left: `${heart.left}%`,
              animation: `float ${heart.duration}s ease-in forwards`,
              animationDelay: `${heart.delay}s`
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        {petals.map(petal => (
          <div
            key={petal.id}
            className="absolute w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-40"
            style={{
              left: `${petal.left}%`,
              animation: `floatPetal ${petal.duration}s ease-in forwards`,
              animationDelay: `${petal.delay}s`,
              transform: `rotate(${petal.rotation}deg)`
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorHearts.map(heart => (
          <Heart
            key={heart.id}
            className="absolute text-pink-400"
            size={24}
            fill="currentColor"
            style={{
              left: heart.x,
              top: heart.y,
              animation: 'fadeOut 1s ease-out forwards'
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map(conf => (
          <Heart
            key={conf.id}
            className="absolute"
            size={50}
            fill={conf.color || '#ec4899'}
            style={{
              left: `${conf.x}%`,
              top: `${conf.y}%`,
              animation: `explode 2.5s ease-out forwards`,
              animationDelay: `${conf.delay}s`,
              '--target-x': `${conf.targetX}%`,
              '--target-y': `${conf.targetY}%`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0.3;
          }
          to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes floatPetal {
          from {
            transform: translateY(100vh) rotate(0deg) translateX(0);
            opacity: 0.4;
          }
          to {
            transform: translateY(-100px) rotate(720deg) translateX(100px);
            opacity: 0;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 0.8;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.3) translateY(-30px);
          }
        }
        @keyframes explode {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--target-x) - 50%), calc(var(--target-y) - 50%)) scale(0.8) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(236, 72, 153, 0.5),
                         0 0 40px rgba(236, 72, 153, 0.3);
          }
          50% { 
            text-shadow: 0 0 30px rgba(236, 72, 153, 0.8),
                         0 0 60px rgba(236, 72, 153, 0.5);
          }
        }
        @keyframes letterPop {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5) rotate(-10deg);
          }
          60% {
            transform: translateY(-10px) scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        @keyframes glow {
          0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
          }
          50% { 
            filter: drop-shadow(0 0 25px rgba(236, 72, 153, 0.8));
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {currentSection === 0 && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-12">
              <Sparkles className="w-32 h-32 text-pink-500 mx-auto" style={{ animation: 'glow 2s ease-in-out infinite' }} />
              
              <div className="mb-8">
                <h1 className="text-8xl md:text-9xl font-bold mb-4" style={{ fontFamily: scriptFont }}>
                  {nameLetters.map((letter, idx) => (
                    <span
                      key={idx}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-red-500"
                      style={{
                        animation: idx < showLetters ? 'letterPop 0.6s ease-out forwards, shimmer 3s ease-in-out infinite' : 'none',
                        animationDelay: `${idx * 0.15}s, ${idx * 0.15 + 0.6}s`,
                        opacity: idx < showLetters ? 1 : 0
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
                <p className="text-2xl text-pink-600 font-semibold" style={{ fontFamily: scriptFont }}>
                  (Oder) Mwihaki 💕
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-pink-200">
                <p className="text-3xl text-gray-700 max-w-2xl mx-auto mb-6">
                  I made something special just for you...
                </p>
                <button
                  onClick={() => navigateToSection(1)}
                  className="mt-4 px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-full text-2xl font-bold hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-300"
                  style={{ animation: 'glow 2s ease-in-out infinite' }}
                >
                  Open Your Surprise 
                </button>
              </div>
            </div>
          </div>
        )}

        {currentSection === 1 && (
          <div className="min-h-screen flex flex-col items-center justify-center py-12">
            <button
              onClick={() => navigateToSection(0)}
              className="mb-8 px-6 py-3 bg-white/80 backdrop-blur text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-200"
            >
              ← Back
            </button>
            
            <h2 className="text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600" style={{ animation: 'shimmer 3s ease-in-out infinite' }}>
              You're absolutely beautiful....i mean look at you !!!!
            </h2>
            <p className="text-2xl text-pink-600 font-semibold mb-12" style={{ fontFamily: scriptFont }}>Payshee 📸</p>
            
            <div className="relative w-full max-w-2xl aspect-square mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200"
              onTouchStart={handlePhotoSwipeStart}
              onTouchEnd={handlePhotoSwipeEnd}>
              <img
                src={photos[currentPhoto].url}
                alt="Payshee"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                <p className="text-white text-3xl font-bold text-center" style={{ fontFamily: scriptFont }}>
                  {photos[currentPhoto].caption}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhoto(idx)}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    currentPhoto === idx ? 'bg-pink-500 scale-150 shadow-lg' : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-pink-700 font-semibold text-lg mb-8 text-center">
              Swipe for next photo
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentPhoto(p => (p - 1 + photos.length) % photos.length)}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/80 backdrop-blur text-pink-600 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-200"
              >
                ← Previous Photo
              </button>
              <button
                onClick={() => navigateToSection(2)}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Continue →
              </button>
              <button
                onClick={() => setCurrentPhoto(p => (p + 1) % photos.length)}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/80 backdrop-blur text-pink-600 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-200"
              >
                Next Photo →
              </button>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="min-h-screen py-12 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <button
                onClick={() => navigateToSection(1)}
                className="mb-8 px-6 py-3 bg-white/80 backdrop-blur text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-200"
              >
                ← Back to Photos
              </button>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600" style={{ animation: 'shimmer 3s ease-in-out infinite' }}>
                  A Message From My Heart 💌💕
                </h2>
                <p className="text-2xl text-pink-600 font-semibold text-center mb-8" style={{ fontFamily: scriptFont }}>For You, Payshee</p>

                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-2xl border border-pink-200 p-6 md:p-8 space-y-5 text-gray-700 text-lg leading-relaxed">
                  <p>
                    From the very first day I started falling in love with you, everything about us has felt like the sweetest gift in my life.
                  </p>
                  <p>
                    From the first moment I saw you, something shifted in me. You walked in like you owned the moment — calm, confident, unforgettable. Your style, your vibe, your energy… the way you carry yourself with beauty and quiet power — it stays with me.
                  </p>
                  <p>
                    You don't just love me. You make me better.<br />
                    You inspire me more than you probably realize.<br />
                    You push me, motivate me, even "pressure" me when I get too comfortable — and I call it gun-point love 😅 — because behind it all, you're shaping me into a stronger man. A better man.
                  </p>
                  <p>
                    You've changed me in ways I didn't expect. You've shaped me, grounded me, and grown me. You're not just my girlfriend — you're my best friend, my peace, and someone I genuinely see a future with.
                  </p>
                  <p>
                    If I had to choose in every lifetime, in every universe, under any pressure — it would still be you. Every single time.
                  </p>
                  <p>
                    I don't just want moments with you.<br />
                    I want mornings, challenges, success, laughter, silence, growth — a whole life together.
                  </p>
                  <p>
                    This website may run on code,<br />
                    but my heart runs on you.
                  </p>
                  <p className="font-semibold text-pink-700">
                    Payshee, I love you. Not in a loud, dramatic way — but in a calm, certain, forever kind of way.
                  </p>
                  <p className="font-semibold text-pink-700">Forever yours.</p>
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => navigateToSection(3)}
                    className="px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all"
                    style={{ animation: 'glow 2s ease-in-out infinite' }}
                  >
                    Continue to My Question... 💕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 3 && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8 max-w-3xl">
              <button
                onClick={() => navigateToSection(2)}
                className="mb-4 px-6 py-3 bg-white/80 backdrop-blur text-pink-600 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all border-2 border-pink-200"
              >
                ← Back
              </button>
              
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-pink-200">
                <Heart className="w-24 h-24 text-rose-500 mx-auto mb-8" fill="currentColor" style={{ animation: 'glow 2s ease-in-out infinite' }} />
                
                <h2 className="text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: scriptFont }}>
                  So, Payshee...
                </h2>
                
                <div className="bg-gradient-to-r from-pink-100 via-rose-100 to-red-100 rounded-3xl p-10 mb-10 border-2 border-pink-300">
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 mb-6" style={{ animation: 'shimmer 3s ease-in-out infinite' }}>
                    Payshee, will you be my Valentine?
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center relative min-h-[8rem]">
                  <button
                    onClick={handleYes}
                    className="px-10 py-4 sm:px-16 sm:py-6 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-full text-2xl sm:text-3xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-125 transition-all z-10"
                    style={{ animation: 'glow 2s ease-in-out infinite' }}
                  >
                    Yes! 💕
                  </button>
                  
                  {noButtons.map((btn) => (
                    <button
                      key={btn.id}
                      onClick={moveNoButton}
                      onMouseEnter={() => hugEdgeOnHover(btn.id)}
                      onTouchStart={() => hugEdgeOnHover(btn.id)}
                      style={{
                        transform: `translate(${btn.x}px, ${btn.y}px) scale(${btn.scale}) rotate(${btn.rotation}deg)`,
                        transition: showMergeAnimation ? 'all 1s ease-in-out' : 'all 0.3s ease-out',
                        background: noButtonClicks >= 2 ? 'linear-gradient(to right, #ec4899, #f43f5e, #be123c)' : undefined,
                        color: noButtonClicks >= 2 ? 'white' : undefined
                      }}
                      className={`absolute z-20 px-10 py-4 sm:px-16 sm:py-6 ${noButtonClicks >= 2 ? '' : 'bg-gray-300 text-gray-700'} rounded-full text-2xl sm:text-3xl font-bold shadow-lg hover:shadow-xl transition-all`}
                    >
                      {btn.text}
                    </button>
                  ))}
                </div>

                {noButtonClicks === 1 && (
                  <p className="mt-6 text-pink-600 font-bold text-xl animate-pulse">
                    One more tap and I know your real answer 😄
                  </p>
                )}

                {showYesMoment && (
                  <div className="mt-8 space-y-4">
                    <p className="text-rose-600 font-bold text-3xl animate-pulse" style={{ animation: 'pulse 1s ease-in-out infinite' }}>
                      She said YES! 💖✨
                    </p>
                    <p className="text-pink-600 font-bold text-2xl">
                      Thank you for saying YES, Payshee! 🎉
                    </p>
                  </div>
                )}

                {showMergeAnimation && !showYesMoment && (
                  <p className="mt-6 text-pink-600 font-bold text-2xl animate-pulse">
                    Wait for it... ✨
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentSection === 4 && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-12 max-w-4xl">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-16 shadow-2xl border-2 border-pink-200">
                <div className="text-8xl mb-8">💕</div>
                
                <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 mb-8" style={{ animation: 'shimmer 3s ease-in-out infinite', fontFamily: scriptFont }}>
                  Here's the Truth...
                </h2>

                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-2xl border-2 border-pink-200 p-8 md:p-12 space-y-6 text-gray-800">
                  <p className="text-5xl md:text-6xl font-bold text-rose-600 mb-6">
                    Fuck Valentine's Day
                  </p>
                  
                  <p className="text-2xl md:text-3xl font-semibold text-gray-700 leading-relaxed">
                    I don't need a holiday to love you.
                  </p>
                  
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                    I don't love you because it's February 14th.<br />
                    I love you on random Tuesdays.<br />
                    On stressed Mondays.<br />
                    On lazy Sundays. (jeden tag). 
                  </p>
                  
                  <p className="text-2xl md:text-3xl font-bold text-pink-700">
                    Every. Single. Day.
                  </p>
                  
                  <div className="pt-6 border-t-2 border-pink-200">
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4">
                      This website isn't for Valentine's Day—<br />
                      it's for <span className="font-bold text-rose-600">YOU</span>.
                    </p>
                    
                    <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600">
                      365 days a year, you're my Valentine.
                    </p>
                  </div>
                  
                  <div className="pt-8">
                    <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: scriptFont }}>
                      I love you, Payshee.
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold text-pink-600" style={{ fontFamily: scriptFont }}>
                      Always. Forever. 💕
                    </p>
                  </div>
                </div>

                <div className="pt-10">
                  <Heart className="w-48 h-48 md:w-64 md:h-64 text-rose-500 mx-auto" fill="currentColor" style={{ animation: 'glow 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}s