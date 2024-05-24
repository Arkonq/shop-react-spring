import { useGetCategoriesQuery } from "../../app/store/api/MainApi.ts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const navigate = useNavigate();

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
          Categories
        </Typography>
        <Button
          variant={"outlined"}
          onClick={() => navigate("/categories/add")}
        >
          Add Category
        </Button>
      </Box>
      <Grid container spacing={4}>
        {categoriesData?.map((category) => (
          <Grid item xs={12} key={category.categoryId}>
            <Link to={`/categories/${category.categoryId}`}>
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h6" variant="h6">
                    {category.categoryName}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;
