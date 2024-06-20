import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectRole } from "../../../app/store/slices/authSlice.ts";
import { Link, useNavigate } from "react-router-dom";

const buttonProps: any = {
  variant: "outlined",
  sx: {
    bgcolor: "white",
    "&:hover": {
      background: "white",
    },
  },
};

export const Header = () => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const navigate = useNavigate();

  return (
    <AppBar component="header" sx={{ height: "48px", position: "relative" }}>
      <Container
        maxWidth="md"
        sx={{
          px: 2,
          py: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={"/products"}>
          <Typography variant="h5" component="h1" sx={{ color: "white" }}>
            Shop
          </Typography>
        </Link>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button {...buttonProps} onClick={() => navigate("/messages")}>
            Messages
          </Button>
          {role === "ADMIN" ? (
            <Button {...buttonProps} onClick={() => navigate("/categories")}>
              Categories
            </Button>
          ) : role === "SELLER" ? (
            <Button
              {...buttonProps}
              onClick={() => navigate("/seller-products")}
            >
              My Products
            </Button>
          ) : (
            <>
              <Button {...buttonProps} onClick={() => navigate("/basket")}>
                Basket
              </Button>
              <Button {...buttonProps} onClick={() => navigate("/purchases")}>
                Purchases
              </Button>
            </>
          )}
          <Button {...buttonProps} onClick={() => dispatch(clearAuth())}>
            Logout
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
