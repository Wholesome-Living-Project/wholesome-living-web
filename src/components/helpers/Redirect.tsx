import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  redirectRoute: string;
};

const Redirect = ({ redirectRoute }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const redirect = async (route: string) => {
      await router.push(route);
    };
    redirect(redirectRoute).then(() =>
      console.log("user has been redirected...")
    );
  }, [redirectRoute, router]);

  return null;
};

export default Redirect;
