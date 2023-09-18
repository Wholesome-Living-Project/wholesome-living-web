import { AuthenticationProvider } from "@/providers/AuthenticationProvider";
import { ElevatorProvider } from "@/providers/ElevatorProvider";
import { FinanceProvider } from "@/providers/FinanceProvider";
import { MeditationProvider } from "@/providers/MeditationProvider";
import { OnboardingProvider } from "@/providers/SettingsProvider";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <OnboardingProvider>
        <MeditationProvider>
          <ElevatorProvider>
            <FinanceProvider>{children}</FinanceProvider>
          </ElevatorProvider>
        </MeditationProvider>
      </OnboardingProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
