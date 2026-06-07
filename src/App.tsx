import React, { useState } from 'react';
import { Share2, Award, ClipboardList, Sparkles, Coffee, Cpu } from 'lucide-react';

// --- CONFIGURATION ---
const VIP_CODE = "CVENTVIP2026";

interface Option {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

type PersonaKey = 'A' | 'B' | 'C' | 'D';
type Step = 'welcome' | 'quiz' | 'results';

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Which stakeholder feedback means the most to you?",
    options: [
      { key: 'A', text: "The operations were flawless and everything ran perfectly on time." },
      { key: 'B', text: "The creative concepts and social media buzz were incredible." },
      { key: 'C', text: "The premium hospitality made our top VIP guests feel valued." },
      { key: 'D', text: "The digital data tracking captured our highest-quality leads ever." },
    ],
  },
  {
    id: 2,
    text: "You need to drive a 40% boost in event engagement and leads. Your move?",
    options: [
      { key: 'A', text: "Guarantee an ironclad, friction-free physical crowd flow." },
      { key: 'B', text: "Build high-visibility content hubs that drive social sharing." },
      { key: 'C', text: "Organize exclusive, high-end executive roundtable dinners." },
      { key: 'D', text: "Deploy smart digital tracking to capture automated intent data." },
    ],
  },
  {
    id: 3,
    text: "You get a 10-minute break during a major conference. You...",
    options: [
      { key: 'A', text: "Cross-check tomorrow's vendor and transport schedules." },
      { key: 'B', text: "Record a quick video sharing your insights online." },
      { key: 'C', text: "Meet a key regional partner to ensure they are happy." },
      { key: 'D', text: "Monitor live check-in analytics on your event platform." },
    ],
  },
  {
    id: 4,
    text: "What excites you most about the APAC event market?",
    options: [
      { key: 'A', text: "World-class venue infrastructures and seamless transport links." },
      { key: 'B', text: "Bold opportunities for disruptive and creative brand storytelling." },
      { key: 'C', text: "The legendary global standard for premium guest hospitality." },
      { key: 'D', text: "Rapid adoption of AI and real-time data tech." },
    ],
  },
  {
    id: 5,
    text: "At the evening networking drinks, your main focus is...",
    options: [
      { key: 'A', text: "Reviewing today's operational metrics to optimize tomorrow." },
      { key: 'B', text: "Collaborating with speakers on future industry content." },
      { key: 'C', text: "Ensuring guests feel welcomed, comfortable, and connected." },
      { key: 'D', text: "Exchanging digital contact profiles via fast QR scans." },
    ],
  },
];

interface Persona {
  title: string;
  desc: string;
  badge: string;
  icon: React.ReactElement;
  color: string;
}

const personas: Record<PersonaKey, Persona> = {
  A: {
    title: "The Operational General",
    badge: "Master of Logistics",
    desc: "The backbone of APAC's world-class MICE reputation. You turn logistical complexity into smooth clockwork execution. Where others see chaos, you see a checklist waiting to be completed.",
    icon: <ClipboardList className="w-16 h-16 text-blue-400" />,
    color: "text-blue-400",
  },
  B: {
    title: "The Narrative Alchemist",
    badge: "Content Visionary",
    desc: "You transform traditional corporate setups into high-engagement, viral LinkedIn content goldmines. Your events don't just happen — they trend.",
    icon: <Sparkles className="w-16 h-16 text-purple-400" />,
    color: "text-purple-400",
  },
  C: {
    title: "The Concierge Elite",
    badge: "Hospitality Champion",
    desc: "You prioritize high-end relationship capital, ensuring regional executives experience flawless hospitality. Every guest leaves feeling like the most important person in the room.",
    icon: <Coffee className="w-16 h-16 text-emerald-400" />,
    color: "text-emerald-400",
  },
  D: {
    title: "The Digital Architect",
    badge: "Data & ROI Strategist",
    desc: "You live in the future, engineering smart digital layers, advanced analytics, and proving absolute event ROI. If it can't be measured, it didn't happen.",
    icon: <Cpu className="w-16 h-16 text-cyan-400" />,
    color: "text-cyan-400",
  },
};

function calculatePersona(answers: PersonaKey[]): PersonaKey {
  const counts: Record<PersonaKey, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((ans) => counts[ans]++);

  let top: PersonaKey = 'A';
  let max = 0;
  (Object.keys(counts) as PersonaKey[]).forEach((key) => {
    if (counts[key] > max) {
      max = counts[key];
      top = key;
    }
  });
  return top;
}

// --- SUB-COMPONENTS ---

function WelcomeStep({
  onStart,
}: {
  onStart: (email: string, isVip: boolean) => void;
}) {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vip =
      accessCode.trim().toUpperCase() === VIP_CODE ||
      email.trim().toLowerCase().endsWith('@curatedinfluencer.com');
    onStart(email.trim().toLowerCase(), vip);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="text-center space-y-2">
        <Award className="w-10 h-10 text-blue-400 mx-auto" />
        <p className="text-sm text-slate-300 leading-relaxed">
          Answer 5 crisp questions to discover your operational, creative,
          hospitality, or technical event profile.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Corporate Email
          </label>
          <input
            type="email"
            required
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            VIP Access Code{' '}
            <span className="text-slate-500 font-normal normal-case">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Enter code if invited"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold py-3 rounded-lg text-sm transition-all shadow-md mt-2"
      >
        Start Personality Assessment →
      </button>
    </form>
  );
}

function QuizStep({
  question,
  questionIndex,
  total,
  onAnswer,
}: {
  question: Question;
  questionIndex: number;
  total: number;
  onAnswer: (key: PersonaKey) => void;
}) {
  const progress = (questionIndex / total) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Question {questionIndex + 1} of {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-lg font-medium leading-snug text-white">
        {question.text}
      </h2>

      <div className="flex flex-col space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onAnswer(opt.key)}
            className="w-full text-left bg-slate-900 hover:bg-slate-700/60 border border-slate-700 hover:border-blue-500/60 rounded-xl px-4 py-3.5 text-sm text-slate-200 transition-all active:scale-[0.99] flex items-start gap-3"
          >
            <span className="shrink-0 w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-400">
              {opt.key}
            </span>
            <span className="leading-snug">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultsStep({
  persona,
  isVip,
  onRetake,
}: {
  persona: Persona;
  isVip: boolean;
  onRetake: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `I just discovered my B2B Event Personality is "${persona.title}" ahead of Cvent Accelerate Singapore 2026! Take the quiz to unlock yours.`;

  const handleShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText + ' ' + window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="p-6 space-y-6 text-center">
      {/* Persona icon */}
      <div className="flex justify-center pt-2">{persona.icon}</div>

      {/* Persona label & title */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Your Event Persona Is
        </span>
        <h2 className={`text-2xl font-bold ${persona.color}`}>{persona.title}</h2>
        <span className="inline-block bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full mt-1">
          {persona.badge}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-300 leading-relaxed px-2">{persona.desc}</p>

      {/* VIP badge */}
      {isVip && (
        <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 rounded-xl px-4 py-3 space-y-1">
          <p className="text-amber-400 font-bold text-sm">⭐ VIP Access Confirmed</p>
          <p className="text-amber-300/80 text-xs leading-relaxed">
            Your exclusive invite unlocks priority seating and a personalised
            briefing at Cvent Accelerate Singapore 2026.
          </p>
        </div>
      )}

      {/* CTA block */}
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 space-y-2 text-left">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Join Us at the Event
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Meet fellow{' '}
          <span className={`font-semibold ${persona.color}`}>{persona.title}</span>{' '}
          professionals and the full spectrum of APAC event leaders at{' '}
          <span className="text-white font-semibold">Cvent Accelerate Singapore 2026</span>.
        </p>
      </div>

      {/* Share actions */}
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 active:scale-[0.99] text-white font-semibold py-2.5 rounded-lg text-sm transition-all"
        >
          <Share2 className="w-4 h-4" />
          Share on LinkedIn
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 active:scale-[0.99] text-slate-200 font-semibold px-4 py-2.5 rounded-lg text-sm transition-all"
          title="Copy share text"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>

      {/* Retake */}
      <button
        onClick={onRetake}
        className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors pt-1"
      >
        Retake the quiz
      </button>
    </div>
  );
}

// --- ROOT APP ---

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [isVip, setIsVip] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonaKey[]>([]);

  const handleStart = (_email: string, vip: boolean) => {
    setIsVip(vip);
    setStep('quiz');
  };

  const handleAnswer = (key: PersonaKey) => {
    const updated = [...answers, key];
    setAnswers(updated);

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('results');
    }
  };

  const handleRetake = () => {
    setStep('welcome');
    setAnswers([]);
    setCurrentQuestion(0);
    setIsVip(false);
  };

  const personaKey = answers.length === quizQuestions.length
    ? calculatePersona(answers)
    : 'A';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-center border-b border-slate-700">
          <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-widest mb-0.5">
            Cvent Accelerate Singapore 2026
          </p>
          <h1 className="text-lg font-bold tracking-tight text-white">
            MICE &amp; B2B Event Personality Quiz
          </h1>
        </div>

        {/* STEP CONTENT */}
        {step === 'welcome' && <WelcomeStep onStart={handleStart} />}

        {step === 'quiz' && (
          <QuizStep
            question={quizQuestions[currentQuestion]}
            questionIndex={currentQuestion}
            total={quizQuestions.length}
            onAnswer={handleAnswer}
          />
        )}

        {step === 'results' && (
          <ResultsStep
            persona={personas[personaKey]}
            isVip={isVip}
            onRetake={handleRetake}
          />
        )}

        {/* FOOTER */}
        <div className="px-6 pb-5 text-center">
          <p className="text-[10px] text-slate-600">
            © 2026 Cvent, Inc. · All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
