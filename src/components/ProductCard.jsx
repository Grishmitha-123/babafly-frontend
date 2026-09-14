import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/wishlistslice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const liked = wishlistItems.some(
    (item) => item.id === product.id
  );

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  const price = Math.round(product.price * 84);

  const originalPrice =
    discount > 0
      ? Math.round(price / (1 - discount / 100))
      : price;

  const rating = product.rating
    ? Number(product.rating).toFixed(1)
    : "4.0";

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <article className="group relative min-w-0">
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-[#f5f5f5]">
        <Link to={`/products/${product.id}`} className="block">
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

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={liked ? "#ff3f6c" : "none"}
            stroke={liked ? "#ff3f6c" : "#222"}
            strokeWidth="1.7"
          >
            <path d="M20.8 8.7c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />
          </svg>
        </button>

        {/* HOVER ACTION */}
        <Link
          to={`/products/${product.id}`}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[1px] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View details
        </Link>
      </div>

      {/* DETAILS */}
      <div className="px-1 pb-5 pt-4">
        <p className="mb-1 truncate text-[11px] font-semibold uppercase tracking-[0.8px] text-[#8a8a8a]">
          {product.brand || product.category || "BabaFly edit"}
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
            {rating}
            <span>★</span>
          </span>

          {product.stock !== undefined && (
            <span className="text-[10px] text-[#999]">
              {product.stock > 10
                ? "In stock"
                : "Limited stock"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;