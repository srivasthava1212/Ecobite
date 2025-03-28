import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  console.log("Data", data);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("before cart Data:", responseData.data);
      if (responseData.success) {
        console.log("Cart Data:", responseData.data); // Debugging line
        setData(responseData.data);
      } else {
        setData([]); // Prevents undefined data access
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateCartQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty,
        }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * (curr?.price?.discounted || 0),
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {!loading && data.length === 0 && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View Products */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((_, index) => (
                <div
                  key={"cart-loading-" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
            : data.map(
                (
                  /* In the provided code snippet, `product` is being used as a variable to
            represent each item in the `data` array. It is used within a `map` function
            to iterate over each product in the cart and display relevant information
            about that product, such as its image, name, category, price, quantity, and
            options to update or delete the product. */
                  product
                ) => {
                  //   const productData = product?._id || {}; // Ensuring productId is available
                  return (
                    <div
                      key={product?._id}
                      className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                    >
                      <div className="w-32 h-32 bg-slate-200">
                        {product.image?.length > 0 ? (
                          <img
                            src={product.image}
                            alt={product.name || "Product image"}
                            className="w-full h-full object-scale-down mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="px-4 py-2 relative">
                        {/* Delete Product */}
                        <div
                          className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                          onClick={() => deleteCartProduct(product?._id)}
                        >
                          <MdDelete />
                        </div>

                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                          {product.name || "Unknown Product"}
                        </h2>
                        <p className="capitalize text-slate-500">
                          {product.category || "Uncategorized"}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-red-600 font-medium text-lg">
                            {displayINRCurrency(product.price.discounted || 0)}
                          </p>
                          <p className="text-slate-600 font-semibold text-lg">
                            {displayINRCurrency(
                              (product.price.discounted || 0) * product.quantity
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            onClick={() =>
                              product.quantity > 1 &&
                              updateCartQty(product?._id, product?.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{product?.quantity}</span>
                          <button
                            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                            onClick={() =>
                              updateCartQty(product?._id, product?.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
        </div>

        {/* Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>

              <button className="bg-blue-600 p-2 text-white w-full mt-2">
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
