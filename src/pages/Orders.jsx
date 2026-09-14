import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Orders() {
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

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Please log in
          </h1>

          <p className="text-gray-500 mt-3">
            Log in to view your orders.
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

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            No orders yet
          </h1>

          <p className="text-gray-500 mt-3">
            Your placed orders will appear here.
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
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          View your recent orders and their details.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-xl p-5"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">
                  Order #{order.id}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Placed on {order.date}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span className="text-sm font-medium text-green-600">
                  {order.status}
                </span>

                <span className="font-semibold">
                  ₹{Number(order.total || 0).toFixed(0)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5">
              {order.items
                ?.slice(0, 4)
                .map((item) => (
                  <img
                    key={item.id}
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                ))}

              {order.items?.length > 4 && (
                <span className="text-sm text-gray-500">
                  +{order.items.length - 4} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t">
              <p className="text-sm text-gray-500">
                {order.items?.reduce(
                  (total, item) =>
                    total + (item.quantity || 0),
                  0
                )}{" "}
                item(s)
              </p>

              <Link
                to={`/orders/${order.id}`}
                className="text-[#ff3f6c] font-semibold text-sm"
              >
                View Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;