import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  // console.log(`📤 Requesting products for category: "${category}"`); // Debugging

  const response = await fetch(SummaryApi.categoryWiseProduct.url, {
    method: SummaryApi.categoryWiseProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });

  const dataResponse = await response.json();

  // console.log(`📥 Response for "${category}":`, dataResponse); // Debugging

  return dataResponse.data || [];
};

export default fetchCategoryWiseProduct;
