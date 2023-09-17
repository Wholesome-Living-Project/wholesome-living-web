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
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { useOnboarding } from "@/providers/SettingsProvider";

type FinanceContentType = {
  saveSpending: (spending: FinanceCreateSpendingRequest) => Promise<void>;
  getSpendings: () => Promise<void>;
  spendings: FinanceGetInvestmentResponse[];
  aggregatedSpendings: number;
  aggregateSavings: number;
  resetFinanceData: () => void;
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

  useEffect(() => {
    console.log("getting spendings");
    getSpendings();
  }, [getSpendings]);

  return {
    saveSpending,
    getSpendings,
    spendings,
    aggregateSavings,
    aggregatedSpendings,
    resetFinanceData,
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
