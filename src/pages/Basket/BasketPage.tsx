import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { selectUserId } from "../../app/store/slices/authSlice.ts";
import { useSelector } from "react-redux";
import {
  useBuyBasketMutation,
  useGetBasketQuery,
} from "../../app/store/api/MainApi.ts";

const BasketPage = () => {
  const userId = useSelector(selectUserId);
  const { data: basketsData } = useGetBasketQuery(userId as number, {
    skip: !userId,
  });
  const [buyBasket] = useBuyBasketMutation();

  return (
    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="md">
      <Typography component="h6" variant="h5">
        Basket
      </Typography>
      <Grid container spacing={4}>
        {basketsData?.map((basket) => (
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
                  <Button
                    variant={"contained"}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      buyBasket({
                        userId: userId!,
                        basketId: basket.basketId,
                        productId: basket.products[0]?.productId ?? -1,
                      });
                    }}
                  >
                    Buy
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BasketPage;
