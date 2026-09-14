import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

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

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-20">

        <div className="border border-[#eeeeee] py-24 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f5]">

            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 8h12l1 12H5L6 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>

          </div>

          <h1 className="mt-6 font-['Manrope'] text-[28px] font-bold">
            Your bag is empty
          </h1>

          <p className="mt-3 text-[13px] text-[#888]">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block border border-[#ff3f6c] bg-[#ff3f6c] px-7 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white transition hover:border-black hover:bg-white hover:text-black"
          >
            Start shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">

      {/* HEADER */}

      <div className="border-b border-[#eeeeee] pb-8">

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-[#999]">

          <Link
            to="/"
            className="hover:text-[#ff3f6c]"
          >
            Home
          </Link>

          <span>/</span>

          <span>Cart</span>

        </div>

        <div className="mt-3 flex items-end justify-between">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
              Your selection
            </p>

            <h1 className="mt-2 font-['Manrope'] text-[36px] font-extrabold tracking-[-1.5px] sm:text-[44px]">
              Your bag
            </h1>

          </div>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="hidden text-[10px] font-bold uppercase tracking-[1px] text-[#888] transition hover:text-[#ff3f6c] sm:block"
          >
            Clear bag
          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_380px]">

        {/* ITEMS */}

        <div>

          <div className="mb-5 flex items-center justify-between">

            <p className="text-[12px] text-[#777]">
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}{" "}
              items
            </p>

            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="text-[10px] font-bold uppercase tracking-[1px] text-[#888] transition hover:text-[#ff3f6c] sm:hidden"
            >
              Clear bag
            </button>

          </div>

          <div className="border-t border-[#eeeeee]">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex gap-4 border-b border-[#eeeeee] py-6 sm:gap-6"
              >

                {/* IMAGE */}

                <Link
                  to={`/products/${item.id}`}
                  className="h-[150px] w-[115px] shrink-0 bg-[#f7f7f7] sm:h-[180px] sm:w-[140px]"
                >

                  <img
                    src={
                      item.thumbnail ||
                      item.images?.[0]
                    }
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />

                </Link>

                {/* DETAILS */}

                <div className="flex min-w-0 flex-1 flex-col">

                  <div className="flex justify-between gap-4">

                    <div className="min-w-0">

                      {item.brand && (
                        <p className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#999]">
                          {item.brand}
                        </p>
                      )}

                      <Link
                        to={`/products/${item.id}`}
                        className="mt-1 block font-['Manrope'] text-[15px] font-bold transition hover:text-[#ff3f6c]"
                      >
                        {item.title}
                      </Link>

                      <p className="mt-2 text-[11px] capitalize text-[#999]">
                        {item.category}
                      </p>

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          removeFromCart(item.id)
                        )
                      }
                      className="shrink-0 text-[#999] transition hover:text-[#ff3f6c]"
                      aria-label={`Remove ${item.title}`}
                    >

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                      </svg>

                    </button>

                  </div>

                  {/* PRICE + QUANTITY */}

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4">

                    {/* QUANTITY */}

                    <div>

                      <p className="mb-2 text-[9px] uppercase tracking-[1px] text-[#999]">
                        Quantity
                      </p>

                      <div className="flex h-[36px] items-center border border-[#dddddd]">

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(
                                item.id
                              )
                            )
                          }
                          className="flex h-full w-[34px] items-center justify-center text-[16px] transition hover:bg-[#f5f5f5]"
                        >
                          −
                        </button>

                        <span className="flex h-full w-[36px] items-center justify-center border-x border-[#dddddd] text-[11px] font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              increaseQuantity(
                                item.id
                              )
                            )
                          }
                          className="flex h-full w-[34px] items-center justify-center text-[16px] transition hover:bg-[#f5f5f5]"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* ITEM TOTAL */}

                    <div className="text-right">

                      <p className="text-[9px] uppercase tracking-[1px] text-[#999]">
                        Total
                      </p>

                      <p className="mt-1 text-[16px] font-bold">
                        ₹
                        {(
                          Number(item.price || 0) *
                          83 *
                          item.quantity
                        ).toFixed(0)}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* SUMMARY */}

        <div>

          <div className="border border-[#eeeeee] p-6 sm:p-7 lg:sticky lg:top-6">

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
              Order summary
            </p>

            <h2 className="mt-2 font-['Manrope'] text-[22px] font-bold">
              Summary
            </h2>

            <div className="mt-7 border-t border-[#eeeeee]">

              {/* SUBTOTAL */}

              <div className="flex justify-between border-b border-[#eeeeee] py-4">

                <span className="text-[12px] text-[#777]">
                  Subtotal
                </span>

                <span className="text-[12px] font-semibold">
                  ₹{subtotal.toFixed(0)}
                </span>

              </div>

              {/* SHIPPING */}

              <div className="flex justify-between border-b border-[#eeeeee] py-4">

                <span className="text-[12px] text-[#777]">
                  Shipping
                </span>

                <span className="text-[12px] font-semibold">
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping.toFixed(0)}`}
                </span>

              </div>

              {/* FREE SHIPPING MESSAGE */}

              {subtotal > 0 &&
                subtotal < 5000 && (
                  <p className="py-4 text-[10px] leading-5 text-[#999]">
                    Add ₹
                    {(5000 - subtotal).toFixed(0)}{" "}
                    more to get free shipping.
                  </p>
                )}

              {/* TOTAL */}

              <div className="flex justify-between py-5">

                <span className="text-[13px] font-bold">
                  Total
                </span>

                <span className="text-[18px] font-bold">
                  ₹{total.toFixed(0)}
                </span>

              </div>

            </div>

            {/* CHECKOUT */}

           <Link
  to="/checkout"
  className="block w-full border border-[#ff3f6c] bg-[#ff3f6c] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[1.5px] text-white transition hover:border-black hover:bg-white hover:text-black"
>
  Proceed to checkout
</Link>

            {/* CONTINUE */}

            <Link
              to="/products"
              className="mt-3 block w-full border border-[#dddddd] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[1.5px] transition hover:border-black"
            >
              Continue shopping
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;