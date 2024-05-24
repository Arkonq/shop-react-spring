import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth, selectRole } from "../../../app/store/slices/authSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../app/store/api/MainApi.ts";
import * as React from "react";

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
  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    skip: role !== "BUYER",
  });

  return (
    <AppBar component="header" sx={{ height: "48px" }}>
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
          {role === "ADMIN" ? (
            <Button {...buttonProps} onClick={() => navigate("/categories")}>
              Categories
            </Button>
          ) : role === "SELLER" ? (
            <Button
              {...buttonProps}
              onClick={() => navigate("/seller-products")}
            >
              Products
            </Button>
          ) : (
            <FormControl
              fullWidth
              margin={"normal"}
              sx={{ height: "40px", m: 0, p: 0 }}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId={"category-label"}
                id="categoryId"
                name={"categoryId"}
                required
                label="Category"
                sx={{ height: "40px" }}
              >
                {categoriesData?.map(({ categoryId, categoryName }) => (
                  <MenuItem value={categoryId}>{categoryName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button {...buttonProps} onClick={() => dispatch(clearAuth())}>
            Logout
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
