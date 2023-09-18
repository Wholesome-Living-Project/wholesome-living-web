import DashboardCardHeader from "@/components/dashboard/DashboardCardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import Table from "@/components/ui/Table";
import FinanceIcon from "@/components/ui/icons/FinanceIcon";
import { useFinance } from "@/providers/FinanceProvider";
import { Inset } from "@radix-ui/themes";

type Props = {
  tableMaxHeight: number;
};
const FinanceHistory = ({ tableMaxHeight }: Props) => {
  const { spendingsByDate } = useFinance();

  if (!spendingsByDate.length) return null;
  return (
    <DashboardCard>
      <DashboardCardHeader
        title={"Spending History"}
        plugin={"finance"}
        icon={<FinanceIcon fontSize={"small"} />}
        description={"All the money you have spend so far"}
      />
      <Inset>
        <Table data={spendingsByDate} maxHeight={tableMaxHeight} />
      </Inset>
    </DashboardCard>
  );
};

export default FinanceHistory;
