import { useCallback, useEffect, useState } from "react";
import findResults from "../utils/switch";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
  httpEditLaunch,
} from "./requests";

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, setLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches();
    setLaunches(fetchedLaunches);
  }, []);

  useEffect(() => {
    getLaunches();
    console.log("launches are");
  }, [getLaunches]);

  const submitLaunch = useCallback(
    async (e) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.target);
      const launchdate = new Date(data.get("launch-day"));
      const mission = data.get("mission-name");
      const rocket = data.get("rocket-name");
      const target = data.get("planets-selector");
      const target_id = findResults(target);
      const flightnumber = null;
      const customers = null;
      const upcoming = true;
      const success = null;
      const response = await httpSubmitLaunch({
        flightnumber,
        customers,
        launchdate,
        mission,
        rocket,
        upcoming,
        success,
        target_id,
      });

      const fullfill = response.ok;
      if (fullfill) {
        getLaunches();
        setTimeout(() => {
          setPendingLaunch(false);
          onSuccessSound();
        }, 800);
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onSuccessSound, onFailureSound]
  );

  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunch(id);

      const success = response.ok;
      if (success) {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onAbortSound, onFailureSound]
  );

  const editLaunch = useCallback(
    async (id) => {
      const response = await httpEditLaunch(id);

      const success = response.ok;
      if (success) {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }
    },
    [getLaunches, onAbortSound, onFailureSound]
  );

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    editLaunch,
  };
}

export default useLaunches;
