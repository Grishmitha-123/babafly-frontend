import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";

const categoryMap = {
  women: {
    title: "Women's Collection",
    description:
      "Explore dresses, shoes, bags and jewellery curated for women.",
    categories: [
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
    ],
  },

  men: {
    title: "Men's Collection",
    description:
      "Explore shirts, shoes and watches for every occasion.",
    categories: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
    ],
  },

  footwear: {
    title: "Footwear",
    description:
      "Step into styles made for everyday movement.",
    categories: [
      "mens-shoes",
      "womens-shoes",
    ],
  },

  accessories: {
    title: "Accessories",
    description:
      "Complete your look with bags, jewellery, watches and more.",
    categories: [
      "womens-bags",
      "womens-jewellery",
      "mens-watches",
      "sunglasses",
      "mobile-accessories",
    ],
  },

  beauty: {
    title: "Beauty",
    description:
      "Discover beauty, skincare and fragrance products.",
    categories: [
      "beauty",
      "skin-care",
      "fragrances",
    ],
  },

  "new-in": {
    title: "New In",
    description:
      "Fresh styles and the latest additions to BabaFly.",
    categories: "new",
  },

  kids: {
    title: "Kids",
    description:
      "Styles for little ones.",
    categories: "kids",
  },

  sale: {
    title: "Sale",
    description:
      "Great styles at even better prices.",
    categories: "sale",
  },
};

function CategoryProducts() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const category = categoryMap[id];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products?limit=0");

        setProducts(response.data.products || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load this collection right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!category) {
      return [];
    }

    const result = [...products];

    // MEN / WOMEN / FOOTWEAR / ACCESSORIES / BEAUTY
    if (Array.isArray(category.categories)) {
      return result.filter((product) =>
        category.categories.includes(
          String(product.category || "").toLowerCase()
        )
      );
    }

    // NEW IN
    if (category.categories === "new") {
      return result
        .sort((a, b) => b.id - a.id)
        .slice(0, 24);
    }

    // SALE
    if (category.categories === "sale") {
      return result
        .filter(
          (product) =>
            Number(product.discountPercentage || 0) > 0
        )
        .sort(
          (a, b) =>
            Number(b.discountPercentage || 0) -
            Number(a.discountPercentage || 0)
        );
    }

    // KIDS
    // DummyJSON has no dedicated kids category,
    // so we NEVER put random products here.
    if (category.categories === "kids") {
      return [];
    }

    return [];
  }, [products, category]);

  if (!category) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-24 text-center">
        <h1 className="font-['Manrope'] text-[32px] font-extrabold">
          Category not found
        </h1>

        <p className="mt-3 text-[13px] text-[#888]">
          The category you're looking for doesn't exist.
        </p>

        <Link
          to="/categories"
          className="mt-7 inline-block bg-[#171717] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white"
        >
          View categories
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">

      <div className="border-b border-[#eeeeee] pb-8">

        <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-[#999]">
          <Link
            to="/"
            className="hover:text-[#ff3f6c]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            to="/categories"
            className="hover:text-[#ff3f6c]"
          >
            Categories
          </Link>

          <span>/</span>

          <span>{category.title}</span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
          BabaFly Collection
        </p>

        <h1 className="mt-2 font-['Manrope'] text-[36px] font-extrabold tracking-[-1.5px] sm:text-[44px]">
          {category.title}
        </h1>

        <p className="mt-3 max-w-[570px] text-[13px] leading-6 text-[#777]">
          {category.description}
        </p>

      </div>

      <div className="py-6">
        <p className="text-[12px] text-[#777]">
          {loading
            ? "Loading collection..."
            : `${filteredProducts.length} products`}
        </p>
      </div>

      {error && (
        <div className="border border-[#eeeeee] py-20 text-center">

          <h2 className="font-['Manrope'] text-[24px] font-bold">
            Something went wrong
          </h2>

          <p className="mt-2 text-[13px] text-[#888]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#171717] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white hover:bg-[#ff3f6c]"
          >
            Try again
          </button>

        </div>
      )}

      {loading && !error && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="animate-pulse"
            >
              <div className="aspect-[3/4] bg-[#f3f3f3]" />

              <div className="mt-4 h-3 w-1/3 bg-[#eeeeee]" />

              <div className="mt-2 h-4 w-3/4 bg-[#eeeeee]" />

              <div className="mt-3 h-3 w-1/2 bg-[#eeeeee]" />
            </div>
          ))}

        </div>
      )}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <div className="py-24 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f5]">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#777"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16.2 16.2" />
              </svg>
            </div>

            <h2 className="mt-5 font-['Manrope'] text-[24px] font-bold">
              No products yet
            </h2>

            <p className="mt-2 text-[13px] text-[#888]">
              We couldn't find products in this category.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block bg-[#171717] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white hover:bg-[#ff3f6c]"
            >
              Shop everything
            </Link>

          </div>
        )}

    </div>
  );
}

export default CategoryProducts;