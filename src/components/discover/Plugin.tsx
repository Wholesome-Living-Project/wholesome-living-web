import { SettingsPluginName } from "@/api/openapi";
import PluginBanner from "@/components/discover/PluginBanner";
import { PLUGINS } from "@/helpers/pluginList";
import CashIcon from "@mui/icons-material/AttachMoney";
import MeditationIcon from "@mui/icons-material/SelfImprovement";
import StairsIcon from "@mui/icons-material/Stairs";
import { Flex } from "axelra-styled-bootstrap-grid";
import styled from "styled-components";

const Container = styled(Flex)`
  cursor: pointer;
`;

const Meditation = styled(MeditationIcon)`
  color: white;
`;

const Cash = styled(CashIcon)`
  color: white;
`;

const Stairs = styled(StairsIcon)`
  color: white;
`;

const Plugin = ({ plugin }: { plugin: SettingsPluginName }) => {
  return (
    <Container>
      <PluginBanner
        {...PLUGINS[plugin as SettingsPluginName]}
        size={50}
        icon={
          plugin === "meditation" ? (
            <Meditation />
          ) : plugin === "finance" ? (
            <Cash />
          ) : (
            <Stairs />
          )
        }
      />
    </Container>
  );
};

export default Plugin;
