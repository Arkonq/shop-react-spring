import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: "56px",
        py: 2,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Copyright © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};
