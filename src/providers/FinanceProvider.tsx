import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FinanceCreateSpendingRequest,
  FinanceGetInvestmentResponse,
} from "@/api/openapi";
import { api } from "@/api/requests";
import { getLast7Days } from "@/components/helpers/getLast7Days";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { useOnboarding } from "@/providers/SettingsProvider";

type FinanceContentType = {
  saveSpending: (spending: FinanceCreateSpendingRequest) => Promise<void>;
  getSpendings: () => Promise<void>;
  spendings: FinanceGetInvestmentResponse[];
  aggregatedSpendings: number;
  aggregateSavings: number;
  resetFinanceData: () => void;
  spendingByWeekDay: { x: string; y: number }[];
  loading: boolean;
  totalSavings: number;
  spendingsByDate: SpendingsTableType[];
};

export type SpendingsTableType = {
  date: string;
  spent: number;
  saved: number;
  category: string;
};

const FinanceContext = createContext<FinanceContentType>(
  {} as FinanceContentType
);

export const useFinance = () => useContext(FinanceContext);

const useProvideFinance = (): FinanceContentType => {
  const [spendings, setSpendings] = useState<FinanceGetInvestmentResponse[]>(
    []
  );
  const { user } = useAuthentication();
  const { selectedStrategy, roundUpNumber } = useOnboarding();
  const [loading, setLoading] = useState(true);

  const getSaving = useCallback(
    (amount: number) => {
      if (!selectedStrategy || !roundUpNumber) return 0;
      switch (selectedStrategy) {
        case "Percent":
          return amount * (roundUpNumber / 100);
        case "Plus":
          return roundUpNumber;
        default:
          return Math.ceil(amount / roundUpNumber) * roundUpNumber - amount;
      }
    },
    [roundUpNumber, selectedStrategy]
  );

  const resetFinanceData = useCallback(async () => {
    setSpendings([]);
  }, []);

  const saveSpending = useCallback(
    async (spending: FinanceCreateSpendingRequest) => {
      if (!user?.id) return;
      if (!spending.amount) return;
      try {
        await api.financeApi.financePost(user?.id, {
          amount: spending.amount,
          saving: getSaving(spending.amount),
          description: spending.description,
          spendingTime: spending.spendingTime,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [getSaving, user?.id]
  );

  const getSpendings = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data } = await api.financeApi.financeGet(user?.id);
      // @ts-ignore
      data && setSpendings(data.reverse());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const aggregatedSpendings = useMemo(() => {
    let dailySpendings = 0;
    spendings.forEach(
      (spending) => spending.amount && (dailySpendings += spending.amount)
    );
    return dailySpendings;
  }, [spendings]);

  const aggregateSavings = useMemo(() => {
    let savings = 0;
    spendings.forEach((spending) => {
      const saving = spending.saving;
      if (saving) {
        savings += saving;
      }
    });
    return savings;
  }, [spendings]);

  const spendingByWeekDay = useMemo(() => {
    // Initiate an empty object to store the aggregates
    let aggregates: { [date: string]: number } = {};
    const dates = getLast7Days();

    // Initialize all dates with 0
    dates.forEach((date) => {
      aggregates[date.toISOString().slice(0, 10)] = 0;
    });

    // Filter investments within the last seven days
    spendings.forEach((investment) => {
      if (!investment.spendingTime) return;
      let investmentDate = new Date(investment.spendingTime * 1000); // assuming spendingTime is a Unix timestamp, it is converted to JavaScript timestamp by multiplying by 1000
      let dateStr = investmentDate.toISOString().slice(0, 10); // converting date to string format "YYYY-MM-DD"
      if (aggregates.hasOwnProperty(dateStr)) {
        aggregates[dateStr] += investment.amount || 0; // add the amount to the aggregate of the corresponding date
      }
    });

    let dayNames: { x: string; y: number }[] = [];

    for (let date in aggregates) {
      let day = new Date(date);
      let dayName = day.toLocaleDateString("en-US", { weekday: "short" }); // Change 'en-US' to your preferred locale if needed
      dayNames.push({ x: dayName, y: aggregates[date] });
    }

    return dayNames.reverse();
  }, [spendings]);

  const totalSavings = useMemo(() => {
    let savings = 0;
    spendings.forEach((spending) => {
      const saving = spending.saving;
      if (saving) {
        savings += saving;
      }
    });
    return savings;
  }, [spendings]);

  const spendingsByDate: SpendingsTableType[] = useMemo(() => {
    return spendings
      .sort((a, b) =>
        a.spendingTime && b.spendingTime ? b.spendingTime - a.spendingTime : 1
      )
      .map((spending) => {
        return {
          date: new Date(spending.spendingTime! * 1000).toLocaleDateString(),
          spent: spending.amount ?? 0,
          saved: spending.saving ?? 0,
          category: spending.description ?? "-",
        };
      });
  }, [spendings]);

  useEffect(() => {
    getSpendings();
  }, [getSpendings]);

  return {
    saveSpending,
    getSpendings,
    spendings,
    aggregateSavings,
    aggregatedSpendings,
    resetFinanceData,
    spendingByWeekDay,
    loading,
    totalSavings,
    spendingsByDate,
  };
};

export const FinanceProvider = ({ children }: PropsWithChildren) => {
  const providedFinanceProps = useProvideFinance();
  return (
    <>
      <FinanceContext.Provider value={providedFinanceProps}>
        {children}
      </FinanceContext.Provider>
    </>
  );
};
