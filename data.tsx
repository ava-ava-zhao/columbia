import React from 'react';
import { PuzzleStep, PuzzleType } from './types';

export const GAME_STEPS: PuzzleStep[] = [
  {
    id: 'intro-email',
    title: 'New Message',
    type: PuzzleType.READING,
    content: (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-inner font-mono text-sm leading-relaxed text-gray-700">
          <p className="border-b pb-2 mb-4">
            <span className="font-bold text-gray-900">Subject:</span> Ghost Seminar<br/>
            <span className="font-bold text-gray-900">From:</span> Unknown
          </p>
          <p>You have been enrolled in <strong>GHOST SEMINAR: A special topics course taught by former students.</strong></p>
          <p>This seminar has no classroom. Each lesson will be delivered somewhere on campus. Your instructors are no longer alive.</p>
          <p className="italic text-gray-600 border-l-2 border-primary-300 pl-3 my-4">
            "Over centuries, Columbia has shaped thinkers, rebels, presidents, poets, scientists, judges, and revolutionaries. Their bodies left the campus; their spirit did not."
          </p>
          <p>Your seminar begins today. There will be eight lessons. Each one taught by a different Columbia spirit. They will choose where to appear. Follow the signs.</p>
          <br/>
          <p className="animate-pulse text-red-700 font-bold">Class has begun. Step outside... if you dare.</p>
        </div>
      </div>
    ),
    historyReveal: "You step outside. Your phone buzzes with a notification from the Columbia Spectator Archives."
  },
  {
    id: 'stop-1-hamilton-identity',
    title: 'Stop 1: The First Instructor',
    type: PuzzleType.INPUT,
    content: "A notification pops up: An archival photo from 1955 Columbia Spectator. Read the red-boxed section. Who is our first instructor?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Alexander_Hamilton_portrait_by_John_Trumbull_1806.jpg/800px-Alexander_Hamilton_portrait_by_John_Trumbull_1806.jpg",
    question: "Guess the alumnus (Hint: A famous musical shares his name)",
    answer: "Hamilton",
    hint: "He is on the $10 bill.",
    historyReveal: (
      <div>
        <p className="font-serif font-bold text-lg mb-2">Correct. Your instructor is Alexander Hamilton.</p>
        <p>He still watches the campus he once walked. Find him.</p>
        <p className="mt-4 text-sm text-gray-600">Alexander Hamilton was one of the youngest Founding Fathers. He attended King's College (now Columbia) and shaped the US financial system. His statue sits in front of Hamilton Hall.</p>
      </div>
    )
  },
  {
    id: 'stop-1-hamilton-puzzle',
    title: 'Stop 1: Hamilton Hall',
    type: PuzzleType.INPUT,
    content: (
      <div>
        <p className="mb-4">Standing before Hamilton Hall, look up at the three crests/seals. Observe the text circles. Combine the text with these numbers to unlock the password:</p>
        <div className="bg-primary-100 p-4 rounded-md font-mono text-center text-primary-900 tracking-widest mb-4">
          (2,1,4) (3,1,2) (1,1,1)<br/>(1,2,8) (2,3,2) (3,4,1)
        </div>
        <p className="text-xs text-gray-500 italic">Format: (Crest #, Word #, Letter #)</p>
      </div>
    ),
    question: "Enter the secret word found in the crests:",
    answer: "vision",
    hint: "Look at the circular text on the outer ring of the crests.",
    historyReveal: (
      <div>
        <p className="mb-2">"Correct." A whisper passes your ear: <em className="serif text-primary-800">"Real liberty is neither found in despotism or the extremes of democracy, but in moderate governments."</em></p>
        <p className="text-sm">Lesson One complete. A nation needs structure, not just passion.</p>
      </div>
    )
  },
  {
    id: 'stop-2-kerouac',
    title: 'Stop 2: The Beat Soul',
    type: PuzzleType.INPUT,
    content: (
      <div>
        <p className="mb-4">Your next instructor taught America how to roam. Jack Kerouac lived in Wallach Hall (formerly Livingston). He wrote about looking out his window:</p>
        <blockquote className="italic border-l-4 border-primary-400 pl-4 my-4 text-gray-600 text-sm">
          "...overlooking the beautiful trees... and overlooking... the library itself... with the names engraved in stone forever: 'Goethe … Voltaire … Shakespeare … Molière … Dante.'"
        </blockquote>
        <p>Look at Butler Library from Wallach Hall. There is a factual error in his memory.</p>
      </div>
    ),
    question: "Which name did he wrongly claim to see from his window?",
    answer: "Dante",
    hint: "Walk to Wallach Hall. Can you actually see all those names? One is on the wrong side.",
    historyReveal: (
      <div>
        <p className="font-bold mb-2">Correct.</p>
        <p className="text-sm">Dante is engraved on the other side of Butler Library. Kerouac's memory wasn't perfect, much like his "Spontaneous Prose". <br/><br/><em>"Live, travel, adventure, bless, and don't be sorry."</em></p>
      </div>
    )
  },
  {
    id: 'stop-3-journalism',
    title: 'Stop 3: The Prize',
    type: PuzzleType.INPUT,
    content: "The screen shows a picture of a gold medal featuring Benjamin Franklin. It's the Pulitzer Prize medal. Based on this clue, find the next location.",
    question: "Where is the next class held?",
    answer: ["Journalism", "Journalism School", "Pulitzer Hall", "Journalism Building"],
    hint: "It's the building associated with the prize established by Joseph Pulitzer.",
    historyReveal: (
      <div>
        <p className="font-bold">Correct.</p>
        <p className="text-sm mt-2">Joseph Pulitzer endowed the Columbia Journalism School and the Pulitzer Prize. Even at night, the spirit of truth-seeking journalism echoes here.</p>
      </div>
    )
  },
  {
    id: 'stop-4-earl',
    title: 'Stop 4: Earl Hall',
    type: PuzzleType.INPUT,
    content: (
      <div>
        <p className="mb-4">At Earl Hall, a ghostly student stumbles, dropping a file folder containing the history of the Student Homophile League.</p>
        <p>Help him organize the file date. The papers are stamped with the date the first gay student organization in the US was recognized.</p>
      </div>
    ),
    question: "Enter the date (MMDDYYYY):",
    answer: "041967",
    hint: "April, 1967",
    historyReveal: (
      <div>
        <p className="font-bold">Correct. 04.19.1967</p>
        <p className="text-sm mt-2">"Equality doesn't appear on its own." This was the first Student Homophile League in the country. Earl Hall is a historic landmark for LGBT rights.</p>
      </div>
    )
  },
  {
    id: 'stop-5-pupin-ghost',
    title: 'Stop 5: The Engineering Ghost',
    type: PuzzleType.MULTIPLE_CHOICE,
    content: (
      <div>
        <p className="mb-4">You arrive at the Engineering terrace. A ghost is confused by the renovations.</p>
        <p className="italic text-gray-600 mb-4">He goes UP 1 floor, realizes it's wrong, then goes DOWN 3 floors.</p>
        <p>Based on the directory, where did he end up?</p>
      </div>
    ),
    choices: [
      { id: 'a', label: 'Applied Physics & Applied Mathematics' },
      { id: 'b', label: 'Computer Science' },
      { id: 'c', label: 'Industrial Engineering & Operations Research' },
      { id: 'd', label: 'Civil Engineering & Engineering Mechanics' },
    ],
    question: "Select the department:",
    answer: "d",
    hint: "Consider the movement relative to the lobby entrance.",
    historyReveal: (
      <div>
        <p className="font-bold">Correct.</p>
        <p className="text-sm mt-2">The ghost was Michael I. Pupin. He checks on the classrooms. Pupin Hall is also famous for the Manhattan Project experiments in the basement.</p>
      </div>
    )
  },
  {
    id: 'stop-6-alma-mater',
    title: 'Stop 6: The Guardian',
    type: PuzzleType.INPUT,
    content: (
      <div>
        <p className="mb-4">Final Lesson. Find the guardian who watches even when the campus sleeps.</p>
        <p>Approach the Alma Mater statue. Hidden within the folds of her academic robes is a small nocturnal animal.</p>
      </div>
    ),
    question: "What animal is hiding in the statue?",
    answer: "owl",
    hint: "It symbolizes wisdom.",
    historyReveal: (
      <div>
        <p className="font-bold">Correct. You found the Owl.</p>
        <p className="text-sm mt-2">Legend says the first freshman to find the owl will be the class valedictorian. Alma Mater says: "Knowledge is my gift to you; what you do with it is your gift to the world."</p>
      </div>
    )
  },
  {
    id: 'final-exam',
    title: 'Final Evaluation',
    type: PuzzleType.CROSSWORD,
    content: "If you have truly learned from the spirits, recall their names.",
    question: "Complete the crossword.",
    historyReveal: "Class dismissed."
  },
  {
    id: 'end',
    title: 'Seminar Complete',
    type: PuzzleType.END,
    content: (
      <div className="space-y-4">
        <p className="font-serif text-xl italic text-primary-800">"Columbia is not a school that follows history. It is a school that helps write it."</p>
        <p>The wind settles. The ghosts fade. But your history is just beginning.</p>
      </div>
    )
  }
];

export const CROSSWORD_DATA = {
  across: [
    { num: 2, clue: 'Nobel winner, "Architect of the Nuclear Age"', answer: 'FERMI' },
    { num: 5, clue: 'Author of "On the Road"', answer: 'KEROUAC' },
    { num: 6, clue: 'Amazon Founder', answer: 'BEZOS' },
    { num: 7, clue: 'First Treasury Secretary', answer: 'HAMILTON' },
    { num: 9, clue: 'Physics professor, namesake of a hall', answer: 'PUPIN' },
  ],
  down: [
    { num: 1, clue: 'Founder of Journalism School', answer: 'PULITZER' },
    { num: 2, clue: 'Supreme Court Justice (RBG)', answer: 'GINSBURG' },
    { num: 3, clue: 'Famous value investor', answer: 'BUFFETT' },
    { num: 4, clue: 'Former President of Peking University', answer: 'HUSHIH' },
    { num: 5, clue: '44th US President', answer: 'OBAMA' },
  ]
};
