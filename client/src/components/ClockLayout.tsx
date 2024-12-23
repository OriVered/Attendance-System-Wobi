import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTime } from "../context/TimeContext";
import TEXTS from "../consts/texts";

/**
 * A layout component that displays the current time (or an error message) at the top
 * and renders the child components below.
 *
 * Features:
 * - Displays the current time fetched from the `TimeContext`.
 * - Shows an error message if fetching the time fails.
 * - Supports responsive design with Material-UI components.
 *
 * Props:
 * @param {React.ReactNode} children - The child components to render within the layout.
 */
const ClockLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTime, error } = useTime();

  return (
    <Container maxWidth="sm" sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      {/* Display current time or error */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={2}
        flexDirection={{ xs: "column", sm: "row" }}
        textAlign="center"
      >
        {error ? (
          <Typography
            variant="h6"
            color="error"
            sx={{ mb: { xs: 1, sm: 0 }, mx: 1 }}
          >
            {TEXTS.CLOCK_LAYOUT.ERROR_MESSAGE}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{ mb: { xs: 1, sm: 0 }, mx: 1 }}
          >
            {`${TEXTS.CLOCK_LAYOUT.CURRENT_TIME_LABEL} ${currentTime}`}
          </Typography>
        )}
      </Box>

      {/* Render child components */}
      <Box mt={4}>{children}</Box>
    </Container>
  );
};

export default ClockLayout;
