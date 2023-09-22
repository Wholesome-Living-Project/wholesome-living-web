import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { SettingsPluginName } from "@/api/openapi";
import { api } from "@/api/requests";
import { useUser } from "@/hooks/useUser";

type LevelContentType = {
  levelMap?: { [key in SettingsPluginName]: number };
  experienceMap?: { [key in SettingsPluginName]: number };
  getLevels: () => Promise<void>;
  currentlyInspectedPlugin?: SettingsPluginName;
  setCurrentlyInspectedPlugin: (plugin: SettingsPluginName) => void;
};

const LevelContext = createContext<LevelContentType>({} as LevelContentType);

export const useLevels = () => useContext(LevelContext);

const useProvideLevels = (): LevelContentType => {
  const [levelMap, setLevelMap] =
    useState<{ [key in SettingsPluginName]: number }>();
  const [experienceMap, setExperienceMap] =
    useState<{ [key in SettingsPluginName]: number }>();
  const [currentlyInspectedPlugin, setCurrentlyInspectedPlugin] =
    useState<SettingsPluginName>();

  const { user } = useUser();
  const getLevels = useCallback(async () => {
    try {
      if (!user?.id) return;
      const { data } = await api.levelApi.progressGet(user?.id);
      setLevelMap(data.level as { [key in SettingsPluginName]: number });
      setExperienceMap(
        data.experienceToNewLevel as { [key in SettingsPluginName]: number }
      );
    } catch (e) {
      console.log(e);
    }
  }, [user?.id]);

  useEffect(() => {
    getLevels();
  }, [getLevels]);

  return {
    experienceMap,
    levelMap,
    getLevels,
    currentlyInspectedPlugin,
    setCurrentlyInspectedPlugin,
  };
};

export const LevelProvider = ({ children }: PropsWithChildren) => {
  const providedLevelProps = useProvideLevels();
  return (
    <>
      <LevelContext.Provider value={providedLevelProps}>
        {children}
      </LevelContext.Provider>
    </>
  );
};
