import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTime } from "../context/TimeContext";
import TEXTS from "../consts/texts";

interface LayoutProps {
  children: React.ReactNode;
}

const ClockLayout: React.FC<LayoutProps> = ({ children }) => {
  const { currentTime, error } = useTime();

  return (
    <Container maxWidth="sm" sx={{ padding: { xs: 2, sm: 3, md: 4 } }}>
      {/* Clock Header */}
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
          currentTime && (
            <Typography
              variant="h6"
              sx={{ mb: { xs: 1, sm: 0 }, mx: 1 }}
            >
              {`${TEXTS.CLOCK_LAYOUT.CURRENT_TIME_LABEL} ${currentTime}`}
            </Typography>
          )
        )}
      </Box>

      {/* Child content */}
      <Box mt={4}>{children}</Box>
    </Container>
  );
};

export default ClockLayout;
