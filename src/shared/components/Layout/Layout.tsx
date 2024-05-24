import { Header } from "../Header/Header.tsx";
import { Footer } from "../Footer/Footer.tsx";
import { Box } from "@mui/material";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
