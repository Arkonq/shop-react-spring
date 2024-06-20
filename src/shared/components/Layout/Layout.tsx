import { Header } from "../Header/Header.tsx";
import { Footer } from "../Footer/Footer.tsx";
import { Box } from "@mui/material";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Header />
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
};
