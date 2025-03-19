import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.imageUrl} alt={data.name} />
      <p>{data.description}</p>
      <p>Price: {data.price.discounted}</p>
    </div>
  );
};

export default ProductDetails;
