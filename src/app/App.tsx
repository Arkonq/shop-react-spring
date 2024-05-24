import { ProductsPage } from "../modules/Product/ProductsPage.tsx";
import { useSelector } from "react-redux";
import { selectUserId, selectRole } from "./store/slices/authSlice.ts";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../modules/Login/LoginPage.tsx";
import { Layout } from "../shared/components/Layout/Layout.tsx";
import { ProductPage } from "../modules/Product/ProductPage.tsx";
import CategoryPage from "../modules/Category/CategoryPage.tsx";
import CategoryEdit from "../modules/Category/CategoryEdit.tsx";
import SellerProducts from "../modules/Product/SellerProducts.tsx";
import ProductEdit from "../modules/Product/ProductEdit.tsx";

export default function App() {
  const isAuth = useSelector(selectUserId);
  const role = useSelector(selectRole);

  if (!isAuth)
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    );

  return (
    <Routes>
      <Route
        path={"/products"}
        element={
          <Layout>
            <ProductsPage />
          </Layout>
        }
      />
      <Route
        path={"/products/:id"}
        element={
          <Layout>
            <ProductPage />
          </Layout>
        }
      />
      {role === "ADMIN" ? (
        <>
          <Route
            path={"/categories"}
            element={
              <Layout>
                <CategoryPage />
              </Layout>
            }
          />
          <Route
            path={"/categories/add"}
            element={
              <Layout>
                <CategoryEdit />
              </Layout>
            }
          />
          <Route
            path={"/categories/:id"}
            element={
              <Layout>
                <CategoryEdit />
              </Layout>
            }
          />
        </>
      ) : role === "SELLER" ? (
        <>
          <Route
            path={"/seller-products"}
            element={
              <Layout>
                <SellerProducts />
              </Layout>
            }
          />
          <Route
            path={"/seller-products/add"}
            element={
              <Layout>
                <ProductEdit />
              </Layout>
            }
          />
          <Route
            path={"/seller-products/:id"}
            element={
              <Layout>
                <ProductEdit />
              </Layout>
            }
          />
        </>
      ) : (
        <></>
      )}
      <Route path={"/*"} element={<Navigate to={"/products"} />} />
    </Routes>
  );
}
