import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { productsApi, ordersApi } from "./services/api";
import "./App.css";

function App() {
  // --- TEST: llamadas reales a las APIs (solo console.log) ---
  useEffect(() => {
    productsApi.get('/products')
      .then(res => console.log('[TEST Products API] Status:', res.status, 'Data:', res.data))
      .catch(err => console.error('[TEST Products API] Error:', err.message, err.response?.status, err.response?.data));

    ordersApi.get('/orders')
      .then(res => console.log('[TEST Orders API] Status:', res.status, 'Data:', res.data))
      .catch(err => console.error('[TEST Orders API] Error:', err.message, err.response?.status, err.response?.data));
  }, []);
  // --- FIN TEST ---

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;