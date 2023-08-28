import PluginList from "@/components/discover/PluginList";
import { COLORS, FILTER_HEIGHT, OUTER_BORDER_RADIUS } from "@/theme/theme";
import { Col, Flex, SPACING } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";

const FlexContainer = styled(Flex)`
  height: 100%;
  position: relative;
  gap: ${SPACING * 2}px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterContainer = styled(Flex)`
  height: ${FILTER_HEIGHT}px;
  width: 100%;
  background-color: ${COLORS.WHITE};
  border-radius: ${OUTER_BORDER_RADIUS}px;
  flex-direction: column;
`;

const ContentContainer = styled(Flex)`
  padding: 0 ${SPACING * 1.5}px;
`;

const PluginContentContainer = styled(Flex)`
  padding: ${SPACING * 1.5}px;
`;

const Finance = () => {
  return (
    <FlexContainer>
      <Col xs={12} md={4}>
        <FilterContainer>
          <PluginContentContainer>
            <PluginList />
          </PluginContentContainer>
        </FilterContainer>
      </Col>
    </FlexContainer>
  );
};

export default Finance;
