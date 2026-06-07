import React, { useState } from 'react';
import { Share2, ClipboardList, Sparkles, Coffee, Cpu } from 'lucide-react';

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
type Step = 'quiz' | 'results';

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Post-event feedback just landed in your inbox. Which message makes you feel like you nailed it?",
    options: [
      { key: 'A', text: "\"Everything ran like clockwork — not a single hiccup.\"" },
      { key: 'B', text: "\"Your activation was everywhere on LinkedIn. The buzz was real.\"" },
      { key: 'C', text: "\"Our most-valued attendees couldn't stop talking about how relatable the session content was.\"" },
      { key: 'D', text: "\"The lead quality from this event was the best we've ever seen.\"" },
    ],
  },
  {
    id: 2,
    text: "You need to drive a 40% jump in event engagement. What's your first move?",
    options: [
      { key: 'A', text: "Map every touchpoint from venue, flow, to signage and eliminate friction." },
      { key: 'B', text: "Create a content moment so good, attendees share it without being asked." },
      { key: 'C', text: "Design an invite-only experience that makes the right people feel seen." },
      { key: 'D', text: "Deploy smart tracking to capture real-time intent signals across the event." },
    ],
  },
  {
    id: 3,
    text: "It's day one of a major conference — back-to-back sessions, a packed agenda, and barely a moment to breathe. You finally get 10 minutes to yourself. What are you doing?",
    options: [
      { key: 'A', text: "Confirming tomorrow's vendor logistics and run-of-show." },
      { key: 'B', text: "Filming a quick take on a trend you just heard on stage — straight to company socials." },
      { key: 'C', text: "Checking in with a key partner to make sure they're having a good time." },
      { key: 'D', text: "Pulling up live registration data to see what's converting." },
    ],
  },
  {
    id: 4,
    text: "What excites you most about the APAC events market right now?",
    options: [
      { key: 'A', text: "World-class venues and infrastructure that make flawless execution possible." },
      { key: 'B', text: "A cultural appetite for bold, unexpected brand storytelling." },
      { key: 'C', text: "The gold standard for relationship-driven, high-touch hospitality." },
      { key: 'D', text: "How fast the region is adopting AI and event tech." },
    ],
  },
  {
    id: 5,
    text: "The last session just wrapped and networking hour is in full swing — you've got the whole floor to work with. What are you actually doing?",
    options: [
      { key: 'A', text: "Doing a quiet walk-through of the venue, mentally logging what to fix for tomorrow." },
      { key: 'B', text: "Pulling aside a speaker to talk about turning their session into content for the brand's socials." },
      { key: 'C', text: "Floating through the room, making sure every attendee feels personally looked after — no one stands alone on your watch." },
      { key: 'D', text: "Keeping an eye on which conversations are heating up and making sure the right people get introduced to each other." },
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
    title: "The Ops Mastermind",
    badge: "Turning chaos into clockwork",
    desc: "You're the reason events actually work. While everyone else is caught up in the moment, you've already planned for the moment after that — and the one after that. Flawless execution isn't a goal for you, it's a baseline.\n\n\"If it's not in the run sheet, it doesn't exist.\"",
    icon: <ClipboardList className="w-16 h-16 text-blue-400" />,
    color: "text-blue-400",
  },
  B: {
    title: "The Story Maker",
    badge: "Making people stop the scroll",
    desc: "You see events as content waiting to happen. You know that the best brand moments aren't planned in a brief — they're captured live, told authentically, and felt long after the last slide goes dark.\n\n\"Every session is a story. Every hallway is a set.\"",
    icon: <Sparkles className="w-16 h-16 text-purple-400" />,
    color: "text-purple-400",
  },
  C: {
    title: "The Relationship Builder",
    badge: "Making everyone feel like a VIP",
    desc: "You understand something most people miss: the highest ROI at any event is the room feeling right. You read people, anticipate needs, and create experiences that make attendees feel genuinely looked after.\n\n\"The best events aren't remembered for the agenda — they're remembered for how they made you feel.\"",
    icon: <Coffee className="w-16 h-16 text-emerald-400" />,
    color: "text-emerald-400",
  },
  D: {
    title: "The Data Driver",
    badge: "Turning registrations into revenue intel",
    desc: "You know that gut feel is good, but data is better. You're the one connecting event activity to pipeline, building dashboards while others debrief, and making sure every dollar spent is a dollar accounted for.\n\n\"If it can't be measured, it can't be optimised.\"",
    icon: <Cpu className="w-16 h-16 text-cyan-400" />,
    color: "text-cyan-400",
  },
};

// Q1, Q2, Q5 are most diagnostic — weighted 2×. Q3, Q4 are 1×. Max score = 7.
const QUESTION_WEIGHTS = [2, 2, 1, 1, 2];

function calculatePersona(answers: PersonaKey[]): PersonaKey {
  const scores: Record<PersonaKey, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((ans, i) => { scores[ans] += QUESTION_WEIGHTS[i]; });

  let top: PersonaKey = 'A';
  let max = 0;
  (Object.keys(scores) as PersonaKey[]).forEach((key) => {
    if (scores[key] > max) {
      max = scores[key];
      top = key;
    }
  });
  return top;
}

// --- SUB-COMPONENTS ---

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

  const shareText = `I just discovered my Events Personality Type is "${persona.title}" ahead of Cvent Accelerate Singapore 2026! Take the quiz to find yours.`;

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
      {persona.desc.split('\n\n').map((para, i) => (
        <p
          key={i}
          className={`text-sm leading-relaxed px-2 ${i === 1 ? 'text-slate-400 italic' : 'text-slate-300'}`}
        >
          {para}
        </p>
      ))}

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
  const [step, setStep] = useState<Step>('quiz');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonaKey[]>([]);

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
    setStep('quiz');
    setAnswers([]);
    setCurrentQuestion(0);
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
            Pick Your Events Personality Type
          </h1>
          <p className="text-xs text-blue-200 mt-1">
            Answer 5 quick questions to find out what kind of events professional you are.
          </p>
        </div>

        {/* STEP CONTENT */}
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
            isVip={false}
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
