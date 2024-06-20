import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { selectUserId } from "../../app/store/slices/authSlice.ts";
import { useSelector } from "react-redux";
import { useGetPurchaseQuery } from "../../app/store/api/MainApi.ts";

const PurchasesPage = () => {
  const userId = useSelector(selectUserId);
  const { data: basketsData } = useGetPurchaseQuery(userId as number, {
    skip: !userId,
  });

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="md">
      <Typography component="h6" variant="h5">
        Purchases
      </Typography>
      <Grid container spacing={4}>
        {basketsData?.map((basket: any) => (
          <Grid item xs={12} key={basket.products[0].productId}>
            <Link to={`/products/${basket.products[0].productId}`}>
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h6" variant="h6">
                    {basket.products[0].name}
                  </Typography>
                  <Typography>
                    Category: {basket.products[0].category?.categoryName}
                  </Typography>
                  <Typography color="text.secondary">
                    Price: {basket.products[0].price}$
                  </Typography>
                  <Typography color="text.secondary">
                    Quantity: {basket.count}
                  </Typography>
                  <Typography color="text.secondary">
                    Total: {basket.total}$
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

export default PurchasesPage;
