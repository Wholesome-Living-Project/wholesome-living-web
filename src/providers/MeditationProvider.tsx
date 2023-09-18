import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MeditationMeditationDB } from "@/api/openapi";
import { api } from "@/api/requests";
import { getLast7Days } from "@/components/helpers/getLast7Days";
import { getUnixTime } from "@/helpers/getUnixTime";
import { useUser } from "../hooks/useUser";

type MeditationContentType = {
  timerDifference: number;
  setTimerDifference: (st: number) => void;
  saveMeditation: (meditationTime: number) => void;
  getMeditations: () => Promise<void>;
  meditations: MeditationMeditationDB[];
  resetMeditationData: () => void;
  meditationByWeekDay: { x: string; y: number }[];
  totalMeditationTime: number;
  meditationsByDate: MeditationTableType[];
  totalMeditationLastWeek: number;
};

const MeditateContext = createContext<MeditationContentType>(
  {} as MeditationContentType
);

export type MeditationTableType = {
  date: string;
  time: number;
};

export const useMeditate = () => useContext(MeditateContext);

const useProvideMeditate = (): MeditationContentType => {
  const [timerDifference, setTimerDifference] = useState(60);

  const [meditations, setMeditations] = useState<MeditationMeditationDB[]>(
    //@ts-ignore
    []
  );
  const { user } = useUser();

  const saveMeditation = useCallback(
    async (meditationTime: number) => {
      if (!user?.id) return;

      try {
        await api.meditationApi.meditationPost(user.id, {
          meditationTime: meditationTime,
          endTime: getUnixTime(),
        });
      } catch (e) {
        console.log(e);
      }
    },
    [user?.id]
  );

  const resetMeditationData = useCallback(async () => {
    setMeditations([]);
  }, []);

  const getMeditations = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data } = await api.meditationApi.meditationGet();
      setMeditations(data);
    } catch (e) {
      console.log(e);
    }
  }, [user?.id]);

  const meditationByWeekDay = useMemo(() => {
    // Initiate an empty object to store the aggregates
    let aggregates: { [date: string]: number } = {};
    const dates = getLast7Days();

    // Initialize all dates with 0
    dates.forEach((date) => {
      aggregates[date.toISOString().slice(0, 10)] = 0;
    });

    // Filter investments within the last seven days
    meditations.forEach((meditation) => {
      if (!meditation.endTime) return;
      let investmentDate = new Date(meditation.endTime * 1000); // assuming spendingTime is a Unix timestamp, it is converted to JavaScript timestamp by multiplying by 1000
      let dateStr = investmentDate.toISOString().slice(0, 10); // converting date to string format "YYYY-MM-DD"
      if (aggregates.hasOwnProperty(dateStr)) {
        aggregates[dateStr] += meditation.meditationTime || 0; // add the amount to the aggregate of the corresponding date
      }
    });

    let dayNames: { x: string; y: number }[] = [];

    for (let date in aggregates) {
      let day = new Date(date);
      let dayName = day.toLocaleDateString("en-US", { weekday: "short" }); // Change 'en-US' to your preferred locale if needed
      dayNames.push({ x: dayName, y: aggregates[date] });
    }

    return dayNames.reverse();
  }, [meditations]);

  const totalMeditationTime = useMemo(() => {
    let totalMeditationTime = 0;
    meditations.forEach(
      (meditation) =>
        meditation.meditationTime &&
        (totalMeditationTime += meditation.meditationTime)
    );
    return totalMeditationTime;
  }, [meditations]);

  const meditationsByDate: MeditationTableType[] = useMemo(() => {
    return meditations
      .sort((a, b) => (a.endTime && b.endTime ? b.endTime - a.endTime : 1))
      .map((meditation) => {
        return {
          date: new Date(meditation.endTime! * 1000).toLocaleDateString(),
          time: meditation.meditationTime ?? 0,
        };
      });
  }, [meditations]);

  const totalMeditationLastWeek = useMemo(() => {
    let totalMeditationTime = 0;
    meditations.forEach(
      (meditation) =>
        meditation.meditationTime &&
        (totalMeditationTime += meditation.meditationTime)
    );
    return totalMeditationTime;
  }, [meditations]);

  useEffect(() => {
    getMeditations();
  }, [getMeditations]);

  return {
    timerDifference,
    setTimerDifference,
    saveMeditation,
    getMeditations,
    meditations,
    resetMeditationData,
    meditationByWeekDay,
    totalMeditationTime,
    meditationsByDate,
    totalMeditationLastWeek,
  };
};

export const MeditationProvider = ({ children }: PropsWithChildren) => {
  const providedMeditateProps = useProvideMeditate();
  return (
    <>
      <MeditateContext.Provider value={providedMeditateProps}>
        {children}
      </MeditateContext.Provider>
    </>
  );
};
