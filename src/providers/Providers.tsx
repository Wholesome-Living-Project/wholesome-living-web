import { AuthenticationProvider } from "@/providers/AuthenticationProvider";
import { FinanceProvider } from "@/providers/FinanceProvider";
import { LoadingGuardProvider } from "@/providers/LoadingGuardProvider";
import { OnboardingProvider } from "@/providers/SettingsProvider";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <OnboardingProvider>
        <FinanceProvider>
          <LoadingGuardProvider>{children}</LoadingGuardProvider>
        </FinanceProvider>
      </OnboardingProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
