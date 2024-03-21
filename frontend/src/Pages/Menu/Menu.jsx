import "./Menu.css";

import ProductCard from "./ProductCard/ProductCard";
import { useCallback, useEffect, useState } from "react";
import { productsData } from "../../Helper/_helper";
import { useParams } from "react-router-dom";
import { allProductByCategoryIdApi } from "../../libs/api";
import { useToasts } from "react-toast-notifications";

const Menu = () => {
  const params = useParams();
  const { addToast } = useToasts();

  const [products, setProducts] = useState();
  console.log("products: ", products);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(true);
  const [filterProductData, setFilterProductData] = useState([]);
  console.log("filterProductData: ", filterProductData);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if (e.target.value) {
      const filteredRows = [];
      console.log(filterProductData);
      (filterProductData || []).forEach((et) => {
        console.log("et: ", et);
        if (
          (et.productName || "")
            .toLowerCase()
            .includes((e.target.value || "").toLowerCase())
        ) {
          filteredRows.push({ ...et });
        }
      });
      setFilterProductData(filteredRows);
    } else {
      setFilterProductData(products);
    }
  }, []);

  // useEffect(() => {
  //   if (products || filterState) {
  //     let filteredData = products?.filter((er) => er?.category === filterState);
  //     setFilterProductData(filteredData);
  //     setSearch("");
  //   }
  // }, [products, filterState]);

  const callAPI = useCallback(async () => {
    try {
      const apiCall = await allProductByCategoryIdApi(params?.categoryMenu);
      console.log("apiCall: ", apiCall);
      if (apiCall.status === 200) {
        setFilterProductData(apiCall?.data?.rows);
        setProducts(apiCall?.data?.rows);
        setSearch("");
        setLoading(false);
      } else {
        setLoading(false);
        addToast(apiCall.err_msg, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [addToast]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

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
