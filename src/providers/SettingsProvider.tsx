import {
  SettingsNotificationType,
  SettingsPluginName,
  SettingsStrategyType,
} from "@/api/openapi";
import { api } from "@/api/requests";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "../hooks/useUser";

type OnboardingType = {
  chosenPlugins: SettingsPluginName[];
  setChosenPlugins: (st: SettingsPluginName[]) => void;
  visitedOnboardingSteps: string[];
  setVisitedOnboardingSteps: (st: string[]) => void;
  finishedPlugins: SettingsPluginName[];
  setFinishedPlugins: (st: SettingsPluginName[]) => void;
  setChosenPluginSteps: (st: string[]) => void;
  chosenPluginSteps: string[];
  selectedGoalTime: number;
  setSelectedGoalTime: (st: number) => void;
  selectedGoalNumber: number;
  setSelectedGoalNumber: (st: number) => void;
  selectedGoalPeriod: SettingsNotificationType;
  setSelectedGoalPeriod: (st: SettingsNotificationType) => void;
  meditateReminderNotification: boolean;
  setMeditateReminderNotification: (st: boolean) => void;
  financeSaveReminderNotification: boolean;
  setFinanceSaveReminderNotification: (st: boolean) => void;
  selectedStrategy: SettingsStrategyType;
  setSelectedStrategy: (st: SettingsStrategyType) => void;
  takeElevatorNotification: boolean;
  setTakeElevatorNotification: (st: boolean) => void;
  setRoundUpNumber: (st: number) => void;
  roundUpNumber: number;
  setElevatorSettings: () => void;
  setFinanceSettings: () => void;
  setMeditationSettings: () => void;
  setUserPlugins: () => Promise<void>;
  savingGoal: string;
  setSavingGoal: (st: string) => void;
  notificationPeriod: SettingsNotificationType;
  setNotificationPeriod: (st: SettingsNotificationType) => void;
  notificationFrequency: number;
  setNotificationFrequency: (st: number) => void;
  getSettings: () => void;
  setCoach: (st: number) => void;
  coach: number;
  loading: boolean;
  setClosedLevelExplanation: (st: boolean) => void;
  closedLevelExplanation: boolean;
};

const OnboardingContext = createContext<OnboardingType>({} as OnboardingType);

export const useOnboarding = () => useContext(OnboardingContext);

const useProvideOnboarding = (): OnboardingType => {
  const [chosenPlugins, setChosenPlugins] = useState<SettingsPluginName[]>([]);
  const [chosenPluginSteps, setChosenPluginSteps] = useState<string[]>([]);
  const [visitedOnboardingSteps, setVisitedOnboardingSteps] = useState<
    string[]
  >([]);
  const [finishedPlugins, setFinishedPlugins] = useState<SettingsPluginName[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [closedLevelExplanation, setClosedLevelExplanation] = useState(false);

  // meditation goal
  const [selectedGoalTime, setSelectedGoalTime] = useState(1);
  const [selectedGoalNumber, setSelectedGoalNumber] = useState(1);
  const [selectedGoalPeriod, setSelectedGoalPeriod] =
    useState<SettingsNotificationType>(
      SettingsNotificationType.NotificationTypeDay
    );
  const [meditateReminderNotification, setMeditateReminderNotification] =
    useState(false);

  // finance
  const [financeSaveReminderNotification, setFinanceSaveReminderNotification] =
    useState(false);
  const [selectedStrategy, setSelectedStrategy] =
    useState<SettingsStrategyType>(SettingsStrategyType.StrategyTypeRound);
  const [roundUpNumber, setRoundUpNumber] = useState(5);
  const [savingGoal, setSavingGoal] = useState<string>("");
  const [notificationPeriod, setNotificationPeriod] =
    useState<SettingsNotificationType>(
      SettingsNotificationType.NotificationTypeDay
    );
  const [notificationFrequency, setNotificationFrequency] = useState<number>(1);
  // elevator
  const [takeElevatorNotification, setTakeElevatorNotification] =
    useState(false);

  const [coach, setCoach] = useState<number>(0);

  const { user } = useUser();

  const setUserPlugins = useCallback(async () => {
    if (!user?.id) return;
    try {
      await api.settingsApi.settingsPost(user?.id, {
        enabledPlugins: chosenPlugins,
        finance: {
          notifications: financeSaveReminderNotification,
          amountNotifications: notificationFrequency,
          investmentGoal: 0,
          investmentTimeGoal: 1,
          strategyAmount: roundUpNumber || 0,
          strategy: selectedStrategy,
          periodNotifications: notificationPeriod,
        },
        meditation: {
          notifications: meditateReminderNotification,
          amountNotifications: selectedGoalNumber,
          periodNotifications: selectedGoalPeriod,
          meditationTimeGoal: selectedGoalTime,
        },
        elevator: {
          notifications: takeElevatorNotification,
          amountNotifications: 0,
          goal: 0,
          periodNotifications: SettingsNotificationType.NotificationTypeDay,
        },
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }, [
    chosenPlugins,
    financeSaveReminderNotification,
    meditateReminderNotification,
    notificationFrequency,
    notificationPeriod,
    roundUpNumber,
    selectedGoalNumber,
    selectedGoalPeriod,
    selectedGoalTime,
    selectedStrategy,
    takeElevatorNotification,
    user?.id,
  ]);

  const setElevatorSettings = useCallback(async () => {
    if (!user?.id) return;
    try {
      await api.settingsApi.settingsElevatorPut(user?.id, {
        notifications: takeElevatorNotification,
        amountNotifications: 0,
        goal: 0,
        periodNotifications: SettingsNotificationType.NotificationTypeDay,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }, [takeElevatorNotification, user?.id]);

  const setFinanceSettings = useCallback(async () => {
    if (!user?.id || !Number(savingGoal)) return;
    try {
      await api.settingsApi.settingsFinancePut(user?.id, {
        notifications: financeSaveReminderNotification,
        amountNotifications: notificationFrequency,
        investmentGoal: Number(savingGoal),
        investmentTimeGoal: 1,
        strategyAmount: roundUpNumber || 0,
        strategy: selectedStrategy,
        periodNotifications: notificationPeriod,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }, [
    financeSaveReminderNotification,
    notificationFrequency,
    notificationPeriod,
    roundUpNumber,
    savingGoal,
    selectedStrategy,
    user?.id,
  ]);

  const setMeditationSettings = useCallback(async () => {
    if (!user?.id) return;
    try {
      await api.settingsApi.settingsMeditationPut(user?.id, {
        notifications: meditateReminderNotification,
        amountNotifications: selectedGoalNumber,
        periodNotifications: selectedGoalPeriod,
        meditationTimeGoal: selectedGoalTime,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  }, [
    meditateReminderNotification,
    selectedGoalNumber,
    selectedGoalPeriod,
    selectedGoalTime,
    user?.id,
  ]);

  const getSettings = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data } = await api.settingsApi.settingsGet(user.id);
      if (data) {
        data.enabledPlugins && setChosenPlugins(data.enabledPlugins);

        data.meditation?.meditationTimeGoal &&
          setSelectedGoalTime(data.meditation.meditationTimeGoal);

        data.meditation?.notifications &&
          setMeditateReminderNotification(data.meditation.notifications);

        data.meditation?.periodNotifications &&
          setSelectedGoalPeriod(data.meditation.periodNotifications);

        data.meditation?.amountNotifications &&
          setSelectedGoalNumber(data.meditation.amountNotifications);

        data.finance?.notifications &&
          setFinanceSaveReminderNotification(data.finance.notifications);

        data.finance?.strategy && setSelectedStrategy(data.finance.strategy);

        data.finance?.strategyAmount &&
          setRoundUpNumber(data.finance.strategyAmount);
        data.finance?.investmentGoal &&
          setSavingGoal(String(data.finance.investmentGoal));

        data.finance?.periodNotifications &&
          setNotificationPeriod(data.finance.periodNotifications);
        data.finance?.amountNotifications &&
          setNotificationFrequency(data.finance.amountNotifications);
        data.elevator?.notifications &&
          setTakeElevatorNotification(data.elevator.notifications);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  return {
    chosenPlugins,
    setChosenPlugins,
    visitedOnboardingSteps,
    setVisitedOnboardingSteps,
    finishedPlugins,
    setFinishedPlugins,
    setChosenPluginSteps,
    chosenPluginSteps,
    selectedGoalTime,
    setSelectedGoalTime,
    selectedGoalNumber,
    setSelectedGoalNumber,
    selectedGoalPeriod,
    setSelectedGoalPeriod,
    meditateReminderNotification,
    setMeditateReminderNotification,
    financeSaveReminderNotification,
    setFinanceSaveReminderNotification,
    selectedStrategy,
    setSelectedStrategy,
    takeElevatorNotification,
    setTakeElevatorNotification,
    setRoundUpNumber,
    roundUpNumber,
    setElevatorSettings,
    setFinanceSettings,
    setMeditationSettings,
    setUserPlugins,
    savingGoal,
    setSavingGoal,
    notificationPeriod,
    setNotificationPeriod,
    notificationFrequency,
    setNotificationFrequency,
    getSettings,
    setCoach,
    coach,
    loading,
    setClosedLevelExplanation,
    closedLevelExplanation,
  };
};

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const providedOnboardingProps = useProvideOnboarding();
  return (
    <>
      <OnboardingContext.Provider value={providedOnboardingProps}>
        {children}
      </OnboardingContext.Provider>
    </>
  );
};
