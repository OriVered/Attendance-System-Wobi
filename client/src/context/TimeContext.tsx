import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCurrentTime } from "../services/timeService";

interface TimeContextProps {
  currentTime: string | null;
  error: string | null; 
}

const TimeContext = createContext<TimeContextProps | undefined>(undefined);

export const TimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = async () => {
      try {
        const time = await fetchCurrentTime();
        setCurrentTime(new Date(time).toLocaleString("en-GB")); // Germany Format
        setError(null); 
      } catch {
        setError("Unable to fetch the current time. Please check your internet connection.");
        console.error("Failed to fetch current time.");
      }
    };

    updateTime(); // Update immediately on mount
    const intervalId = setInterval(updateTime, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime, error }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = (): TimeContextProps => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
};
