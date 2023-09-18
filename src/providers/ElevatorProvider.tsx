import {
  ElevatorCreateElevatorRequest,
  ElevatorElevatorDB,
} from "@/api/openapi";
import { api } from "@/api/requests";
import { getLast7Days } from "@/components/helpers/getLast7Days";
import { useUser } from "@/hooks/useUser";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ElevatorContentType = {
  saveElevatorSession: (
    elevatorSession: ElevatorCreateElevatorRequest
  ) => Promise<void>;
  getElevatorSessions: () => Promise<void>;
  elevatorSessions: ElevatorElevatorDB[];
  dailyStairs: { [key: string]: number };
  totalStairs: number;
  totalElevation: number;
  walkedElevation: number;
  resetElevatorData: () => void;
  heightByWeekDay: { x: string; y: number }[];
  stairsByWeekDay: { x: string; y: number }[];
};

const ElevatorContext = createContext<ElevatorContentType>(
  {} as ElevatorContentType
);

export const useElevator = () => useContext(ElevatorContext);

const useProvideElevator = (): ElevatorContentType => {
  const [elevatorSessions, setElevatorSessions] = useState<
    ElevatorElevatorDB[]
  >(
    //@ts-ignore
    []
  );
  const { user } = useUser();

  const saveElevatorSession = useCallback(
    async (elevatorSession: ElevatorCreateElevatorRequest) => {
      if (!user?.id) return;
      try {
        await api.elevatorApi.elevatorPost(user.id, {
          amountStairs: elevatorSession.amountStairs,
          stairs: elevatorSession.stairs,
          heightGain: elevatorSession.heightGain,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [user?.id]
  );

  const getElevatorSessions = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data } = await api.elevatorApi.elevatorGet(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        user.id,
        undefined
      );
      setElevatorSessions(data);
    } catch (e) {
      console.log(e);
    }
  }, [user?.id]);

  const resetElevatorData = useCallback(async () => {
    setElevatorSessions([]);
  }, []);

  useEffect(() => {
    getElevatorSessions();
  }, [getElevatorSessions]);

  const dailyStairs = useMemo(() => {
    if (elevatorSessions.length < 1) return {};
    let daily: { [date: string]: number } = {};

    elevatorSessions.forEach((session) => {
      if (!session.time) return;
      const date = new Date(session.time * 1000).toLocaleDateString();
      if (daily.hasOwnProperty(date)) {
        daily[date] += session.amountStairs ?? 0;
      } else {
        daily[date] = session.amountStairs ?? 0;
      }
    });
    return daily;
  }, [elevatorSessions]);

  const heightByWeekDay = useMemo(() => {
    // Initiate an empty object to store the aggregates
    let aggregates: { [date: string]: number } = {};
    const dates = getLast7Days();

    // Initialize all dates with 0
    dates.forEach((date) => {
      aggregates[date.toISOString().slice(0, 10)] = 0;
    });

    // Filter investments within the last seven days
    elevatorSessions.forEach((session) => {
      if (!session.time) return;
      let investmentDate = new Date(session.time * 1000); // assuming spendingTime is a Unix timestamp, it is converted to JavaScript timestamp by multiplying by 1000
      let dateStr = investmentDate.toISOString().slice(0, 10); // converting date to string format "YYYY-MM-DD"
      if (aggregates.hasOwnProperty(dateStr)) {
        aggregates[dateStr] += session.heightGain || 0; // add the amount to the aggregate of the corresponding date
      }
    });

    let dayNames: { x: string; y: number }[] = [];

    for (let date in aggregates) {
      let day = new Date(date);
      let dayName = day.toLocaleDateString("en-US", { weekday: "short" }); // Change 'en-US' to your preferred locale if needed
      dayNames.push({ x: dayName, y: aggregates[date] });
    }

    return dayNames.reverse();
  }, [elevatorSessions]);

  const stairsByWeekDay = useMemo(() => {
    // Initiate an empty object to store the aggregates
    let aggregates: { [date: string]: number } = {};
    const dates = getLast7Days();

    // Initialize all dates with 0
    dates.forEach((date) => {
      aggregates[date.toISOString().slice(0, 10)] = 0;
    });

    // Filter within the last seven days
    elevatorSessions.forEach((session) => {
      if (!session.time) return;
      let investmentDate = new Date(session.time * 1000);
      let dateStr = investmentDate.toISOString().slice(0, 10);
      if (aggregates.hasOwnProperty(dateStr)) {
        aggregates[dateStr] += session.amountStairs || 0;
      }
    });

    let dayNames: { x: string; y: number }[] = [];

    for (let date in aggregates) {
      let day = new Date(date);
      let dayName = day.toLocaleDateString("en-US", { weekday: "short" });
      dayNames.push({ x: dayName, y: aggregates[date] });
    }

    return dayNames.reverse();
  }, [elevatorSessions]);

  const totalStairs = useMemo(() => {
    if (elevatorSessions.length < 1) return 0;
    let total = 0;
    elevatorSessions.forEach((session) => {
      if (!session.amountStairs) return;
      total += session.amountStairs;
    });
    return total;
  }, [elevatorSessions]);

  const totalElevation = useMemo(() => {
    if (elevatorSessions.length < 1) return 0;
    let total = 0;
    elevatorSessions.forEach((session) => {
      if (!session.heightGain) return;
      total += session.heightGain;
    });
    return total;
  }, [elevatorSessions]);

  const walkedElevation = useMemo(() => {
    if (elevatorSessions.length < 1) return 0;
    let total = 0;
    elevatorSessions.forEach((session) => {
      if (!session.heightGain) return;
      total += session.stairs ? session.heightGain : 0;
    });
    return total;
  }, [elevatorSessions]);

  return {
    saveElevatorSession,
    getElevatorSessions,
    elevatorSessions,
    dailyStairs,
    totalStairs,
    totalElevation,
    walkedElevation,
    resetElevatorData,
    heightByWeekDay,
    stairsByWeekDay,
  };
};

export const ElevatorProvider = ({ children }: PropsWithChildren) => {
  const providedElevatorProps = useProvideElevator();
  return (
    <>
      <ElevatorContext.Provider value={providedElevatorProps}>
        {children}
      </ElevatorContext.Provider>
    </>
  );
};
