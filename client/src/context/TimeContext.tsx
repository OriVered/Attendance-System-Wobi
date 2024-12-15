import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCurrentTime } from "../services/timeService";
import TEXTS from "../consts/texts";

/**
 * Context to provide the current time and error status throughout the application.
 *
 * Features:
 * - Fetches the current time from an external service.
 * - Automatically updates the time every 60 seconds.
 * - Handles errors when the time cannot be fetched.
 */
interface TimeContextProps {
  currentTime: string | null; // The current time in a formatted string.
  error: string | null; // Error message if fetching the time fails.
}

// Create the Time Context
const TimeContext = createContext<TimeContextProps | undefined>(undefined);

/**
 * Provider for Time Context.
 *
 * Features:
 * - Fetches the current time on mount and provides it via context.
 * - Automatically updates the current time every 60 seconds.
 * - Handles and stores any errors that occur during the fetch process.
 *
 * Props:
 * @param {ReactNode} children - The child components to render within the provider.
 */
export const TimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState<string | null>(null); // State to store the current time.
  const [error, setError] = useState<string | null>(null); // State to store error messages.

  useEffect(() => {
    /**
     * Fetches the current time from the external service and updates state.
     * - Sets the `currentTime` state to the fetched time.
     * - Clears the `error` state if the fetch is successful.
     * - Sets an error message if the fetch fails.
     */
    const updateTime = async () => {
      try {
        const time = await fetchCurrentTime();
        setCurrentTime(new Date(time).toLocaleString("en-GB")); // Format as "day/month/year hour:minute:second"
        setError(null); // Clear any previous error.
      } catch {
        setError(TEXTS.CLOCK_LAYOUT.ERROR_MESSAGE); // Use centralized error message
      }
    };

    updateTime(); // Fetch time immediately on mount.

    // Set an interval to update the time every 60 seconds.
    const intervalId = setInterval(updateTime, 60000);

    // Cleanup the interval on unmount.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime, error }}>
      {children}
    </TimeContext.Provider>
  );
};

/**
 * Hook to use the Time Context.
 *
 * Features:
 * - Provides the current time and error status from the Time Context.
 * - Ensures the hook is used within a `TimeProvider`.
 *
 * @returns {TimeContextProps} The current time and error status.
 * @throws {Error} If the hook is used outside of a `TimeProvider`.
 */
export const useTime = (): TimeContextProps => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error(TEXTS.CLOCK_LAYOUT.ERROR_MESSAGE); // Use centralized error message
  }
  return context;
};
