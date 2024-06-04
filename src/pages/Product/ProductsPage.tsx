import Container from "@mui/material/Container";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../../app/store/api/MainApi.ts";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ProductsPage = () => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: productsData } = useGetProductsQuery(
    categoryId ? { categoryId: categoryId } : {},
  );

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
      <FormControl fullWidth margin={"normal"}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId={"category-label"}
          id="categoryId"
          name={"categoryId"}
          required
          label="Category"
          value={categoryId}
          onChange={(e) => {
            e.preventDefault();
            setCategoryId(Number(e.target?.value) ?? null);
          }}
        >
          <MenuItem value={0} key={categoryId}>
            All
          </MenuItem>
          {categoriesData?.map(({ categoryId, categoryName }) => (
            <MenuItem value={categoryId} key={categoryId}>
              {categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={4}>
        {productsData?.map((product) => (
          <Grid item sm={6} xs={12} md={4}>
            <Link to={`/products/${product.productId}`}>
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    component="h2"
                    variant="h5"
                    style={{ maxHeight: "28px", overflow: "hidden" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography>
                    Category: {product.category?.categoryName}
                  </Typography>
                  <Typography color="text.secondary">
                    {product.price} $
                  </Typography>
                  <Typography
                    paragraph
                    style={{ maxHeight: "52px", overflow: "hidden" }}
                  >
                    {product.description}
                  </Typography>
                  <Typography color="text.secondary">
                    Seller: {product.user?.login}
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
