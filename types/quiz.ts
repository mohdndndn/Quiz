export type ScreenType =
  | 'age-select'
  | 'select'
  | 'info'
  | 'height-input'
  | 'weight-input'
  | 'loading'
  | 'results-summary'
  | 'results-metabolism'
  | 'results-graph'
  | 'results-transform'
  | 'social-proof-1'
  | 'social-proof-2';

export interface QuizOption {
  id: string;
  label: string;
  subtitle?: string;
  iconName: string;
}

export interface QuizAnswers {
  age?: string;
  ageLabel?: string;
  desire?: string;
  bodyAreas?: string[];
  weightGained?: string;
  diets?: string[];
  struggles?: string[];
  eatingBehaviors?: string[];
  exercise?: string[];
  ozempic?: string;
  heightFt?: number;
  heightIn?: number;
  heightCm?: number;
  heightUnit?: 'imperial' | 'metric';
  currentWeightLbs?: number;
  currentWeightKg?: number;
  goalWeightLbs?: number;
  goalWeightKg?: number;
  weightUnit?: 'imperial' | 'metric';
}
