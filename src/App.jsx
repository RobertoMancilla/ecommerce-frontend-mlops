import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { productsAPI, ordersAPI } from "./services/api";
import "./App.css";

function App() {

  // --- TEST: llamadas reales a las APIs ---
  useEffect(() => {

    const testAPIs = async () => {
      try {
        const productsRes = await productsAPI.get("/products");
        console.log(
          "[TEST Products API]",
          "Status:",
          productsRes.status,
          "Data:",
          productsRes.data
        );
      } catch (err) {
        console.error(
          "[TEST Products API] Error:",
          err.message,
          err.response?.status,
          err.response?.data
        );
      }

      try {
        const ordersRes = await ordersAPI.get("/orders");
        console.log(
          "[TEST Orders API]",
          "Status:",
          ordersRes.status,
          "Data:",
          ordersRes.data
        );
      } catch (err) {
        console.error(
          "[TEST Orders API] Error:",
          err.message,
          err.response?.status,
          err.response?.data
        );
      }
    };

    testAPIs();

  }, []);
  // --- FIN TEST ---

  return (
    <BrowserRouter>
      <div className="app-wrapper">

        <Navbar />

        <main className="main-content">

          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>

        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;