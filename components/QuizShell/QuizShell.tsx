'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { QuizAnswers, QuizOption } from '@/types/quiz';
import Header from '@/components/Header/Header';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import BottomPanel from '@/components/BottomPanel/BottomPanel';
import SelectScreen from '@/components/screens/SelectScreen/SelectScreen';
import InfoCardScreen from '@/components/screens/InfoCardScreen/InfoCardScreen';
import GLP1ChartScreen from '@/components/screens/GLP1ChartScreen/GLP1ChartScreen';
import HeightInputScreen from '@/components/screens/HeightInputScreen/HeightInputScreen';
import WeightInputScreen from '@/components/screens/WeightInputScreen/WeightInputScreen';
import LoadingScreen from '@/components/screens/LoadingScreen/LoadingScreen';
import ResultsSummaryScreen from '@/components/screens/ResultsSummaryScreen/ResultsSummaryScreen';
import ResultsMetabolismScreen from '@/components/screens/ResultsMetabolismScreen/ResultsMetabolismScreen';
import ResultsGraphScreen from '@/components/screens/ResultsGraphScreen/ResultsGraphScreen';
import ResultsTransformScreen from '@/components/screens/ResultsTransformScreen/ResultsTransformScreen';
import SocialProof1Screen from '@/components/screens/SocialProof1Screen/SocialProof1Screen';
import SocialProof2Screen from '@/components/screens/SocialProof2Screen/SocialProof2Screen';
import styles from './QuizShell.module.css';

const TOTAL_SCREENS = 21;

// ─── Question data ────────────────────────────────────────────────────────────

const AGE_OPTIONS: QuizOption[] = [
  { id: '40-44', label: '40–44', subtitle: 'When you first noticed things changing', iconName: 'PersonIcon' },
  { id: '45-49', label: '45–49', subtitle: 'When confidence started feeling harder to hold onto', iconName: 'PersonIcon' },
  { id: '50-54', label: '50–54', subtitle: 'When you realized your body stopped responding', iconName: 'PersonIcon' },
  { id: '55-59', label: '55–59', subtitle: 'When you started wondering if this is permanent', iconName: 'PersonIcon' },
  { id: '60-64', label: '60–64', subtitle: 'When you decided you deserve to feel good again', iconName: 'PersonIcon' },
  { id: '65-70+', label: '65–70+', subtitle: 'When you\'re ready to reclaim your energy and vitality', iconName: 'PersonIcon' },
];

const DESIRE_OPTIONS: QuizOption[] = [
  { id: 'feel-like-myself', label: 'Feel like myself again', iconName: 'HeartIcon' },
  { id: 'feel-confident', label: 'Feel confident when I walk into a room', iconName: 'StarIcon' },
  { id: 'stop-invisible', label: 'Stop feeling invisible', iconName: 'EyeIcon' },
  { id: 'have-energy', label: 'Have the energy I used to have', iconName: 'BoltIcon' },
  { id: 'feel-attractive', label: 'Feel attractive and noticed again', iconName: 'HeartIcon' },
  { id: 'stop-apologizing', label: 'Stop apologizing for how I look', iconName: 'StopIcon' },
];

const BODY_AREA_OPTIONS: QuizOption[] = [
  { id: 'face', label: 'Face', iconName: 'FaceIcon' },
  { id: 'arms', label: 'Arms', iconName: 'ArmIcon' },
  { id: 'stomach', label: 'Stomach', iconName: 'StomachIcon' },
  { id: 'hips-thighs', label: 'Hips and thighs', iconName: 'HipsIcon' },
  { id: 'whole-body', label: 'Whole body', iconName: 'WholeBodyIcon' },
];

const WEIGHT_GAIN_OPTIONS: QuizOption[] = [
  { id: 'yes', label: 'Yes', iconName: 'UpArrowIcon' },
  { id: 'no', label: 'No', iconName: 'CheckCircleIcon' },
];

const DIET_OPTIONS: QuizOption[] = [
  { id: 'keto', label: 'Keto', iconName: 'FoodIcon' },
  { id: 'fasting', label: 'Fasting', iconName: 'CalorieIcon' },
  { id: 'paleo', label: 'Paleo', iconName: 'LeafIcon' },
  { id: 'mediterranean', label: 'Mediterranean', iconName: 'FoodIcon' },
  { id: 'dash', label: 'DASH diet', iconName: 'FoodIcon' },
  { id: 'vegetarian-vegan', label: 'Vegetarian / Vegan', iconName: 'LeafIcon' },
  { id: 'calorie-counting', label: 'Calorie counting', iconName: 'ScaleIcon' },
  { id: 'other', label: 'Other', iconName: 'CheckCircleIcon' },
  { id: 'none', label: 'None', iconName: 'NoneIcon' },
];

const STRUGGLE_OPTIONS: QuizOption[] = [
  { id: 'weight-bounce', label: 'Weight bouncing back', iconName: 'BounceIcon' },
  { id: 'hunger-cravings', label: 'Hunger / cravings', iconName: 'CravingIcon' },
  { id: 'low-energy', label: 'Low energy', iconName: 'EnergyIcon' },
  { id: 'none', label: 'None', iconName: 'NoneIcon' },
];

const EATING_OPTIONS: QuizOption[] = [
  { id: 'overeat', label: 'Overeat', iconName: 'OvereatIcon' },
  { id: 'stress-eat', label: 'Stress eat', iconName: 'StressIcon' },
  { id: 'eat-irregularly', label: 'Eat irregularly', iconName: 'IrregularEatIcon' },
  { id: 'eat-fast-food', label: 'Eat fast food', iconName: 'FastFoodIcon' },
  { id: 'none', label: 'None of the above', iconName: 'NoneIcon' },
];

const EXERCISE_OPTIONS: QuizOption[] = [
  { id: 'cardio', label: 'Cardio (running, cycling, swimming)', iconName: 'CardioIcon' },
  { id: 'strength', label: 'Strength training / Weight lifting', iconName: 'DumbbellIcon' },
  { id: 'yoga-pilates', label: 'Yoga / Pilates', iconName: 'YogaIcon' },
  { id: 'walking', label: 'Walking / Light activities', iconName: 'WalkIcon' },
  { id: 'sports', label: 'Sports / Active hobbies', iconName: 'SportsIcon' },
  { id: 'none', label: 'None of the above', iconName: 'NoneIcon' },
];

const OZEMPIC_OPTIONS: QuizOption[] = [
  { id: 'yes-using', label: 'Yes, currently using', iconName: 'InjectionIcon' },
  { id: 'yes-stopped', label: 'Yes, tried before but stopped', iconName: 'PillIcon' },
  { id: 'no-considered', label: 'No, but I\'ve considered it', iconName: 'ThumbNeutralIcon' },
  { id: 'no-not-interested', label: 'No, not interested in injections', iconName: 'ThumbUpIcon' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggleMulti(current: string[], id: string, isNone: boolean): string[] {
  if (isNone) return current.includes(id) ? [] : [id];
  const withoutNone = current.filter((x) => x !== 'none');
  return withoutNone.includes(id)
    ? withoutNone.filter((x) => x !== id)
    : [...withoutNone, id];
}

// ─── Config per screen ────────────────────────────────────────────────────────

interface ScreenMeta {
  showHeader: boolean;
  showProgress: boolean;
  ctaLabel: string;
  ctaIsAlwaysEnabled: boolean;
}

function getScreenMeta(index: number): ScreenMeta {
  if (index === 14) {
    return { showHeader: false, showProgress: false, ctaLabel: '', ctaIsAlwaysEnabled: false };
  }
  if (index >= 15 && index <= 17) {
    return { showHeader: true, showProgress: false, ctaLabel: 'Continue', ctaIsAlwaysEnabled: true };
  }
  if (index === 18 || index === 20) {
    return { showHeader: true, showProgress: false, ctaLabel: 'CLAIM YOUR DISCOUNT', ctaIsAlwaysEnabled: true };
  }
  if (index === 19) {
    return { showHeader: true, showProgress: false, ctaLabel: 'Continue', ctaIsAlwaysEnabled: true };
  }
  // Info cards (8, 9, 11)
  if (index === 8 || index === 9 || index === 11) {
    return { showHeader: true, showProgress: true, ctaLabel: 'Continue', ctaIsAlwaysEnabled: true };
  }
  return { showHeader: true, showProgress: true, ctaLabel: 'Next', ctaIsAlwaysEnabled: false };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizShell() {
  const router = useRouter();
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<number, string[]>>({});

  const meta = getScreenMeta(screen);
  const progressPercent = ((screen) / TOTAL_SCREENS) * 100;

  // Derive selection state for current screen
  const currentSingle: string | undefined = (() => {
    switch (screen) {
      case 0: return answers.age;
      case 1: return answers.desire;
      case 3: return answers.weightGained;
      case 10: return answers.ozempic;
      default: return undefined;
    }
  })();

  const currentMulti: string[] = multiAnswers[screen] ?? [];

  const isNextEnabled = (() => {
    if (meta.ctaIsAlwaysEnabled) return true;
    // Single-select screens
    if ([0, 1, 3, 10].includes(screen)) return !!currentSingle;
    // Multi-select screens
    if ([2, 4, 5, 6, 7].includes(screen)) return currentMulti.length > 0;
    // Input screens
    if (screen === 12) {
      return answers.heightUnit === 'imperial'
        ? !!answers.heightFt
        : !!answers.heightCm;
    }
    if (screen === 13) {
      return answers.weightUnit === 'imperial'
        ? !!(answers.currentWeightLbs && answers.goalWeightLbs)
        : !!(answers.currentWeightKg && answers.goalWeightKg);
    }
    return false;
  })();

  const handleNext = useCallback(() => {
    if (screen === 20) {
      router.push('/results');
      return;
    }
    if (screen === 18) {
      router.push('/results');
      return;
    }
    setScreen((s) => s + 1);
  }, [screen, router]);

  const handleBack = useCallback(() => {
    if (screen > 0) setScreen((s) => s - 1);
  }, [screen]);

  const handleSingle = (questionKey: keyof QuizAnswers, value: string, extra?: Partial<QuizAnswers>) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value, ...extra }));
  };

  const handleMulti = (screenIdx: number, id: string) => {
    const isNone = id === 'none';
    setMultiAnswers((prev) => ({
      ...prev,
      [screenIdx]: toggleMulti(prev[screenIdx] ?? [], id, isNone),
    }));
    // Persist to answers
    const updated = toggleMulti(multiAnswers[screenIdx] ?? [], id, isNone);
    switch (screenIdx) {
      case 2: setAnswers((prev) => ({ ...prev, bodyAreas: updated })); break;
      case 4: setAnswers((prev) => ({ ...prev, diets: updated })); break;
      case 5: setAnswers((prev) => ({ ...prev, struggles: updated })); break;
      case 6: setAnswers((prev) => ({ ...prev, eatingBehaviors: updated })); break;
      case 7: setAnswers((prev) => ({ ...prev, exercise: updated })); break;
    }
  };

  const handleAnswerChange = (partial: Partial<QuizAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...partial }));
  };

  const renderScreen = () => {
    switch (screen) {
      // Screen 1: Age
      case 0:
        return (
          <SelectScreen
            title="What age group are you in?"
            options={AGE_OPTIONS}
            selectedIds={currentSingle ? [currentSingle] : []}
            isMulti={false}
            onToggle={(id) => {
              const opt = AGE_OPTIONS.find((o) => o.id === id);
              handleSingle('age', id, { ageLabel: opt?.label });
            }}
          />
        );

      // Screen 2: Desire
      case 1:
        return (
          <SelectScreen
            title="If you could change one thing about how you feel in your body, what would it be?"
            options={DESIRE_OPTIONS}
            selectedIds={currentSingle ? [currentSingle] : []}
            isMulti={false}
            onToggle={(id) => handleSingle('desire', id)}
          />
        );

      // Screen 3: Body Areas
      case 2:
        return (
          <SelectScreen
            title="Which areas of your body feel the most problematic?"
            subtitle="PLEASE SELECT ALL THAT APPLY"
            options={BODY_AREA_OPTIONS}
            selectedIds={currentMulti}
            isMulti={true}
            onToggle={(id) => handleMulti(2, id)}
          />
        );

      // Screen 4: Weight Gain
      case 3:
        return (
          <SelectScreen
            title="Have you gained weight in the last year?"
            options={WEIGHT_GAIN_OPTIONS}
            selectedIds={currentSingle ? [currentSingle] : []}
            isMulti={false}
            onToggle={(id) => handleSingle('weightGained', id)}
          />
        );

      // Screen 5: Diet Graveyard
      case 4:
        return (
          <SelectScreen
            title="What diets have you tried in the last year?"
            subtitle="PLEASE SELECT ALL THAT APPLY"
            options={DIET_OPTIONS}
            selectedIds={currentMulti}
            isMulti={true}
            onToggle={(id) => handleMulti(4, id)}
          />
        );

      // Screen 6: Struggles
      case 5:
        return (
          <SelectScreen
            title="Do you struggle with any of the following issues?"
            subtitle="PLEASE SELECT ALL THAT APPLY"
            options={STRUGGLE_OPTIONS}
            selectedIds={currentMulti}
            isMulti={true}
            onToggle={(id) => handleMulti(5, id)}
          />
        );

      // Screen 7: Eating Behaviors
      case 6:
        return (
          <SelectScreen
            title="Do you sometimes tend to..."
            subtitle="PLEASE SELECT ALL THAT APPLY"
            options={EATING_OPTIONS}
            selectedIds={currentMulti}
            isMulti={true}
            onToggle={(id) => handleMulti(6, id)}
          />
        );

      // Screen 8: Exercise
      case 7:
        return (
          <SelectScreen
            title="What best describes your exercise routine?"
            subtitle="PLEASE SELECT ALL THAT APPLY"
            options={EXERCISE_OPTIONS}
            selectedIds={currentMulti}
            isMulti={true}
            onToggle={(id) => handleMulti(7, id)}
          />
        );

      // Screen 9: Identity Crisis Info Card
      case 8:
        return <InfoCardScreen type="identity-crisis" />;

      // Screen 10: GLP-1 Chart
      case 9:
        return <GLP1ChartScreen />;

      // Screen 11: Ozempic Awareness
      case 10:
        return (
          <SelectScreen
            title="Have you ever tried GLP-1 medications like Ozempic, Wegovy, or Mounjaro?"
            options={OZEMPIC_OPTIONS}
            selectedIds={currentSingle ? [currentSingle] : []}
            isMulti={false}
            onToggle={(id) => handleSingle('ozempic', id)}
          />
        );

      // Screen 12: Why Solutions Fail Info Card
      case 11:
        return <InfoCardScreen type="why-solutions-fail" />;

      // Screen 13: Height Input
      case 12:
        return <HeightInputScreen answers={answers} onChange={handleAnswerChange} />;

      // Screen 14: Weight Input
      case 13:
        return <WeightInputScreen answers={answers} onChange={handleAnswerChange} />;

      // Screen 15: Loading
      case 14:
        return <LoadingScreen onComplete={() => setScreen(15)} />;

      // Screen 16: Results Summary
      case 15:
        return <ResultsSummaryScreen answers={answers} />;

      // Screen 17: Results Metabolism
      case 16:
        return <ResultsMetabolismScreen answers={answers} />;

      // Screen 18: Results Graph
      case 17:
        return <ResultsGraphScreen answers={answers} />;

      // Screen 19: Results Transform
      case 18:
        return <ResultsTransformScreen />;

      // Screen 20: Social Proof 1
      case 19:
        return <SocialProof1Screen />;

      // Screen 21: Social Proof 2
      case 20:
        return <SocialProof2Screen />;

      default:
        return null;
    }
  };

  const isLoadingScreen = screen === 14;

  return (
    <div className={styles.shell}>
      {meta.showHeader && (
        <>
          <Header
            onBack={handleBack}
            isFirstScreen={screen === 0}
            currentNumber={screen + 1}
            totalNumber={TOTAL_SCREENS}
          />
          {meta.showProgress && <ProgressBar percent={progressPercent} />}
        </>
      )}

      {renderScreen()}

      {!isLoadingScreen && meta.ctaLabel && (
        <BottomPanel
          onNext={handleNext}
          isEnabled={isNextEnabled}
          label={meta.ctaLabel}
        />
      )}
    </div>
  );
}
