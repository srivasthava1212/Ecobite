import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryApi.categoryWiseProduct.url, {
    method: SummaryApi.categoryWiseProduct.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });

  const dataResponse = await response.json();
  return dataResponse.data || [];
};

export default fetchCategoryWiseProduct;
