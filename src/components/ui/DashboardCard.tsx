import { Card } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;
const DashboardCard = ({ children }: Props) => {
  return <Card>{children}</Card>;
};

export default DashboardCard;
