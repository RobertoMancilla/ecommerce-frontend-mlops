import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/ordersService";
import "./Checkout.css";

const initialForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "card",
};

function validateForm(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.address.trim()) errors.address = "Address is required.";
  if (!values.city.trim()) errors.city = "City is required.";
  if (!values.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  } else if (!/^[A-Za-z0-9\-\s]{4,10}$/.test(values.postalCode)) {
    errors.postalCode = "Postal code format is invalid.";
  }

  if (!values.paymentMethod) errors.paymentMethod = "Select a payment method.";

  return errors;
}

function CheckoutPage() {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  const [formValues, setFormValues] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({ type: "", message: "" });

  const orderPayload = useMemo(
    () => ({
      customer: {
        fullName: formValues.fullName.trim(),
        email: formValues.email.trim(),
        address: formValues.address.trim(),
        city: formValues.city.trim(),
        postalCode: formValues.postalCode.trim(),
      },
      paymentMethod: formValues.paymentMethod,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      summary: { subtotal, shipping, total },
    }),
    [cartItems, formValues, shipping, subtotal, total]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setResult({ type: "error", message: "Your cart is empty." });
      return;
    }

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setSubmitting(true);
      setResult({ type: "", message: "" });

      const response = await createOrder(orderPayload);
      const orderId = response?.id || response?.orderId || "N/A";

      clearCart();
      setResult({
        type: "success",
        message: `Order placed successfully. Order ID: ${orderId}`,
      });
      setFormValues(initialForm);
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      setResult({
        type: "error",
        message: apiMessage || "Failed to place order. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="checkout-page container">
      <h1>Checkout</h1>

      {cartItems.length === 0 && result.type !== "success" && (
        <p>
          Your cart is empty. <Link to="/">Go back to catalog</Link>
        </p>
      )}

      {result.message && (
        <div className={`alert ${result.type === "error" ? "alert-error" : "alert-success"}`}>
          {result.message}
        </div>
      )}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Shipping details</h2>

          <label>
            Full name
            <input name="fullName" value={formValues.fullName} onChange={handleChange} />
            {formErrors.fullName && <small>{formErrors.fullName}</small>}
          </label>

          <label>
            Email
            <input name="email" type="email" value={formValues.email} onChange={handleChange} />
            {formErrors.email && <small>{formErrors.email}</small>}
          </label>

          <label>
            Address
            <input name="address" value={formValues.address} onChange={handleChange} />
            {formErrors.address && <small>{formErrors.address}</small>}
          </label>

          <div className="checkout-form__row">
            <label>
              City
              <input name="city" value={formValues.city} onChange={handleChange} />
              {formErrors.city && <small>{formErrors.city}</small>}
            </label>

            <label>
              Postal code
              <input name="postalCode" value={formValues.postalCode} onChange={handleChange} />
              {formErrors.postalCode && <small>{formErrors.postalCode}</small>}
            </label>
          </div>

          <label>
            Payment method
            <select name="paymentMethod" value={formValues.paymentMethod} onChange={handleChange}>
              <option value="card">Credit/Debit card</option>
              <option value="transfer">Bank transfer</option>
              <option value="cash">Cash on delivery</option>
            </select>
            {formErrors.paymentMethod && <small>{formErrors.paymentMethod}</small>}
          </label>

          <button className="btn btn-primary" type="submit" disabled={submitting || cartItems.length === 0}>
            {submitting ? "Placing order..." : "Place order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>

          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>

          <p>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </p>
          <p>
            <span>Shipping</span>
            <strong>${shipping.toFixed(2)}</strong>
          </p>
          <p className="checkout-summary__total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
