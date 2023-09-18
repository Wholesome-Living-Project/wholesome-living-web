import { AuthenticationProvider } from "@/providers/AuthenticationProvider";
import { FinanceProvider } from "@/providers/FinanceProvider";
import { OnboardingProvider } from "@/providers/SettingsProvider";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <OnboardingProvider>
        <FinanceProvider>{children}</FinanceProvider>
      </OnboardingProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
