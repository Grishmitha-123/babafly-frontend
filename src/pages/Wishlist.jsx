import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  clearWishlist,
} from "../redux/wishlistslice";
import { addToCart } from "../redux/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const handleMoveToBag = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mx-auto max-w-[600px] py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f7f7]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#222"
              strokeWidth="1.5"
            >
              <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />
            </svg>
          </div>

          <h1 className="text-[24px] font-bold text-[#222]">
            Your wishlist is empty
          </h1>

          <p className="mt-3 text-[13px] text-[#888]">
            Save the pieces you love and come back to them anytime.
          </p>

          <Link
  to="/products"
  className="mt-8 inline-block border border-[#ff3f6c] bg-[#ff3f6c] px-8 py-4 text-[11px] font-bold uppercase tracking-[1.5px] text-white transition hover:border-black hover:bg-white hover:text-black"
>
  Explore products
</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-10">

      {/* HEADER */}
      <div className="flex items-end justify-between border-b border-gray-100 pb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#999]">
            Saved for later
          </p>

          <h1 className="mt-2 text-[28px] font-bold text-[#222]">
            My Wishlist
            <span className="ml-2 text-[14px] font-medium text-[#999]">
              ({wishlistItems.length})
            </span>
          </h1>
        </div>

        <button
          type="button"
          onClick={() => dispatch(clearWishlist())}
          className="text-[11px] font-semibold uppercase tracking-[1px] text-[#777] transition hover:text-[#ff3f6c]"
        >
          Clear wishlist
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">

        {wishlistItems.map((product) => {
          const discount = product.discountPercentage
            ? Math.round(product.discountPercentage)
            : 0;

          const price = Math.round(product.price * 84);

          const originalPrice =
            discount > 0
              ? Math.round(price / (1 - discount / 100))
              : price;

          return (
            <article
              key={product.id}
              className="group relative min-w-0"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden bg-[#f5f5f5]">

                <Link
                  to={`/products/${product.id}`}
                  className="block"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>

                {/* DISCOUNT */}
                {discount > 0 && (
                  <span className="absolute left-3 top-3 bg-[#ff3f6c] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {discount}% OFF
                  </span>
                )}

                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() => handleRemove(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#ff3f6c"
                    stroke="#ff3f6c"
                    strokeWidth="1.7"
                  >
                    <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />
                  </svg>
                </button>

                {/* MOVE TO BAG */}
                <button
                  type="button"
                  onClick={() => handleMoveToBag(product)}
                  className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[1px] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Move to bag
                </button>
              </div>

              {/* DETAILS */}
              <div className="px-1 pb-2 pt-4">

                <p className="mb-1 truncate text-[11px] font-semibold uppercase tracking-[0.8px] text-[#8a8a8a]">
                  {product.brand ||
                    product.category ||
                    "BabaFly edit"}
                </p>

                <Link to={`/products/${product.id}`}>
                  <h3 className="truncate text-[14px] font-semibold text-[#222] transition hover:text-[#ff3f6c]">
                    {product.title}
                  </h3>
                </Link>

                {/* PRICE */}
                <div className="mt-2 flex flex-wrap items-center gap-2">

                  <span className="text-[14px] font-bold text-[#171717]">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  {discount > 0 && (
                    <>
                      <span className="text-[12px] text-[#999] line-through">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </span>

                      <span className="text-[11px] font-semibold text-[#ff3f6c]">
                        {discount}% off
                      </span>
                    </>
                  )}

                </div>

                {/* RATING */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-[#eef7ee] px-2 py-1 text-[10px] font-bold text-[#287a35]">
                    {product.rating
                      ? Number(product.rating).toFixed(1)
                      : "4.0"}
                    <span>★</span>
                  </span>
                </div>

              </div>
            </article>
          );
        })}

      </div>
    </main>
  );
}

export default Wishlist;