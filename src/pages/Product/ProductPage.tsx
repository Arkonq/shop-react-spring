import Container from "@mui/material/Container";
import {
  useGetProductQuery,
  useSaveBasketMutation,
} from "../../app/store/api/MainApi.ts";
import { Box, Card, CardContent, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddCircleOutlined,
  ArrowLeft,
  RemoveCircleOutlined,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import { selectRole, selectUserId } from "../../app/store/slices/authSlice.ts";
import { useSelector } from "react-redux";
import { useState } from "react";

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const userId = useSelector(selectUserId);

  const [quantity, setQuantity] = useState(1);
  const { data: product } = useGetProductQuery(Number(id), { skip: !id });
  const [saveBasket] = useSaveBasketMutation();

  if (!product) return <></>;

  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft sx={{ p: 1, border: 1, borderRadius: 6 }} />
      </Button>
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography
                component="h2"
                variant="h5"
                style={{ maxHeight: "28px", overflow: "hidden" }}
              >
                {product.name}
              </Typography>
              <Typography color="text.secondary">{product.price}</Typography>
              <Typography
                paragraph
                style={{ maxHeight: "52px", overflow: "hidden" }}
              >
                {product.description}
              </Typography>
              <Typography color="text.secondary">
                Quantity: {product.count}
              </Typography>
              <Typography color="text.secondary">
                Seller: {product.user?.login}
              </Typography>
              {role === "BUYER" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "160px",
                    gap: "6px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => setQuantity(quantity + 1)}
                      sx={{ minWidth: "32px", flex: 1 }}
                    >
                      <AddCircleOutlined />
                    </IconButton>
                    <Box
                      sx={{
                        height: "28px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {quantity}
                    </Box>
                    <IconButton
                      onClick={() =>
                        setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)
                      }
                      sx={{ minWidth: "32px", flex: 1 }}
                    >
                      <RemoveCircleOutlined />
                    </IconButton>
                  </Box>
                  <Button
                    variant={"contained"}
                    onClick={() =>
                      saveBasket({
                        userId: userId!,
                        productId: product.productId!,
                        count: quantity,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
