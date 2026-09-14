import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const user = useSelector(
    (state) => state.auth?.user
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        83 *
        item.quantity,
    0
  );

  const shipping =
    subtotal > 5000 || subtotal === 0
      ? 0
      : 499;

  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError("Please fill in all required details.");
      return;
    }

    if (formData.pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!user?.email) {
      setError("Please log in before placing an order.");
      return;
    }

    const ordersKey = `babafly-orders-${user.email.toLowerCase()}`;

    const existingOrders = JSON.parse(
      localStorage.getItem(ordersKey) || "[]"
    );

    const newOrder = {
      id: `BF${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN"),
      status: "Confirmed",
      items: cartItems,
      subtotal,
      shipping,
      total,
      shippingAddress: formData,
      paymentMethod,
      userEmail: user.email,
    };

    localStorage.setItem(
      ordersKey,
      JSON.stringify([
        newOrder,
        ...existingOrders,
      ])
    );

    // Clear the Redux cart AND saved cart
    dispatch(clearCart());

    navigate(`/orders/${newOrder.id}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Your bag is empty
          </h1>

          <p className="text-gray-500 mt-3">
            Add some products before checking out.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-[#ff3f6c] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="text-gray-500 mt-2">
          Complete your order details
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <form
          onSubmit={handlePlaceOrder}
          className="lg:col-span-2 space-y-6"
        >
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Delivery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Payment Method
            </h2>

            <label className="flex items-center gap-3 border border-gray-200 rounded-lg p-4 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <div>
                <p className="font-medium">
                  Cash on Delivery
                </p>

                <p className="text-sm text-gray-500">
                  Pay when your order arrives
                </p>
              </div>
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#ff3f6c] text-white py-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Place Order
          </button>
        </form>

        <div className="border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="font-medium mt-1">
                    ₹
                    {(
                      Number(item.price || 0) *
                      83 *
                      item.quantity
                    ).toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span>₹{subtotal.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Shipping
              </span>

              <span>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold pt-3 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;