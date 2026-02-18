import { QuizAnswers } from '@/types/quiz';

export function calculateBMI(answers: QuizAnswers): number | null {
  let weightKg: number | undefined;
  let heightCm: number | undefined;

  if (answers.weightUnit === 'imperial' && answers.currentWeightLbs) {
    weightKg = answers.currentWeightLbs * 0.453592;
  } else if (answers.currentWeightKg) {
    weightKg = answers.currentWeightKg;
  }

  if (answers.heightUnit === 'imperial' && answers.heightFt !== undefined) {
    const totalInches = (answers.heightFt * 12) + (answers.heightIn ?? 0);
    heightCm = totalInches * 2.54;
  } else if (answers.heightCm) {
    heightCm = answers.heightCm;
  }

  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function getBMIPosition(bmi: number): number {
  // Returns 0–100 representing position on BMI scale (18–40)
  const clamped = Math.min(Math.max(bmi, 18), 40);
  return ((clamped - 18) / 22) * 100;
}

export function getActualAge(ageLabel: string | undefined): number {
  if (!ageLabel) return 50;
  if (ageLabel.includes('40-44')) return 42;
  if (ageLabel.includes('45-49')) return 47;
  if (ageLabel.includes('50-54')) return 52;
  if (ageLabel.includes('55-59')) return 57;
  if (ageLabel.includes('60-64')) return 62;
  if (ageLabel.includes('65')) return 67;
  return 50;
}

export function calculateMetabolicAge(answers: QuizAnswers): number {
  const actualAge = getActualAge(answers.ageLabel);
  const bmi = calculateBMI(answers);
  if (!bmi) return actualAge + 8;
  const penalty = Math.max(0, Math.round((bmi - 22) * 2));
  return Math.min(actualAge + penalty, actualAge + 20);
}

export function getWeightInKg(answers: QuizAnswers): { current: number | null; goal: number | null } {
  let current: number | null = null;
  let goal: number | null = null;

  if (answers.weightUnit === 'imperial') {
    if (answers.currentWeightLbs) current = Math.round(answers.currentWeightLbs * 0.453592);
    if (answers.goalWeightLbs) goal = Math.round(answers.goalWeightLbs * 0.453592);
  } else {
    current = answers.currentWeightKg ?? null;
    goal = answers.goalWeightKg ?? null;
  }

  return { current, goal };
}

export function getWeightInLbs(answers: QuizAnswers): { current: number | null; goal: number | null } {
  let current: number | null = null;
  let goal: number | null = null;

  if (answers.weightUnit === 'metric') {
    if (answers.currentWeightKg) current = Math.round(answers.currentWeightKg * 2.20462);
    if (answers.goalWeightKg) goal = Math.round(answers.goalWeightKg * 2.20462);
  } else {
    current = answers.currentWeightLbs ?? null;
    goal = answers.goalWeightLbs ?? null;
  }

  return { current, goal };
}

export function getDisplayWeight(answers: QuizAnswers): { current: string; goal: string; unit: string } {
  if (answers.weightUnit === 'imperial') {
    return {
      current: answers.currentWeightLbs ? `${answers.currentWeightLbs}` : '—',
      goal: answers.goalWeightLbs ? `${answers.goalWeightLbs}` : '—',
      unit: 'lbs',
    };
  }
  return {
    current: answers.currentWeightKg ? `${answers.currentWeightKg}` : '—',
    goal: answers.goalWeightKg ? `${answers.goalWeightKg}` : '—',
    unit: 'kg',
  };
}
