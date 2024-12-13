import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCurrentTime } from "../services/timeService";

interface TimeContextProps {
  currentTime: string | null;
  error: string | null; 
}

/**
 * Context to provide the current time and error status throughout the application.
 *
 * Features:
 * - Fetches the current time from an external service.
 * - Automatically updates the time every 60 seconds.
 * - Handles errors when time cannot be fetched.
 */
const TimeContext = createContext<TimeContextProps | undefined>(undefined);

/**
 * Provider for Time Context.
 * - Fetches the current time on mount and updates it periodically.
 * - Provides `currentTime` and `error` to its children.
 *
 * @param {ReactNode} children - The child components to render within the provider.
 */
export const TimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = async () => {
      try {
        const time = await fetchCurrentTime();
        setCurrentTime(new Date(time).toLocaleString("en-GB")); // Format for Germany
        setError(null); 
      } catch {
        setError("Unable to fetch the current time. Please check your internet connection.");
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime, error }}>
      {children}
    </TimeContext.Provider>
  );
};

/**
 * Hook to use Time Context.
 * @throws {Error} if used outside of TimeProvider.
 * @returns {TimeContextProps} The current time and error status.
 */
export const useTime = (): TimeContextProps => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
};
