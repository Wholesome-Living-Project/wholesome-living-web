import Redirect from "@/components/helpers/Redirect";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { useLoadingGuard } from "@/providers/LoadingGuardProvider";
import { PropsWithChildren } from "react";

export const RedirectIfAuthenticated = ({ children }: PropsWithChildren) => {
  const { user } = useAuthentication();
  const { appIsReady } = useLoadingGuard();

  // don't remove the empty fragment for return -> will result in typescript undefined return error
  if (!user?.id) return <>{children}</>;

  if (!appIsReady) return null;

  // if user is not logged after initial load is done in redirect to home page and open login drawer
  // TODO add UI feedback for redirecting
  if (appIsReady && user?.id) {
    return (
      <>
        <Redirect redirectRoute={"/app"} />
      </>
    );
  }

  return null;
};
