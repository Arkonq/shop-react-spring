import { ProductsPage } from "../pages/Product/ProductsPage.tsx";
import { useSelector } from "react-redux";
import { selectUserId, selectRole } from "./store/slices/authSlice.ts";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/Login/LoginPage.tsx";
import { Layout } from "../shared/components/Layout/Layout.tsx";
import { ProductPage } from "../pages/Product/ProductPage.tsx";
import CategoryPage from "../pages/Category/CategoryPage.tsx";
import CategoryEdit from "../pages/Category/CategoryEdit.tsx";
import SellerProducts from "../pages/Product/SellerProducts.tsx";
import ProductEdit from "../pages/Product/ProductEdit.tsx";
import BasketPage from "../pages/Basket/BasketPage.tsx";

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
        <>
          <Route
            path={"/basket"}
            element={
              <Layout>
                <BasketPage />
              </Layout>
            }
          />
        </>
      )}
      <Route path={"/*"} element={<Navigate to={"/products"} />} />
    </Routes>
  );
}
