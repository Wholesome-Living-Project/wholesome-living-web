import { useEffect, useMemo, useState } from "react";

// useWindowSize sometimes gives hidration error, this hook works better in those instances (next server has different html than client).
const UseDimensions = () => {
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  useEffect(() => {
    addEventListener("resize", () => setWidth(window.innerWidth));
    addEventListener("resize", () => setHeight(window.innerHeight));

    return () => {
      removeEventListener("resize", () => setWidth(window.innerWidth));
      removeEventListener("resize", () => setHeight(window.innerHeight));
    };
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return useMemo(() => {
    return { width, height };
  }, [height, width]);
};

export default UseDimensions;
