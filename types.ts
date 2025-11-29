import React from 'react';

export enum PuzzleType {
  READING = 'READING',
  INPUT = 'INPUT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  CROSSWORD = 'CROSSWORD',
  END = 'END'
}

export interface PuzzleStep {
  id: string;
  title: string;
  content: string | React.ReactNode;
  type: PuzzleType;
  question?: string;
  answer?: string | string[]; // Can be a string or array of acceptable strings
  choices?: { id: string; label: string }[];
  hint?: string;
  historyReveal?: string | React.ReactNode; // Content shown AFTER correct answer
  image?: string;
}

export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  clue: string;
  answer: string;
}