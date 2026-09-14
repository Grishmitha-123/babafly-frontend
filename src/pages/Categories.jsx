import { Link } from "react-router-dom";

const categories = [
  {
    name: "Women",
    id: "women",
    description: "Dresses, shoes, bags & jewellery",
  },
  {
    name: "Men",
    id: "men",
    description: "Shirts, shoes & watches",
  },
  {
    name: "Kids",
    id: "kids",
    description: "Styles for little ones",
  },
  {
    name: "Footwear",
    id: "footwear",
    description: "Shoes for every occasion",
  },
  {
    name: "Accessories",
    id: "accessories",
    description: "Bags, jewellery, watches & more",
  },
  {
    name: "Beauty",
    id: "beauty",
    description: "Beauty, skincare & fragrances",
  },
  {
    name: "New In",
    id: "new-in",
    description: "Fresh styles just added",
  },
  {
    name: "Sale",
    id: "sale",
    description: "Big styles. Better prices.",
  },
];

function Categories() {
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

          <span>Categories</span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
          Shop your way
        </p>

        <h1 className="mt-2 font-['Manrope'] text-[36px] font-extrabold tracking-[-1.5px] sm:text-[44px]">
          Categories
        </h1>

        <p className="mt-3 max-w-[570px] text-[13px] leading-6 text-[#777]">
          Browse BabaFly by what you're looking for.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="group border border-[#eeeeee] p-7 transition hover:border-black hover:bg-black hover:text-white"
          >
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
              Explore
            </p>

            <h2 className="mt-3 font-['Manrope'] text-[25px] font-extrabold">
              {category.name}
            </h2>

            <p className="mt-2 text-[12px] text-[#777] group-hover:text-white/70">
              {category.description}
            </p>

            <span className="mt-7 block text-[11px] font-bold uppercase tracking-[1px]">
              Shop now →
            </span>
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Categories;