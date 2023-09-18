import DashboardCardHeader from "@/components/dashboard/DashboardCardHeader";
import DashboardCard from "@/components/ui/DashboardCard";
import Table from "@/components/ui/Table";
import MeditationIcon from "@/components/ui/icons/MeditationIcon";
import { useMeditate } from "@/providers/MeditationProvider";
import { Inset } from "@radix-ui/themes";

type Props = {
  tableMaxHeight: number;
};
const MeditationHistory = ({ tableMaxHeight }: Props) => {
  const { meditationsByDate } = useMeditate();

  if (!meditationsByDate.length) return null;
  return (
    <DashboardCard>
      <DashboardCardHeader
        title={"Meditation History"}
        plugin={"meditation"}
        icon={<MeditationIcon fontSize={"small"} />}
        description={"All the meditations you have done so far"}
      />
      <Inset>
        <Table data={meditationsByDate} maxHeight={tableMaxHeight} />
      </Inset>
    </DashboardCard>
  );
};

export default MeditationHistory;
