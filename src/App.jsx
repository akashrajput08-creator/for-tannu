import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  MapPin,
  Coffee,
  Utensils,
  Film,
  Sun,
  Settings,
  X,
  Lock,
  Unlock,
  Send,
  Star,
  Gift,
  Flame
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState({
    herName: 'Tannu',
    yourName: 'Akash',
    startDate: '2026-07-04T00:00:00',
    examDate: '2026-12-06T14:00:00',
    customNote:
      'Ever since July 4th, every single day with you has felt like magic. Watching your hard work, cute focus, and dedication for CLAT makes me fall for you even more. You are going to ace this exam, and then our sweetest celebration begins!'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempConfig, setTempConfig] = useState(config);

  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeToExam, setTimeToExam] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: false });

  const [activeTab, setActiveTab] = useState('affidavit');
  const [unlockedBriefs, setUnlockedBriefs] = useState({});
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedDatePlan, setSelectedDatePlan] = useState('coffee');
  const [cravingNote, setCravingNote] = useState('');
  const [summonsAccepted, setSummonsAccepted] = useState(false);

  useEffect(() => {
    const updateTimers = () => {
      const now = new Date().getTime();
      const start = new Date(config.startDate).getTime();
      const exam = new Date(config.examDate).getTime();

      const diffTogether = Math.max(0, now - start);
      setTimeTogether({
        days: Math.floor(diffTogether / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diffTogether / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diffTogether / 1000 / 60) % 60),
        seconds: Math.floor((diffTogether / 1000) % 60)
      });

      const diffExam = exam - now;
      if (diffExam <= 0) {
        setTimeToExam({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
      } else {
        setTimeToExam({
          days: Math.floor(diffExam / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffExam / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffExam / 1000 / 60) % 60),
          seconds: Math.floor((diffExam / 1000) % 60),
          passed: false
        });
      }
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [config.startDate, config.examDate]);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setConfig(tempConfig);
    setIsEditing(false);
  };

  const toggleBrief = (id) => {
    setUnlockedBriefs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const legalBriefs = [
    {
      id: 'mock',
      tag: 'EXHIBIT A 🧸',
      title: 'Open When Mock Scores Feel Low',
      color: 'bg-pink-50/90 border-pink-200 text-pink-900 shadow-pink-100',
      content:
        'Hey my cutie! A single mock test score can never measure how brilliant you are. The way you have stayed consistent since July 4th is amazing. Take a deep breath, eat a chocolate, and remember I am always rooting for you!'
    },
    {
      id: 'reading',
      tag: 'EXHIBIT B 📚',
      title: 'Open When Legal Passages Feel Endless',
      color: 'bg-rose-50/90 border-rose-200 text-rose-900 shadow-rose-100',
      content:
        'My brilliant future advocate! If anyone can conquer these long passages and tricky questions, it is definitely you. Take a 10-minute cute break, drink some water, and come back like a champion!'
    },
    {
      id: 'miss',
      tag: 'EXHIBIT C 💞',
      title: 'Open When You Miss Me During Late-Night Study',
      color: 'bg-purple-50/90 border-purple-200 text-purple-900 shadow-purple-100',
      content:
        'Just a little more study time, my love! The moment your exam ends in December, every pending hug, laugh, and sweet date will happen. Till then, sending you the warmest virtual hugs!'
    }
  ];

  const quizQuestions = [
    {
      q: 'When did our sweet little love story and chats officially begin?',
      options: ['4th July', '14th February', '1st January', '15th August'],
      answer: 0,
      note: '4th July — The best day ever! 🌸'
    },
    {
      q: 'What is the most important rule right after the December CLAT exam?',
      options: [
        'Give more mock tests',
        'Meet up immediately & celebrate together!',
        'Read more law books',
        'Sleep for 24 hours'
      ],
      answer: 1,
      note: 'Mandatory rule under the Law of Love! 💕'
    },
    {
      q: 'What is your biggest superpower as a future NLU star?',
      options: [
        'Your gorgeous smile & dedication',
        'Your sharp, clever mind',
        'Your never-give-up cuteness',
        'All of the above!'
      ],
      answer: 3,
      note: '100% Correct Verdict: All of the above! ✨'
    }
  ];

  const handleQuizAnswer = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === quizQuestions[quizStep].answer) {
      setQuizScore((s) => s + 1);
    }
    setTimeout(() => {
      if (quizStep + 1 < quizQuestions.length) {
        setQuizStep((s) => s + 1);
        setSelectedOption(null);
      } else {
        setQuizDone(true);
      }
    }, 1100);
  };

  const dateOptions = [
    {
      id: 'coffee',
      title: '☕ Cozy Coffee & Long Drive',
      desc: 'No books, no pressure — just warm coffee, sweet talks, and hand-in-hand moments.',
      icon: Coffee
    },
    {
      id: 'streetfood',
      title: '🥟 Momos & Street Food Treat',
      desc: 'Your absolute favorite food date to celebrate your hard work!',
      icon: Utensils
    },
    {
      id: 'movie',
      title: '🎬 Movie & Dessert Date',
      desc: 'Cuddling up, watching a cute movie, and eating your favorite sweets.',
      icon: Film
    },
    {
      id: 'fullday',
      title: '☀️ Full-Day Princess Pass',
      desc: 'An entire day planned completely around your happiness and wishes!',
      icon: Sun
    }
  ];

  const activePlanObj = dateOptions.find((d) => d.id === selectedDatePlan);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-100 text-slate-800 font-sans selection:bg-pink-300 selection:text-pink-950 pb-20 relative overflow-x-hidden">
      
      {/* Floating Background Orbs & Badges */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-rose-300/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl" />
        
        <div className="absolute top-24 left-[10%] p-3 bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-pink-200 flex items-center gap-2 animate-bounce duration-1000">
          <span className="text-lg">💖</span>
          <span className="text-xs font-bold text-pink-600">My Cutie Lawyer</span>
        </div>
        <div className="absolute top-48 right-[10%] p-3 bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-rose-200 flex items-center gap-2 animate-pulse">
          <span className="text-lg">✨</span>
          <span className="text-xs font-bold text-rose-600">NLU Star 2026</span>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 max-w-4xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between border-b border-pink-200/80 bg-white/70 backdrop-blur-md rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/30 animate-pulse">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-pink-600 font-extrabold block">
              Our Love Story • Since July 4
            </span>
            <h1 className="text-sm sm:text-base font-black text-slate-900">
              {config.yourName} <span className="text-rose-500 animate-pulse">♥</span> {config.herName}
            </h1>
          </div>
        </div>

        <button
          onClick={() => {
            setTempConfig(config);
            setIsEditing(true);
          }}
          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-2xl bg-white hover:bg-pink-50 border border-pink-300 text-slate-700 shadow-sm transition active:scale-95"
        >
          <Settings className="w-3.5 h-3.5 text-pink-500" />
          Customize
        </button>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-8 space-y-8">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl shadow-pink-500/5 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-pink-200/50 rounded-full blur-xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-300 text-pink-700 text-xs font-black shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Mission CLAT December • Special Edition for Tannu 🌸</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            You Got This, <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">{config.herName}!</span> ✨
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
            Ever since July 4th, every single day with you has felt like magic. Here is a special surprise for your final stretch of CLAT preparation — followed by an official invitation for our much-awaited meetup right after your exam!
          </p>
        </section>

        {/* Timers Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Timer 1 */}
          <div className="p-6 rounded-3xl bg-white/80 border border-pink-200 backdrop-blur-md shadow-xl shadow-pink-500/10">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                Talking Since July 4th 💕
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-extrabold border border-pink-200">
                Live
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 text-center">
              {[
                { label: 'Days', val: timeTogether.days },
                { label: 'Hours', val: timeTogether.hours },
                { label: 'Mins', val: timeTogether.minutes },
                { label: 'Secs', val: timeTogether.seconds }
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-2xl bg-pink-50 border border-pink-200 shadow-inner">
                  <div className="text-xl sm:text-2xl font-black text-pink-600 tabular-nums">
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timer 2 */}
          <div className="p-6 rounded-3xl bg-white/80 border border-rose-200 backdrop-blur-md shadow-xl shadow-rose-500/10">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
                <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
                CLAT Exam Countdown 🎯
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold border border-rose-200">
                December
              </span>
            </div>

            {timeToExam.passed ? (
              <div className="py-6 text-center text-rose-600 font-bold text-sm">
                Exam Done! Time to celebrate and meet up! 🎉💖
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2.5 text-center">
                {[
                  { label: 'Days', val: timeToExam.days },
                  { label: 'Hours', val: timeToExam.hours },
                  { label: 'Mins', val: timeToExam.minutes },
                  { label: 'Secs', val: timeToExam.seconds }
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-2xl bg-rose-50 border border-rose-200 shadow-inner">
                    <div className="text-xl sm:text-2xl font-black text-rose-600 tabular-nums">
                      {String(item.val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-2.5">
          {[
            { id: 'affidavit', label: '💌 Love Letter', icon: BookOpen },
            { id: 'boosters', label: '🎁 Open When...', icon: Gift },
            { id: 'quiz', label: '🧠 Cute Quiz', icon: Award },
            { id: 'summons', label: '🌸 Date Pass', icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  active
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105'
                    : 'bg-white/80 text-slate-700 hover:bg-pink-50 border border-pink-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* TAB 1: LOVE LETTER */}
        {activeTab === 'affidavit' && (
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-pink-200 shadow-2xl space-y-6 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-pink-600 font-extrabold">
                  Special Delivery From My Heart to Yours
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                  Pre-CLAT Cheer-Up Note 💌
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold">
                EST. 04.07.2026
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
              <p>
                My dearest <span className="font-extrabold text-pink-600">{config.herName}</span>,
              </p>
              <p>{config.customNote}</p>
              <div className="p-5 rounded-2xl bg-pink-50/80 border border-pink-200 space-y-2.5 text-xs sm:text-sm text-slate-700 shadow-sm">
                <p className="font-extrabold text-pink-700 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  3 Cute Rules For Exam Day:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-600 font-medium">
                  <li>
                    <strong>Rule 1:</strong> Your preparation is amazing — trust your own bright mind!
                  </li>
                  <li>
                    <strong>Rule 2:</strong> Don't panic over any tough question; keep smiling and move on.
                  </li>
                  <li>
                    <strong>Rule 3:</strong> The moment you step out of the exam hall, I am waiting to give you the biggest hug and celebrate!
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-pink-100">
              <div>
                <p className="text-xs text-slate-400 font-bold">With all my love & hugs,</p>
                <p className="text-base font-black text-rose-600">{config.yourName}</p>
              </div>
              <button
                onClick={() => setActiveTab('summons')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/25 transition active:scale-95"
              >
                Choose Our Date Plan <Send className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* TAB 2: OPEN WHEN BOOSTERS */}
        {activeTab === 'boosters' && (
          <section className="space-y-4">
            <div className="text-center max-w-xl mx-auto mb-2">
              <h3 className="text-xl font-black text-slate-800">Open When... 🎁</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Whenever you need a cute boost during your studies, tap any box below!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {legalBriefs.map((brief) => {
                const isOpen = !!unlockedBriefs[brief.id];
                return (
                  <div
                    key={brief.id}
                    onClick={() => toggleBrief(brief.id)}
                    className={`cursor-pointer p-6 rounded-3xl border transition-all shadow-md hover:shadow-lg ${brief.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-[11px] font-extrabold shadow-sm border border-pink-200">
                          {brief.tag}
                        </span>
                        <h4 className="font-extrabold text-sm sm:text-base">{brief.title}</h4>
                      </div>
                      <span>
                        {isOpen ? (
                          <Unlock className="w-5 h-5 text-pink-600" />
                        ) : (
                          <Lock className="w-5 h-5 text-pink-400" />
                        )}
                      </span>
                    </div>

                    {isOpen ? (
                      <p className="mt-4 pt-3 border-t border-pink-200/60 text-sm leading-relaxed font-semibold">
                        {brief.content}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs opacity-75 font-bold">Tap to open this cute letter...</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 3: CUTE QUIZ */}
        {activeTab === 'quiz' && (
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-pink-200 shadow-2xl max-w-2xl mx-auto backdrop-blur-md">
            {!quizDone ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="uppercase tracking-wider text-pink-600 font-extrabold">
                    Our Sweet Love Quiz 🧠
                  </span>
                  <span>
                    Question {quizStep + 1} of {quizQuestions.length}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-800">
                  {quizQuestions[quizStep].q}
                </h3>

                <div className="space-y-2.5">
                  {quizQuestions[quizStep].options.map((opt, idx) => {
                    const isPicked = selectedOption === idx;
                    const isCorrect = idx === quizQuestions[quizStep].answer;
                    let btnStyle =
                      'bg-pink-50/50 border-pink-200 hover:border-pink-400 text-slate-700';
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                      } else if (isPicked) {
                        btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-4 rounded-2xl border text-sm font-bold transition flex items-center justify-between shadow-sm ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <p className="text-xs text-pink-600 font-extrabold">
                    {quizQuestions[quizStep].note}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-600 shadow-inner">
                  <Award className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">
                  Yay! Score: {quizScore}/{quizQuestions.length} 🎉
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-semibold">
                  Just like this, you are going to ace your CLAT exam with flying colors!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setQuizStep(0);
                      setQuizScore(0);
                      setQuizDone(false);
                      setSelectedOption(null);
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-white border border-pink-200 hover:bg-pink-50 text-xs font-bold text-slate-700 shadow-sm"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => setActiveTab('summons')}
                    className="px-5 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-lg shadow-pink-500/25"
                  >
                    Claim Date Pass →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB 4: DATE PASS */}
        {activeTab === 'summons' && (
          <section className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-pink-200 shadow-2xl space-y-6 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-500 font-extrabold">
                  December Post-Exam Date Pass 🌸
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                  Choose Our First Date After CLAT!
                </h3>
              </div>
              <MapPin className="w-6 h-6 text-rose-500 animate-bounce" />
            </div>

            <p className="text-sm text-slate-600 font-semibold">
              The moment your exam finishes in December, you deserve your ultimate reward. Select your preferred post-CLAT celebration plan below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {dateOptions.map((item) => {
                const Icon = item.icon;
                const selected = selectedDatePlan === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedDatePlan(item.id);
                      setSummonsAccepted(false);
                    }}
                    className={`p-4.5 rounded-2xl border text-left transition-all shadow-sm ${
                      selected
                        ? 'bg-pink-50 border-pink-400 shadow-pink-500/15 scale-[1.02]'
                        : 'bg-white border-pink-100 hover:border-pink-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon className={`w-4 h-4 ${selected ? 'text-pink-600' : 'text-slate-400'}`} />
                      <span className="font-extrabold text-sm text-slate-800">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Any special food craving or wish? (Optional) 🍰
              </label>
              <input
                type="text"
                value={cravingNote}
                onChange={(e) => {
                  setCravingNote(e.target.value);
                  setSummonsAccepted(false);
                }}
                placeholder="e.g., Cold coffee, extra spicy momos, chocolate pastry..."
                className="w-full px-4 py-3 rounded-2xl bg-pink-50/50 border border-pink-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 shadow-inner font-semibold"
              />
            </div>

            {!summonsAccepted ? (
              <button
                onClick={() => setSummonsAccepted(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-pink-500/30 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                Lock Our December Date & Get Pass!
              </button>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  CUTE DATE PASS CONFIRMED! 💖
                </div>
                <h4 className="text-lg font-black text-slate-800">
                  {config.herName} & {config.yourName} — Post-CLAT Celebration
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                  <strong>Selected Plan:</strong> {activePlanObj?.title}
                  {cravingNote ? ` • Note: "${cravingNote}"` : ''}
                </p>
                <p className="text-xs text-rose-600 font-bold pt-1">
                  Take a screenshot and send it to me — I cannot wait for December! 🥰
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-pink-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
                <Settings className="w-4 h-4 text-pink-500" />
                Customize Names & Dates ✨
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 font-semibold mb-1">Her Name</label>
                  <input
                    type="text"
                    value={tempConfig.herName}
                    onChange={(e) => setTempConfig({ ...tempConfig, herName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 text-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    value={tempConfig.yourName}
                    onChange={(e) => setTempConfig({ ...tempConfig, yourName: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 text-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-semibold mb-1">
                  Talking Start Date (July 4th)
                </label>
                <input
                  type="datetime-local"
                  value={tempConfig.startDate.slice(0, 16)}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, startDate: `${e.target.value}:00` })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-semibold mb-1">CLAT Exam Date (December)</label>
                <input
                  type="datetime-local"
                  value={tempConfig.examDate.slice(0, 16)}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, examDate: `${e.target.value}:00` })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 font-semibold mb-1">Personal Message</label>
                <textarea
                  rows={3}
                  value={tempConfig.customNote}
                  onChange={(e) => setTempConfig({ ...tempConfig, customNote: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 text-slate-800 font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold shadow-md shadow-pink-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}