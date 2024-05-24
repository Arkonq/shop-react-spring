import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  ProductVM,
  useGetCategoriesQuery,
  useGetProductQuery,
  useSaveProductMutation,
} from "../../app/store/api/MainApi.ts";
import { useSelector } from "react-redux";
import { selectUserId } from "../../app/store/slices/authSlice.ts";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);

  const [saveProduct] = useSaveProductMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: productData } = useGetProductQuery(Number(id)!, { skip: !id });

  const [product, setProduct] = useState<ProductVM>({
    name: "",
    description: "",
    price: 0,
    count: 0,
  });
  const [categoryId, setCategoryId] = useState();
  const selectRef = useRef();

  useEffect(() => {
    if (!productData) return;

    setProduct(productData);
    setCategoryId(String(productData.category!.categoryId));
  }, [productData]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(product);

    try {
      await saveProduct({
        ...product,
        productId: id ? Number(id) : undefined,
        userId: Number(userId),
      }).unwrap();
      enqueueSnackbar("Changes saved", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      navigate("/seller-products");
    } catch (e: any) {
      enqueueSnackbar(e.data.description, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    }
  };

  const [value, setValue] = useState("");

  const handleChangeVal = (event) => {
    setValue(event.target.value);
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
          {id ? "Edit Product" : "Add Product"}
        </Typography>
        <Button
          variant={"outlined"}
          onClick={() => navigate("/seller-products")}
        >
          Move to Seller Products
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
          id="name"
          label="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          type={"number"}
          value={product.price}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="count"
          label="Count"
          name="count"
          type={"number"}
          value={product.count}
          onChange={handleChange}
        />
        <FormControl fullWidth margin={"normal"}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            ref={selectRef}
            labelId={"category-label"}
            id="categoryId"
            name={"categoryId"}
            required
            label="Category"
            value={product.categoryId}
            onChange={(e) => {
              e.preventDefault();
              handleChange(e);
            }}
          >
            {categoriesData?.map(({ categoryId, categoryName }) => (
              <MenuItem value={categoryId} key={categoryId}>
                {categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
          {id ? "Save" : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default ProductEdit;
