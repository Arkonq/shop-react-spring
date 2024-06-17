import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuth, UserRole } from "../slices/authSlice.ts";
import { RootState } from "../store.ts";
import { enqueueSnackbar } from "notistack";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:8080`,
  prepareHeaders: (headers, { getState }) => {
    headers.set(
      "Authorization",
      (getState() as RootState).auth.token
        ? `Bearer ${(getState() as RootState).auth.token}`
        : `Basic ${btoa("admin:admin")}`,
    );
    headers.set("Accept", "*/*");
    return headers;
  },
});

export const MainApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result: any = await baseQuery(args, api, extraOptions);
      if (
        result &&
        result.error &&
        result.error.status === 401 &&
        (api.getState() as any).auth.token
      ) {
        api.dispatch(clearAuth());
        enqueueSnackbar("Token duration expired", {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
        return;
      }
      if (result && result.error && result.error.data.errorMessage) {
        enqueueSnackbar(result.error.data.errorMessage, {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
      return result;
    } catch (error) {
      console.error("Error occurred during API call:", error);
      throw error;
    }
  },
  tagTypes: ["category", "product", "basket", "purchase"],
  endpoints: (builder) => ({
    // USER
    loginUser: builder.mutation<
      { token: string },
      { login: string; password: string }
    >({
      query: ({ login, password }) => ({
        url: `http://localhost:8080/auth/login`,
        method: "POST",
        body: { login, password },
      }),
    }),
    registerUser: builder.mutation<any, UserVM>({
      query: (body) => ({
        url: `http://localhost:8080/auth/register`,
        method: "POST",
        body,
      }),
    }),
    // PRODUCT
    getProduct: builder.query<ProductVM, number>({
      query: (params) => ({
        url: `/products/getProduct/${params}`,
        method: "GET",
      }),
      providesTags: (_, __, arg) => [{ type: "product", id: arg }],
    }),
    getProducts: builder.query<
      ProductVM[],
      { userId?: number; categoryId?: number }
    >({
      query: (params) => ({
        url: `/products/get`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "product", id: "LIST" }],
    }),
    saveProduct: builder.mutation<any, ProductVM>({
      query: (body) => ({
        url: `/products/save`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "product", id: arg?.productId },
        { type: "product", id: "LIST" },
      ],
    }),
    getProductImage: builder.query<string[], number>({
      query: (productId) => ({
        url: `/products/images/${productId}`,
        method: "GET",
      }),
      providesTags: (_, __, arg) => [{ type: "product", id: arg }],
    }),
    saveProductImage: builder.mutation<any, { productId: number; image: File }>(
      {
        query: ({ productId, image }) => {
          const formData = new FormData();
          formData.append("image", image);
          return {
            url: `/products/${productId}/images`,
            method: "POST",
            body: formData,
            contentType: "multipart/form-data",
            formData: true,
          };
        },
        invalidatesTags: (_, __, arg) => [
          { type: "product", id: arg?.productId },
          { type: "product", id: "LIST" },
        ],
      },
    ),
    // CATEGORY
    getCategory: builder.query<CategoryVM, string>({
      query: (id) => ({
        url: `http://localhost:8080/categories/get/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, arg) => [{ type: "category", id: arg }],
    }),
    getCategories: builder.query<CategoryVM[], void>({
      query: () => ({
        url: `http://localhost:8080/categories/getAll`,
        method: "GET",
      }),
      providesTags: [{ type: "category", id: "LIST" }],
    }),
    saveCategory: builder.mutation<
      CategoryVM,
      { categoryId?: number; categoryName: string }
    >({
      query: (body) => ({
        url: `http://localhost:8080/categories/save`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "category", id: arg?.categoryId },
        { type: "category", id: "LIST" },
      ],
    }),
    // BASKET
    getBasket: builder.query<BasketVM[], number>({
      query: (userId) => ({
        url: `http://localhost:8080/baskets/user/${userId}`,
        method: "GET",
      }),
      providesTags: (_, __, arg) => [{ type: "basket", id: arg }],
    }),
    saveBasket: builder.mutation<
      BasketVM,
      { userId: number; productId: number; count: number }
    >({
      query: (params) => ({
        url: `http://localhost:8080/baskets/save`,
        method: "POST",
        params,
      }),
      invalidatesTags: (res) => [{ type: "basket", id: res?.userId }],
    }),
    buyBasket: builder.mutation<
      BasketVM,
      { userId: number; basketId: number; productId: number }
    >({
      query: ({ userId, basketId }) => ({
        url: `http://localhost:8080/purchases/buy`,
        method: "POST",
        body: { userId, basketId },
      }),
      invalidatesTags: (_, __, args) => [
        { type: "basket", id: args.userId },
        { type: "purchase", id: args.userId },
        { type: "product", id: args.productId },
      ],
    }),
    getPurchase: builder.query<any, number>({
      query: (userId) => ({
        url: `http://localhost:8080/purchases/user/${userId}`,
        method: "GET",
      }),
      providesTags: (_, __, args) => [{ type: "purchase", id: args }],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useSaveProductMutation,
  useGetProductImageQuery,
  useSaveProductImageMutation,
  useGetCategoryQuery,
  useGetCategoriesQuery,
  useSaveCategoryMutation,
  useGetBasketQuery,
  useSaveBasketMutation,
  useBuyBasketMutation,
  useGetPurchaseQuery,
} = MainApi;

export interface ProductVM {
  productId?: number;
  name: string;
  description: string;
  price: number;
  count: number;
  category?: { categoryId: number; categoryName: string };
  user?: {
    userId: number;
    login: string;
    email: string;
  };
  dateCreate?: string;
  delete?: string | null;

  categoryId?: number | string;
  userId?: number;
}

export interface UserVM {
  userId: number;
  firstname: string;
  lastname: string;
  role: UserRole;
  login: string;
  password: string;
  email: string;
  delete?: null | string;
  products?: ProductVM[];
  date_create?: string;
}

export interface CategoryVM {
  categoryId?: number;
  categoryName: string;
}

export interface BasketVM {
  basketId: number;
  bought: string | null;
  count: number;
  total: number;
  userId: number;
  products: ProductVM[];
}
