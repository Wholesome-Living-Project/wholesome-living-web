import CashIcon from "@mui/icons-material/AttachMoney";
import { IconProps } from "@mui/material";
import styled from "styled-components";

type IconType = Omit<IconProps, "color"> & { color?: string };

const Icon = styled(CashIcon)<IconType>`
  color: ${(p) => p.color ?? "white"};
`;

const FinanceIcon = (props: IconType) => {
  return <Icon {...props} />;
};

export default FinanceIcon;
