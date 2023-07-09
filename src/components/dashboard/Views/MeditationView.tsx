import MeditationGraph from "@/components/dashboard/Graphs/MeditationGraph";
import MeditationTable from "@/components/dashboard/Other/MeditationTable";
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

const MeditationView = () => {
  return (
    <FlexContainer>
      <MainContentContainer>
        <MeditationGraph />
        <MeditationTable />
      </MainContentContainer>
    </FlexContainer>
  );
};

export default MeditationView;
