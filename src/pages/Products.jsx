import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/axios";
import ProductCard from "../components/ProductCard";

const categoryOptions = [
  {
    label: "All products",
    value: "all",
  },
  {
    label: "Women's fashion",
    value: "women",
  },
  {
    label: "Men's fashion",
    value: "men",
  },
  {
    label: "Footwear",
    value: "footwear",
  },
  {
    label: "Accessories",
    value: "accessories",
  },
  {
    label: "Beauty",
    value: "beauty",
  },
  {
    label: "New In",
    value: "new-in",
  },
  {
    label: "Sale",
    value: "sale",
  },
];

const categoryGroups = {
  women: [
    "womens-dresses",
    "womens-shoes",
    "womens-bags",
    "womens-jewellery",
  ],

  men: [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
  ],

  footwear: [
    "mens-shoes",
    "womens-shoes",
  ],

  accessories: [
    "womens-bags",
    "womens-jewellery",
    "mens-watches",
    "sunglasses",
    "mobile-accessories",
  ],

  beauty: [
    "beauty",
    "skin-care",
    "fragrances",
  ],
};

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || ""; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products?limit=0");

        setProducts(response.data.products || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
      CATEGORY FILTER
    */
    if (category === "women") {
      result = result.filter((product) =>
        categoryGroups.women.includes(product.category)
      );
    }

    if (category === "men") {
      result = result.filter((product) =>
        categoryGroups.men.includes(product.category)
      );
    }

    if (category === "footwear") {
      result = result.filter((product) =>
        categoryGroups.footwear.includes(product.category)
      );
    }

    if (category === "accessories") {
      result = result.filter((product) =>
        categoryGroups.accessories.includes(product.category)
      );
    }

    if (category === "beauty") {
      result = result.filter((product) =>
        categoryGroups.beauty.includes(product.category)
      );
    }

    if (category === "new-in") {
      result = result
        .sort((a, b) => b.id - a.id)
        .slice(0, 24);
    }

    if (category === "sale") {
      result = result.filter(
        (product) =>
          Number(product.discountPercentage || 0) > 0
      );
    }

    /*
      SEARCH
    */
    const activeSearch = search.trim() || urlSearch.trim();

if (activeSearch) {
  const query = activeSearch.toLowerCase().trim();
      result = result.filter((product) => {
        return (
          product.title?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
        );
      });
    }

    /*
      SORT
    */
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "discount") {
      result.sort(
        (a, b) =>
          Number(b.discountPercentage || 0) -
          Number(a.discountPercentage || 0)
      );
    }

    return result;
    }, [products, category, search, urlSearch, sort]);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10">

      {/* HEADER */}
      <div className="border-b border-[#eeeeee] pb-8">

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-[#999]">
              <Link
                to="/"
                className="hover:text-[#ff3f6c]"
              >
                Home
              </Link>

              <span>/</span>

              <span>Shop</span>
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
              The collection
            </p>

            <h1 className="mt-2 font-['Manrope'] text-[36px] font-extrabold tracking-[-1.5px] sm:text-[44px]">
              Shop everything
            </h1>

            <p className="mt-3 max-w-[570px] text-[13px] leading-6 text-[#777]">
              Explore the full BabaFly collection and find your next
              favourite piece.
            </p>

          </div>

          {/* SEARCH */}
          <div className="flex h-[46px] w-full border border-[#dddddd] bg-white lg:max-w-[390px]">

            <div className="flex w-[46px] items-center justify-center text-[#777]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L16.2 16.2" />
              </svg>
            </div>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products, brands..."
              className="w-full bg-transparent pr-4 text-[13px] outline-none placeholder:text-[#aaa]"
            />

          </div>

        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col gap-5 border-b border-[#eeeeee] py-6 lg:flex-row lg:items-center lg:justify-between">

        {/* CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto">

          {categoryOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setCategory(option.value)
              }
              className={`shrink-0 px-4 py-2.5 text-[11px] font-semibold transition ${
                category === option.value
                  ? "bg-[#171717] text-white"
                  : "bg-[#f5f5f5] text-[#555] hover:bg-[#eeeeee]"
              }`}
            >
              {option.label}
            </button>
          ))}

        </div>

        {/* SORT */}
        <div className="flex shrink-0 items-center gap-3">

          <span className="text-[11px] text-[#999]">
            Sort by
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="border border-[#dddddd] bg-white px-4 py-2.5 text-[11px] font-semibold outline-none"
          >
            <option value="featured">
              Featured
            </option>

            <option value="price-low">
              Price: Low to high
            </option>

            <option value="price-high">
              Price: High to low
            </option>

            <option value="rating">
              Highest rated
            </option>

            <option value="discount">
              Biggest discount
            </option>
          </select>

        </div>

      </div>

      {/* RESULT COUNT */}
      <div className="py-6">

        <p className="text-[12px] text-[#777]">

          {loading
            ? "Loading collection..."
            : `${filteredProducts.length} products`}

          {search && (
            <>
              {" "}
              for{" "}
              <span className="font-semibold">
                "{search}"
              </span>
            </>
          )}

        </p>

      </div>

      {/* ERROR */}
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
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 bg-[#171717] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white hover:bg-[#ff3f6c]"
          >
            Try again
          </button>

        </div>
      )}

      {/* LOADING */}
      {loading && !error && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">

          {[1, 2, 3, 4, 5, 6, 7, 8].map(
            (item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[3/4] bg-[#f3f3f3]" />

                <div className="mt-4 h-3 w-1/3 bg-[#eeeeee]" />

                <div className="mt-2 h-4 w-3/4 bg-[#eeeeee]" />

                <div className="mt-3 h-3 w-1/2 bg-[#eeeeee]" />
              </div>
            )
          )}

        </div>
      )}

      {/* PRODUCTS */}
      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>
        )}

      {/* EMPTY */}
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
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />

                <path d="M20 20L16.2 16.2" />
              </svg>

            </div>

            <h2 className="mt-5 font-['Manrope'] text-[24px] font-bold">
              Nothing found
            </h2>

            <p className="mt-2 text-[13px] text-[#888]">
              Try another search or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-6 bg-[#171717] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-white transition hover:bg-[#ff3f6c]"
            >
              Clear filters
            </button>

          </div>
        )}

    </div>
  );
}

export default Products;