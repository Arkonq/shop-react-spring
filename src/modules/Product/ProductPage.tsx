import Container from "@mui/material/Container";
import { useGetProductQuery } from "../../app/store/api/MainApi.ts";
import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";
import Button from "@mui/material/Button";

export const ProductPage = () => {
  const { id } = useParams();
  const { data: product } = useGetProductQuery(Number(id), { skip: !id });
  const navigate = useNavigate();

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
              <Typography variant="subtitle1" color="text.secondary">
                {product.price}
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
        </Grid>
      </Grid>
    </Container>
  );
};
