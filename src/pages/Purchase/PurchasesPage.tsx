import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { selectUserId } from "../../app/store/slices/authSlice.ts";
import { useSelector } from "react-redux";
import { useGetPurchaseListQuery } from "../../app/store/api/MainApi.ts";
import { formatISODate } from "../../shared/utils/formatISODate.ts";

const PurchasesPage = () => {
  const userId = useSelector(selectUserId);
  // const { data: basketsData } = useGetPurchaseQuery(userId as number, {
  //   skip: !userId,
  // });
  const { data: basketsData } = useGetPurchaseListQuery();

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="md">
      <Typography component="h6" variant="h5">
        Purchases
      </Typography>
      <Grid container spacing={4}>
        {basketsData
          ?.filter((basket) => basket.userId === userId)
          .map((basket) => (
            <Grid item xs={12} key={basket.productId}>
              <Link to={`/products/${basket.productId}`}>
                <Card sx={{ display: "flex" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h6" variant="h6">
                      ProductId: {basket.productId}
                    </Typography>
                    <Typography color="text.secondary">
                      Quantity: {basket.count}
                    </Typography>
                    <Typography color="text.secondary">
                      Date: {formatISODate(basket.purchaseDate)}
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
