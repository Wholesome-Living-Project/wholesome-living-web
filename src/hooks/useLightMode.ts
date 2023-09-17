import { createContext, useContext } from "react";

type LightContextType = {
  lightMode: boolean;
  toggleLightMode: (lightMode: boolean) => void;
};

export const LightModeContext = createContext<LightContextType>({
  lightMode: true,
  toggleLightMode: () => {},
});

const UseLightMode = () => useContext(LightModeContext);
export default UseLightMode;
