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
import { useGetProductsQuery } from "../../app/store/api/MainApi.ts";
import { useSelector } from "react-redux";
import { selectUserId } from "../../app/store/slices/authSlice.ts";
import { ProductImage } from "./ProductImage.tsx";

const SellerProducts = () => {
  const userId = useSelector(selectUserId);
  const { data: productsData } = useGetProductsQuery(
    { userId: userId! },
    { skip: !userId },
  );
  const navigate = useNavigate();

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography component="h6" variant="h5">
          Seller Products
        </Typography>
        <Button
          variant={"outlined"}
          onClick={() => navigate("/seller-products/add")}
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={4}>
        {productsData?.map((product) => (
          <Grid item xs={12} key={product.productId}>
            <Link to={`/seller-products/${product.productId}`}>
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <ProductImage productId={product.productId!} />
                  <Typography component="h6" variant="h6">
                    {product.name}
                  </Typography>
                  <Typography>
                    Category: {product.category?.categoryName}
                  </Typography>
                  <Typography>Description: {product.description}</Typography>
                  <Typography>Price: {product.price}$</Typography>
                  <Typography>Quantity: {product.count}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SellerProducts;
