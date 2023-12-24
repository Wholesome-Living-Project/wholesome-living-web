import Redirect from "@/components/helpers/Redirect";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { useLoadingGuard } from "@/providers/LoadingGuardProvider";
import { PropsWithChildren } from "react";

const RequiresAuthentication = ({ children }: PropsWithChildren) => {
  const { user, currentFirebaseUser } = useAuthentication();
  const { appIsReady } = useLoadingGuard();

  if (!appIsReady) return null;

  // don't remove the empty fragment for return -> will result in typescript undefined return error
  if (user?.id && currentFirebaseUser) return <>{children}</>;

  // if user is not logged after initial load is done in redirect to home page and open login drawer
  if (appIsReady) {
    return (
      <>
        <Redirect redirectRoute={"/"} />
      </>
    );
  }

  return null;
};

export default RequiresAuthentication;
