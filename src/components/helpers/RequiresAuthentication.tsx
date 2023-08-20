import Redirect from "@/components/helpers/Redirect";
import { useUser } from "@/hooks/useUser";
import { useLoadingGuard } from "@/providers/LoadingGuardProvider";
import { Flex, SPACING } from "axelra-styled-bootstrap-grid";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const LoadingWrapper = styled(Flex)`
  padding: ${SPACING * 4}px 0;
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.md}px) {
    padding: ${SPACING * 12}px 0;
  }
  @media only screen and (min-width: ${(p) => p.theme.breakPoints.lg}px) {
    padding: ${SPACING * 20}px 0;
  }
`;

const RequiresAuthentication = ({ children }: PropsWithChildren) => {
  const { firebaseUser, hasIdInLocalStorage } = useUser();
  const { isInitialLoading } = useLoadingGuard();

  // don't remove the empty fragment for return -> will result in typescript undefined return error
  if (firebaseUser?.uid || hasIdInLocalStorage) return <>{children}</>;

  if (isInitialLoading) return null;

  // if user is not logged after initial load is done in redirect to home page and open login drawer
  if (!isInitialLoading && !firebaseUser?.uid) {
    return (
      <>
        <Redirect redirectRoute={"/"} />
      </>
    );
  }

  return null;
};

export default RequiresAuthentication;
