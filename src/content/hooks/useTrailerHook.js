import { useCallback, useState } from "react";
import { getTrailerData } from "../apisConnections/getTrailerData";

export default function useTrailerHook() {
  const [trailer, setTrailer] = useState(null);

  const getTrailer = useCallback(async (id, type) => {
    const trailerData = await getTrailerData(id, type);
    if (trailerData?.length > 0)
      setTrailer(trailerData.filter((e) => e.type === "Trailer")[0]?.key);
    else setTrailer(null);
  }, []);
  return { trailer, getTrailer };
}
