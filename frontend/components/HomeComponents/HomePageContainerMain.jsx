/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import React, { useEffect } from "react";
import { ProductPageContainerTop } from "../ProductComponents/ProductPageContainerMain";
import HomePageBottom from "./HomePageBottom";
import HomePageVideo from "./HomePageViedo";
import ProductCard from "../ProductComponents/ProductCard";
import SmoothList from "react-smooth-list";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { CategoriesHorizontal } from "../ProductComponents/Categories";
import ProductApiHandler from "../../apiHandlers/ProductApiHandler";
import LoadingScreen from "../common/LoadingScreen";
import NoDataFound from "../common/NoDataFound";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Main : HomePageContainerMain.
/* ----------------------------------------------------------------------------------------------------- */

const HomePageContainerMain = () => {
  const {
    productList,
    getProductList,
    searchProductByCategory,
    isLoading,
    searchProductByName,
    initialProductList,
  } = ProductApiHandler();

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      {/* Homepage Top Div */}
      <div className="flex flex-col container mx-auto p-6 rounded-2xl gap-2 tracking-wider">
        <ProductPageContainerTop searchProductByName={searchProductByName} />
        <CategoriesHorizontal
          searchProductByCategory={searchProductByCategory}
        />
        <HomeProductList
          isLoading={isLoading}
          productList={productList}
          initialProductList={initialProductList}
        />
      </div>
      {/*Homepage Bot Div */}
      <HomePageBottom />
    </div>
  );
};

// Homepage Product list
const HomeProductList = ({ isLoading, productList, initialProductList }) => {
  const navigate = useNavigate();

  // If loading, display loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Slice the first 8 products for display
  const visibleProducts = productList ? productList.slice(0, 8) : [];
  // Products to display based on visibility
  const displayProducts =
    visibleProducts.length === 0
      ? initialProductList.slice(0, 8)
      : visibleProducts;

  return (
    <SmoothList delay={200} className="mb-10">
      {/* Check if both productList and initialProductList are empty */}
      {productList.length === 0 && initialProductList.length === 0 ? (
        // If no products
        <div className="text-center text-gray-500 font-semibold w-full bg-gray-300 rounded-2xl">
          <NoDataFound
            title={"No Products Available Yet"}
            bgcolor={"bg-white/50 backdrop-blur-sm"}
          />
        </div>
      ) : (
        // Product Cards Section
        <SmoothList
          delay={200}
          className="product-6 grid xl:grid-cols-4 lg:grid-cols-3 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1 py-8"
        >
          {/* Map through the products to render ProductCard components */}
          {displayProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </SmoothList>
      )}

      {/* "See All Products" Button Section */}
      <div className="flex justify-center items-center">
        <Button
          onClick={() => navigate("/products")}
          className="md:hidden block px-4 py-1 rounded-full hover:border hover:border-black focus:border focus:border-black  focus:bg-black hover:text-white hover:bg-black focus:text-white border border-slate-500 bg-white flex items-start font-semibold text-sm max-w-max"
        >
          See All Products
        </Button>
      </div>
    </SmoothList>
  );
};
export default HomePageContainerMain;
