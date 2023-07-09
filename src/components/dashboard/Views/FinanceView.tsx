import FinanceGraph from "@/components/dashboard/Graphs/FinanceGraph";
import FinanceTable from "@/components/dashboard/Other/FinanceTable";
import { MainContentContainer } from "@/components/ui/MainContentContainer";
import { Flex } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FinanceView = () => {
  return (
    <FlexContainer>
      <MainContentContainer>
        <FinanceGraph />
        {/*<FinanceForm />*/}
        <FinanceTable />
      </MainContentContainer>
    </FlexContainer>
  );
};

export default FinanceView;
