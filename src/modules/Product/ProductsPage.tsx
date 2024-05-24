import Container from "@mui/material/Container";
import { useGetProductsQuery } from "../../app/store/api/MainApi.ts";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const { data: productsData } = useGetProductsQuery();

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
      <Grid container spacing={4}>
        {productsData?.map((product) => (
          <Grid item sm={6} xs={12} md={4}>
            <Link to={`/products/${product.id}`}>
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 160,
                      height: 160,
                    }}
                    image={product.image}
                    alt={product.title}
                  />
                  <Typography
                    component="h2"
                    variant="h5"
                    style={{ maxHeight: "28px", overflow: "hidden" }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {product.price} $
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    paragraph
                    style={{ maxHeight: "52px", overflow: "hidden" }}
                  >
                    {product.description}
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
