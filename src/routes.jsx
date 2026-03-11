import CatalogPage from "./pages/Catalog/CatalogPage";
import ProductDetailPage from "./pages/Catalog/ProductDetailPage";
import CartPage from "./pages/Cart/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import OrderDetailPage from "./pages/Orders/OrderDetailPage";

const routes = [
  {
    path: "/",
    element: <CatalogPage />
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />
  },
  {
    path: "/cart",
    element: <CartPage />
  },
  {
    path: "/checkout",
    element: <CheckoutPage />
  },
  {
    path: "/orders",
    element: <OrdersPage />
  },
  {
    path: "/orders/:id",
    element: <OrderDetailPage />
  },
  {
    path: "*",
    element: <CatalogPage />
  }
];

export default routes;