import { UnstyledA } from "@/components/ui/UnstyledA";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = { href?: string } & PropsWithChildren;

const OptionalLink = ({ href, children }: Props) => {
  return href ? (
    <Link href={href} passHref legacyBehavior>
      <UnstyledA>{children}</UnstyledA>
    </Link>
  ) : (
    <>{children}</>
  );
};

export default OptionalLink;
