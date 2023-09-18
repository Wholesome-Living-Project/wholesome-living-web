import Redirect from "@/components/helpers/Redirect";
import { useUser } from "@/hooks/useUser";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import { useLoadingGuard } from "@/providers/LoadingGuardProvider";
import { PropsWithChildren } from "react";

const RequiresAuthentication = ({ children }: PropsWithChildren) => {
  const { user } = useAuthentication();
  const { hasIdInLocalStorage } = useUser();
  const { appIsReady } = useLoadingGuard();

  // don't remove the empty fragment for return -> will result in typescript undefined return error
  if (user?.id || hasIdInLocalStorage) return <>{children}</>;

  if (!appIsReady) return null;

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
