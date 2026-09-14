import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { id } = useParams();

  const user = useSelector(
    (state) => state.auth?.user
  );

  const ordersKey = user?.email
    ? `babafly-orders-${user.email.toLowerCase()}`
    : null;

  const orders = ordersKey
    ? JSON.parse(
        localStorage.getItem(ordersKey) || "[]"
      )
    : [];

  const order = orders.find(
    (item) => item.id === id
  );

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Please log in
          </h1>

          <p className="text-gray-500 mt-3">
            Log in to view this order.
          </p>

          <Link
            to="/login"
            className="inline-block mt-6 bg-[#ff3f6c] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Order not found
          </h1>

          <p className="text-gray-500 mt-3">
            This order doesn't exist in your account.
          </p>

          <Link
            to="/orders"
            className="inline-block mt-6 bg-[#ff3f6c] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Order #{order.id}
          </h1>

          <p className="text-gray-500 mt-2">
            Placed on {order.date}
          </p>
        </div>

        <span className="inline-block w-fit px-4 py-2 rounded-full bg-green-50 text-green-600 font-semibold">
          {order.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Ordered Items
          </h2>

          <div className="space-y-5">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b last:border-b-0 last:pb-0"
              >
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-28 object-cover rounded-lg border"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-semibold text-gray-900"
                  >
                    {item.title}
                  </Link>

                  <p className="text-sm text-gray-500 mt-2">
                    Category: {item.category}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="font-semibold mt-2">
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
        </div>

        <div className="space-y-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Delivery Address
            </h2>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-900">
                {order.shippingAddress?.name}
              </p>

              <p>
                {order.shippingAddress?.address}
              </p>

              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>

              <p>
                Pincode:{" "}
                {order.shippingAddress?.pincode}
              </p>

              <p>
                Phone:{" "}
                {order.shippingAddress?.phone}
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              Payment & Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Payment
                </span>

                <span>
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : order.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹
                  {Number(
                    order.subtotal || 0
                  ).toFixed(0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span>
                  {Number(order.shipping || 0) === 0
                    ? "FREE"
                    : `₹${Number(
                        order.shipping || 0
                      ).toFixed(0)}`}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                <span>Total</span>

                <span>
                  ₹
                  {Number(
                    order.total || 0
                  ).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Link
          to="/orders"
          className="border border-gray-300 px-5 py-3 rounded-lg font-semibold"
        >
          My Orders
        </Link>

        <Link
          to="/products"
          className="bg-[#ff3f6c] text-white px-5 py-3 rounded-lg font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderDetails;