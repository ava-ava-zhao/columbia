import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Camera, Lightbulb, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Header } from './components/Header';
import { GAME_STEPS, CROSSWORD_DATA } from './data';
import { PuzzleType } from './types';

// --- Sub-components for Puzzles ---

const PuzzleInput = ({ onSubmit, placeholder = "Type your answer..." }: { onSubmit: (val: string) => void, placeholder?: string }) => {
  const [val, setVal] = useState('');
  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onSubmit(val); }} 
      className="flex flex-col sm:flex-row gap-2 w-full mt-6"
    >
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all text-lg"
      />
      <button 
        type="submit"
        disabled={!val.trim()}
        className="bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-primary-200"
      >
        Submit
      </button>
    </form>
  );
};

const MultipleChoice = ({ choices, onSelect }: { choices: { id: string, label: string }[], onSelect: (id: string) => void }) => {
  return (
    <div className="grid gap-3 mt-6 w-full">
      {choices.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="text-left px-6 py-4 rounded-xl border-2 border-primary-100 bg-white hover:border-primary-500 hover:bg-primary-50 transition-all font-medium text-slate-700"
        >
          <span className="font-bold text-primary-600 mr-2 uppercase">{c.id}.</span> {c.label}
        </button>
      ))}
    </div>
  );
};

const Crossword = ({ onComplete }: { onComplete: () => void }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  
  const checkAll = () => {
    const newErrors: string[] = [];
    let allCorrect = true;

    CROSSWORD_DATA.across.forEach((item) => {
      const key = `across-${item.num}`;
      const userVal = (answers[key] || '').toUpperCase().trim();
      if (userVal !== item.answer) {
        newErrors.push(key);
        allCorrect = false;
      }
    });

    CROSSWORD_DATA.down.forEach((item) => {
      const key = `down-${item.num}`;
      const userVal = (answers[key] || '').toUpperCase().trim();
      if (userVal !== item.answer) {
        newErrors.push(key);
        allCorrect = false;
      }
    });

    setErrors(newErrors);
    if (allCorrect) onComplete();
  };

  return (
    <div className="mt-6 w-full bg-white rounded-xl border border-primary-100 p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-serif font-bold text-primary-800 border-b border-primary-100 mb-3 pb-1">Across</h4>
          <div className="space-y-3">
            {CROSSWORD_DATA.across.map((item) => (
              <div key={`across-${item.num}`} className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">{item.num}. {item.clue}</label>
                <input 
                  type="text" 
                  maxLength={item.answer.length}
                  placeholder={`${item.answer.length} letters`}
                  className={`border-b-2 bg-transparent focus:outline-none p-1 font-mono uppercase tracking-widest ${errors.includes(`across-${item.num}`) ? 'border-red-400 text-red-600' : 'border-primary-200 text-primary-900'}`}
                  value={answers[`across-${item.num}`] || ''}
                  onChange={(e) => {
                     setAnswers(prev => ({ ...prev, [`across-${item.num}`]: e.target.value }));
                     setErrors(prev => prev.filter(err => err !== `across-${item.num}`));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-serif font-bold text-primary-800 border-b border-primary-100 mb-3 pb-1">Down</h4>
          <div className="space-y-3">
            {CROSSWORD_DATA.down.map((item) => (
              <div key={`down-${item.num}`} className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1">{item.num}. {item.clue}</label>
                <input 
                  type="text" 
                  maxLength={item.answer.length}
                  placeholder={`${item.answer.length} letters`}
                  className={`border-b-2 bg-transparent focus:outline-none p-1 font-mono uppercase tracking-widest ${errors.includes(`down-${item.num}`) ? 'border-red-400 text-red-600' : 'border-primary-200 text-primary-900'}`}
                  value={answers[`down-${item.num}`] || ''}
                  onChange={(e) => {
                     setAnswers(prev => ({ ...prev, [`down-${item.num}`]: e.target.value }));
                     setErrors(prev => prev.filter(err => err !== `down-${item.num}`));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button 
          onClick={checkAll}
          className="bg-primary-700 hover:bg-primary-800 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Verify Answers
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  
  const currentStep = GAME_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === GAME_STEPS.length - 1;

  useEffect(() => {
    // Reset state on step change
    setShowHint(false);
    setIsSuccess(false);
    setErrorShake(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepIndex]);

  const handleInputSubmit = (value: string) => {
    if (!currentStep.answer) {
      // If no answer required (Reading only), just proceed
      setIsSuccess(true);
      return;
    }

    const correctAnswers = Array.isArray(currentStep.answer) 
      ? currentStep.answer.map(a => a.toLowerCase()) 
      : [currentStep.answer.toLowerCase()];
    
    if (correctAnswers.includes(value.trim().toLowerCase())) {
      setIsSuccess(true);
    } else {
      triggerError();
    }
  };

  const handleChoiceSelect = (id: string) => {
    if (currentStep.answer === id) {
      setIsSuccess(true);
    } else {
      triggerError();
    }
  };

  const triggerError = () => {
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  const handleNext = () => {
    if (currentStepIndex < GAME_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen pb-12 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 pt-8 max-w-3xl">
        
        {/* Progress Indicator */}
        <div className="flex justify-between text-xs font-bold text-primary-400 uppercase tracking-widest mb-2 px-2">
          <span>{currentStep.type !== PuzzleType.END ? `Lesson ${currentStepIndex}` : 'Completed'}</span>
          <span>{currentStepIndex + 1} / {GAME_STEPS.length}</span>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`bg-white rounded-[2rem] shadow-xl border-2 border-primary-100 overflow-hidden relative ${errorShake ? 'animate-shake' : ''}`}
            style={{ minHeight: '400px' }}
          >
            {/* Top Image (Optional) */}
            {currentStep.image && (
              <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                <img src={currentStep.image} alt="Clue" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-10">
              <h2 className="font-serif text-3xl font-black text-primary-900 mb-6 text-center">
                {currentStep.title}
              </h2>

              {/* Main Content */}
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                {currentStep.content}
              </div>

              {/* Interaction Area */}
              {!isSuccess && (
                <div className="mt-8 pt-8 border-t border-primary-50">
                  {currentStep.question && (
                    <p className="font-bold text-lg text-primary-800 mb-2">{currentStep.question}</p>
                  )}

                  {currentStep.type === PuzzleType.INPUT && (
                    <PuzzleInput onSubmit={handleInputSubmit} />
                  )}

                  {currentStep.type === PuzzleType.MULTIPLE_CHOICE && currentStep.choices && (
                    <MultipleChoice choices={currentStep.choices} onSelect={handleChoiceSelect} />
                  )}

                  {currentStep.type === PuzzleType.CROSSWORD && (
                    <Crossword onComplete={() => setIsSuccess(true)} />
                  )}

                  {currentStep.type === PuzzleType.READING && (
                    <div className="mt-6 flex justify-center">
                      <button 
                         onClick={() => setIsSuccess(true)}
                         className="bg-primary-700 hover:bg-primary-800 text-white font-bold py-3 px-10 rounded-full transition-colors shadow-lg"
                      >
                        Begin
                      </button>
                    </div>
                  )}

                  {/* Hints & Tools */}
                  {currentStep.type !== PuzzleType.READING && currentStep.type !== PuzzleType.END && (
                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                      {currentStep.hint && (
                        <button 
                          onClick={() => setShowHint(!showHint)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors"
                        >
                          <Lightbulb size={16} />
                          {showHint ? "Hide Hint" : "View Hint"}
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors">
                         <Camera size={16} /> Scene Photo
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors">
                         <Map size={16} /> Map Navigation
                      </button>
                    </div>
                  )}
                  
                  {/* Hint Display */}
                  {showHint && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 bg-yellow-50 text-yellow-800 p-4 rounded-xl border border-yellow-200 text-sm flex gap-3 items-start"
                    >
                      <AlertCircle className="shrink-0 mt-0.5" size={16} />
                      <p>{currentStep.hint}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Success State */}
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle2 className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-green-800">Solved!</h3>
                  </div>
                  
                  {currentStep.historyReveal && (
                    <div className="text-slate-700 mb-6 bg-white/60 p-4 rounded-xl">
                      {currentStep.historyReveal}
                    </div>
                  )}

                  {!isLastStep && (
                    <button 
                      onClick={handleNext}
                      className="w-full bg-primary-900 hover:bg-primary-800 text-white text-lg font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Next Lesson <ArrowRight size={20} />
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}