

document.getElementById("deleteForm").addEventListener("submit", async function(event){
  event.preventDefault();
  const productId = document.getElementById("productID").value;
  const response = await fetch(`/admin/delete-product/${productId}`, {
  method: "DELETE"
  });
  const returnedData = await response.json();
  let elementCreation = document.createElement("p");
  elementCreation.innerText = JSON.stringify(returnedData);
  document.body.appendChild(elementCreation);
});




document.getElementById("patchForm").addEventListener("submit", async function(event){
  event.preventDefault();

  const formData = new FormData();

  formData.append("table_name", document.getElementById("table_name").value);
  formData.append("column_name", document.getElementById("column_name").value);
  formData.append("product_id", document.getElementById("product_id").value);
  formData.append("current_column_value", document.getElementById("current_column_value").value);
  formData.append("new_column_value", document.getElementById("new_column_value").value);

  const response = await fetch("/admin/update-items", {
    method: "PATCH",
    body: formData
  });

  const returnedData = await response.json();

  let elementCreation = document.createElement("p");
  elementCreation.innerText = JSON.stringify(returnedData);
  document.body.appendChild(elementCreation);
});


