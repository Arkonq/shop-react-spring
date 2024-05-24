import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  useGetCategoryQuery,
  useSaveCategoryMutation,
} from "../../app/store/api/MainApi.ts";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [saveCategory] = useSaveCategoryMutation();
  const { data: categoryData } = useGetCategoryQuery(id!, { skip: !id });
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!categoryData) return;

    setValue(categoryData.categoryName);
  }, [categoryData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await saveCategory({
        categoryId: id ? Number(id) : undefined,
        categoryName: value,
      }).unwrap();
      enqueueSnackbar("Changes saved", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      navigate("/categories");
    } catch (e: any) {
      enqueueSnackbar(e.data.description, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    }
  };

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography component="h6" variant="h5">
          {id ? "Edit Category" : "Add Category"}
        </Typography>
        <Button variant={"outlined"} onClick={() => navigate("/categories")}>
          Move to Categories
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="categoryName"
          label="Category Name"
          name="categoryName"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
          {id ? "Save" : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default CategoryEdit;
