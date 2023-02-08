import "./Menu.css";

import Robusta from "../../assets/images/products/Robusta.jpg";
import Espresso from "../../assets/images/products/Espresso.jpg";
import Mocha from "../../assets/images/products/Mocha.jpg";
import ProductCard from "./ProductCard/ProductCard";
import { useCallback, useEffect, useState } from "react";

const productsData = [
  {
    id: "01",
    name: "Robusta",
    description: "abcscscsc",
    images: Robusta,
    price: 1000,
    category: "coffeeBeans",
  },
  {
    id: "02",
    name: "Stovetop Espresso Makers",
    description: "Stovetop Espresso Makers",
    images: Espresso,
    price: 1090,
    category: "coffeeFilters",
  },
  {
    id: "03",
    name: "Mocha",
    description: "Mocha",
    images: Mocha,
    price: 1050,
    category: "coffeeFilters",
  },
  {
    id: "04",
    name: "Instant Coffee",
    description: "Instant Coffee",
    images: Robusta,
    price: 0,
    category: "coffee",
  },
  {
    id: "05",
    name: "Ground Coffee",
    description: "Ground Coffee",
    images: Espresso,
    price: 0,
    category: "coffee",
  },
  {
    id: "06",
    name: "South Indian Filter Coffee",
    description: "South Indian Filter Coffee",
    images: Mocha,
    price: 0,
    category: "coffee",
  },
  {
    id: "07",
    name: "Decaf",
    description: "Decaf",
    images: "",
    price: 0,
    category: "coffee",
  },
  {
    id: "08",
    name: "Arabica",
    description: "Arabica",
    images: "",
    price: 0,
    category: "coffeeBeans",
  },
  {
    id: "09",
    name: "Green coffee Beans",
    description: "Green coffee Beans",
    images: "",
    price: 0,
    category: "coffeeBeans",
  },
  {
    id: "10",
    name: "Coffee Bean Grinders",
    description: "Coffee Bean Grinders",
    images: "",
    price: 0,
    category: "coffeeGear",
  },
  {
    id: "11",
    name: "Manual Grinders",
    description: "Manual Grinders",
    images: "",
    price: 0,
    category: "coffeeGear",
  },
  {
    id: "12",
    name: "Electric Grinders",
    description: "Electric Grinders",
    images: "",
    price: 0,
    category: "coffeeGear",
  },
  {
    id: "13",
    name: "Paper Coffee Filters",
    description: "Paper Coffee Filters",
    images: "",
    price: 0,
    category: "coffeeFilters",
  },
  {
    id: "14",
    name: "South Indian Filter Coffee Makers",
    description: "South Indian Filter Coffee Makers",
    images: "",
    price: 0,
    category: "coffeeFilters",
  },
  {
    id: "15",
    name: "French Press Coffee Makers",
    description: "French Press Coffee Makers",
    images: "",
    price: 0,
    category: "coffeeFilters",
  },
  {
    id: "16",
    name: "Milk Frothers",
    description: "Milk Frothers",
    images: "",
    price: 0,
    category: "brewingAccessories",
  },
  {
    id: "17",
    name: "Carafes",
    description: "Carafes",
    images: "",
    price: 0,
    category: "brewingAccessories",
  },
  {
    id: "18",
    name: "Stencils",
    description: "Stencils",
    images: "",
    price: 0,
    category: "brewingAccessories",
  },
  {
    id: "19",
    name: "Powder Sprinklers ",
    description: "Powder Sprinklers ",
    images: "",
    price: 0,
    category: "brewingAccessories",
  },
  {
    id: "20",
    name: "Milk Pitchers",
    description: "Milk Pitchers",
    images: "",
    price: 0,
    category: "brewingAccessories",
  },
  {
    id: "21",
    name: "Kettles",
    description: "Kettles",
    images: "",
    price: 0,
    category: "brewingAccessories",
  },
  {
    id: "22",
    name: "",
    description: "",
    images: "",
    price: 0,
    category: "mugs",
    comingSoon: true,
  },
  {
    id: "23",
    name: "",
    description: "",
    images: "",
    price: 0,
    category: "gifting",
    comingSoon: true,
  },
  {
    id: "24",
    name: "",
    description: "",
    images: "",
    price: 0,
    category: "baristaToolKits",
    comingSoon: true,
  },
];

const Menu = () => {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState();
  const [filterState, setFilterState] = useState("coffee");
  const [filterProductData, setFilterProductData] = useState([]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);

    const filteredRows = [];
    (products || []).forEach((et) => {
      if (
        (et.name || "")
          .toLowerCase()
          .includes((e.target.value || "").toLowerCase())
      ) {
        filteredRows.push({ ...et });
      }
    });
    setProducts(filteredRows);
  }, []);

  useEffect(() => {
    if (products || filterState) {
      let filteredData = products?.filter((er) => er?.category === filterState);
      setFilterProductData(filteredData);
    }
  }, [products, filterState]);

  return (
    <div>
      <div className="search-box">
        <div class="form-group has-search">
          <div class="searchbar">
            <div class="searchbar-wrapper">
              <div class="searchbar-left">
                <div class="search-icon-wrapper">
                  <span class="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                  </span>
                </div>
              </div>

              <div class="searchbar-center">
                <div class="searchbar-input-spacer"></div>

                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  class="searchbar-input"
                  maxlength="2048"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div
            class={`col custom-menu-col ${
              filterState === "coffee" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("coffee");
              }}
            >
              Coffee
            </button>
          </div>
          <div
            class={`col custom-menu-col ${
              filterState === "coffeeBeans" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("coffeeBeans");
              }}
            >
              Coffee Beans
            </button>
          </div>
          <div
            class={`col custom-menu-col ${
              filterState === "coffeeGear" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("coffeeGear");
              }}
            >
              Coffee Gear
            </button>
          </div>

          <div
            class={`col custom-menu-col ${
              filterState === "coffeeFilters" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("coffeeFilters");
              }}
            >
              Coffee Filters
            </button>
          </div>
        </div>
        <div class="row justify-content-center align-items-center">
          <div
            class={`col custom-menu-col ${
              filterState === "brewingAccessories" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("brewingAccessories");
              }}
            >
              Brewing Accessories
            </button>
          </div>
          <div
            class={`col custom-menu-col ${
              filterState === "mugs" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("mugs");
              }}
            >
              Mugs
            </button>
          </div>
          <div
            class={`col custom-menu-col ${
              filterState === "gifting" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("gifting");
              }}
            >
              Gifting
            </button>
          </div>
          <div
            class={`col custom-menu-col ${
              filterState === "baristaToolKits" ? "activeState" : ""
            }`}
          >
            <button
              onClick={() => {
                setFilterState("baristaToolKits");
              }}
            >
              Barista Tool Kits
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="container" id="container">
          {filterProductData &&
            filterProductData.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}

          {filterProductData?.length === 0 && (
            <div class="wrapper mt-5">
              <h1>
                No Products Found<span class="dot"></span>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
