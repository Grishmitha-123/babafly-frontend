import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../utils/axios";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">

          <div className="aspect-[4/5] animate-pulse bg-[#f3f3f3]" />

          <div className="animate-pulse py-5">
            <div className="h-3 w-24 bg-[#eeeeee]" />

            <div className="mt-5 h-10 w-3/4 bg-[#eeeeee]" />

            <div className="mt-5 h-5 w-32 bg-[#eeeeee]" />

            <div className="mt-8 h-4 w-full bg-[#eeeeee]" />

            <div className="mt-2 h-4 w-full bg-[#eeeeee]" />

            <div className="mt-2 h-4 w-2/3 bg-[#eeeeee]" />
          </div>

        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center">

        <h1 className="font-['Manrope'] text-[28px] font-bold">
          Product not found
        </h1>

        <p className="mt-3 text-[13px] text-[#888]">
          {error || "This product could not be found."}
        </p>

        <Link
          to="/products"
          className="mt-7 inline-block bg-[#171717] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white transition hover:bg-[#ff3f6c]"
        >
          Back to shop
        </Link>

      </div>
    );
  }

  const discount = Number(product.discountPercentage || 0);

  const discountedPrice =
    product.price - (product.price * discount) / 100;

  /*
    DummyJSON prices are in USD.
    BabaFly displays prices in INR.
  */
  const priceInRupees = discountedPrice * 83;
  const originalPriceInRupees = product.price * 83;

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">

      {/* BREADCRUMB */}

      <div className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-[#999]">

        <Link
          to="/"
          className="hover:text-[#ff3f6c]"
        >
          Home
        </Link>

        <span>/</span>

        <Link
          to="/products"
          className="hover:text-[#ff3f6c]"
        >
          Shop
        </Link>

        <span>/</span>

        <span>{product.title}</span>

      </div>

      {/* PRODUCT */}

      <div className="grid gap-10 lg:grid-cols-2">

        {/* IMAGE */}

        <div className="bg-[#f7f7f7]">

          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="h-full max-h-[700px] w-full object-contain"
          />

        </div>

        {/* DETAILS */}

        <div className="py-2 lg:py-8">

          {/* CATEGORY */}

          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
            {product.category}
          </p>

          {/* TITLE */}

          <h1 className="mt-3 font-['Manrope'] text-[32px] font-extrabold tracking-[-1px] sm:text-[42px]">
            {product.title}
          </h1>

          {/* BRAND */}

          {product.brand && (
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[1px] text-[#777]">
              {product.brand}
            </p>
          )}

          {/* RATING */}

          <div className="mt-6 flex items-center gap-3">

            <div className="flex items-center gap-1 bg-[#171717] px-3 py-2 text-white">

              <span className="text-[12px]">
                ★
              </span>

              <span className="text-[12px] font-semibold">
                {Number(product.rating || 0).toFixed(1)}
              </span>

            </div>

            <span className="text-[12px] text-[#888]">
              Customer rating
            </span>

          </div>

          {/* PRICE */}

          <div className="mt-7 flex items-center gap-3">

            <span className="text-[26px] font-bold">
              ₹{priceInRupees.toFixed(0)}
            </span>

            {discount > 0 && (
              <>
                <span className="text-[16px] text-[#999] line-through">
                  ₹{originalPriceInRupees.toFixed(0)}
                </span>

                <span className="text-[12px] font-bold text-[#ff3f6c]">
                  {discount.toFixed(0)}% OFF
                </span>
              </>
            )}

          </div>

          {/* DESCRIPTION */}

          <div className="mt-8 border-t border-[#eeeeee] pt-7">

            <p className="text-[13px] leading-7 text-[#666]">
              {product.description}
            </p>

          </div>

          {/* PRODUCT INFO */}

          <div className="mt-8 grid grid-cols-2 border-y border-[#eeeeee]">

            <div className="border-b border-r border-[#eeeeee] px-4 py-5">

              <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
                Category
              </p>

              <p className="mt-2 text-[12px] font-semibold capitalize">
                {product.category}
              </p>

            </div>

            <div className="border-b border-[#eeeeee] px-4 py-5">

              <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
                Stock
              </p>

              <p className="mt-2 text-[12px] font-semibold">
                {product.stock} available
              </p>

            </div>

            <div className="border-r border-[#eeeeee] px-4 py-5">

              <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
                SKU
              </p>

              <p className="mt-2 text-[12px] font-semibold">
                {product.sku || `BF-${product.id}`}
              </p>

            </div>

            <div className="px-4 py-5">

              <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
                Shipping
              </p>

              <p className="mt-2 text-[12px] font-semibold">
                {product.shippingInformation || "Fast delivery"}
              </p>

            </div>

          </div>

          {/* ADD TO CART */}

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 w-full bg-[#171717] px-6 py-4 text-[11px] font-bold uppercase tracking-[1.5px] text-white transition hover:bg-[#ff3f6c]"
          >
            {added ? "Added to bag ✓" : "Add to cart"}
          </button>

          {/* CONTINUE SHOPPING */}

          <Link
            to="/products"
            className="mt-3 block w-full border border-[#dddddd] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[1.5px] transition hover:border-black"
          >
            Continue shopping
          </Link>

        </div>

      </div>

      {/* EXTRA PRODUCT INFORMATION */}

      <div className="mt-16 border-t border-[#eeeeee] pt-10">

        <h2 className="font-['Manrope'] text-[24px] font-bold">
          Product information
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="border border-[#eeeeee] p-5">

            <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
              Warranty
            </p>

            <p className="mt-2 text-[12px] font-semibold">
              {product.warrantyInformation || "Standard warranty"}
            </p>

          </div>

          <div className="border border-[#eeeeee] p-5">

            <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
              Return policy
            </p>

            <p className="mt-2 text-[12px] font-semibold">
              {product.returnPolicy || "Easy returns"}
            </p>

          </div>

          <div className="border border-[#eeeeee] p-5">

            <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
              Minimum order
            </p>

            <p className="mt-2 text-[12px] font-semibold">
              {product.minimumOrderQuantity || 1} item
            </p>

          </div>

          <div className="border border-[#eeeeee] p-5">

            <p className="text-[9px] uppercase tracking-[1.5px] text-[#999]">
              Availability
            </p>

            <p className="mt-2 text-[12px] font-semibold">
              {product.availabilityStatus || "In stock"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;