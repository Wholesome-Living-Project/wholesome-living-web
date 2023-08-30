import { useMemo } from "react";
import { useTheme } from "styled-components";
import useDimensions from "./useDimensions";

const useBreakPoints = () => {
  const { width } = useDimensions();
  const theme = useTheme();

  const isMobile = useMemo(() => {
    return Boolean(width && width <= theme.breakPoints.sm);
  }, [theme.breakPoints.sm, width]);

  const isLessThanMedium = useMemo(() => {
    return Boolean(width && width <= theme.breakPoints.md);
  }, [theme.breakPoints.md, width]);

  const isLessThanLarge = useMemo(() => {
    return Boolean(width && width <= theme.breakPoints.lg);
  }, [theme.breakPoints.lg, width]);

  const isLessThanExtraLarge = useMemo(() => {
    return Boolean(width && width <= theme.breakPoints.xl);
  }, [theme.breakPoints.xl, width]);

  const isLessThanLargest = useMemo(() => {
    return Boolean(width && width <= theme.breakPoints.xxl);
  }, [theme.breakPoints.xxl, width]);

  return useMemo(() => {
    return {
      isMobile,
      isLessThanMedium,
      isLessThanLarge,
      isLessThanExtraLarge,
      isLessThanLargest,
    };
  }, [
    isLessThanExtraLarge,
    isLessThanLarge,
    isLessThanLargest,
    isLessThanMedium,
    isMobile,
  ]);
};

export default useBreakPoints;
