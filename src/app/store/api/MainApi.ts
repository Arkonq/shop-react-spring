import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserRole } from "../slices/authSlice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:8080`,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Basic ${btoa("admin:admin")}`);
    headers.set("Accept", "*/*");
    return headers;
  },
});

export const MainApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    try {
      return await baseQuery(args, api, extraOptions);
    } catch (error) {
      console.error("Error occurred during API call:", error);
      throw error;
    }
  },
  tagTypes: ["category", "product"],
  endpoints: (builder) => ({
    getUser: builder.query<LoginResponseVM, UserVM>({
      query: (login) => ({
        url: `http://localhost:8080/users/email`,
        method: "GET",
        params: { email: login },
      }),
    }),
    saveUser: builder.mutation<any, UserVM>({
      query: (body) => ({
        url: `http://localhost:8080/users/save`,
        method: "POST",
        body,
      }),
    }),
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
  }),
});

export const {
  useLazyGetUserQuery,
  useSaveUserMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useSaveProductMutation,
  useGetCategoryQuery,
  useGetCategoriesQuery,
  useSaveCategoryMutation,
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

export interface LoginResponseVM {
  description: string;
  error: number;
  found: boolean;
  user: UserVM | null;
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
