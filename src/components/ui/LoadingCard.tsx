import DashboardCard from "@/components/ui/DashboardCard";
import { LoadingBG } from "@/components/ui/LoadingBG";
import { Inset } from "@radix-ui/themes";
import styled from "styled-components";

const LoadingContent = styled.div<{ height?: number }>`
  height: ${(p) => (p.height ? `${p.height}px` : "100%")};
  width: 100%;
  ${LoadingBG};
`;

const StyledInset = styled(Inset)`
  height: calc(100% + 22px);
  position: relative;
`;

type Props = {
  height?: number;
};
const LoadingCard = ({ height }: Props) => {
  return (
    <DashboardCard>
      <StyledInset>
        <LoadingContent height={height} />
      </StyledInset>
    </DashboardCard>
  );
};

export default LoadingCard;
