import { AuthenticationProvider } from "@/providers/AuthenticationProvider";
import { LoadingGuardProvider } from "@/providers/LoadingGuardProvider";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticationProvider>
      <LoadingGuardProvider>{children}</LoadingGuardProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
