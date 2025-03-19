const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      alert("Product uploaded successfully!");
      fetchData();
    } else {
      alert(responseData.message);
    }
  } catch (error) {
    console.error("Error uploading product:", error);
  }
};
