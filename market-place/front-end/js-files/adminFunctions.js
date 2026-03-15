

document.getElementById("getProductForm").addEventListener("submit", async function(event){
  event.preventDefault();
   let userToken =  JSON.parse(sessionStorage.getItem("token"));
   const response = await  fetch("URL-PATH/admin/products/",{
      method: "GET",
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `${userToken.token_type} ${userToken.access_token}`
      }
   });
    const data = await response.json();

    sessionStorage.setItem("productsResult",JSON.stringify(data));
    window.location.href = "/static/html-pages/productDisplayAdmin.html";
});


document.getElementById("createProduct").addEventListener("submit", async function (event){
  event.preventDefault();
  let userToken =  JSON.parse(sessionStorage.getItem("token"));
  const formData = new FormData();
  formData.append("product_name", document.getElementById("productName").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("product_type", document.getElementById("productType").value);
  formData.append("image_url", document.getElementById("imageUrl").value);

  const response = await fetch("URL-PATH/admin/create-product", {
  method: "POST",
  body: formData,
  headers: {
        'Authorization': `${userToken.token_type} ${userToken.access_token}`
      }
  });

  if(document.getElementById("messageFromServer")){
        document.getElementById("messageFromServer").remove();
  }
  const returnedData = await response.json();
  let elementCreation = document.createElement("p");
  elementCreation.setAttribute("id","messageFromServer");
  elementCreation.innerText = JSON.stringify(returnedData);
  document.body.appendChild(elementCreation);
  document.getElementById("createProduct").reset();

});

document.getElementById("clearFieldsCreateForm").addEventListener("click",function(event){
   event.preventDefault();
   document.getElementById("createProduct").reset();
});


document.getElementById("deleteForm").addEventListener("submit", async function(event){
  event.preventDefault();
  let userToken =  JSON.parse(sessionStorage.getItem("token"));
  const productId = document.getElementById("productID").value;
  const response = await fetch(`URL-PATH/admin/delete-product/${productId}`, {
  method: "DELETE",
  headers: {
        'Authorization': `${userToken.token_type} ${userToken.access_token}`
      }
  });

  if(document.getElementById("messageFromServer")){
        document.getElementById("messageFromServer").remove();
  }
  const returnedData = await response.json();
  let elementCreation = document.createElement("p");
  elementCreation.setAttribute("id","messageFromServer");
  elementCreation.innerText = JSON.stringify(returnedData);
  document.body.appendChild(elementCreation);
  document.getElementById("deleteForm").reset();
});




document.getElementById("patchForm").addEventListener("submit", async function(event){
  event.preventDefault();
  let userToken =  JSON.parse(sessionStorage.getItem("token"));
  const formData = new FormData();

  formData.append("table_name", document.getElementById("tableName").value);
  formData.append("column_name", document.getElementById("columnName").value);
  formData.append("product_id", document.getElementById("product_id").value);
  formData.append("current_column_value", document.getElementById("currentColumnValue").value);
  formData.append("new_column_value", document.getElementById("newColumnValue").value);

  const response = await fetch("URL-PATH/admin/update-items", {
    method: "PATCH",
    body: formData,
    headers: {
        'Authorization': `${userToken.token_type} ${userToken.access_token}`
    }
  });

  if(document.getElementById("messageFromServer")){
        document.getElementById("messageFromServer").remove();
  }

  const returnedData = await response.json();
  let elementCreation = document.createElement("p");
  elementCreation.setAttribute("id","messageFromServer");
  elementCreation.innerText = JSON.stringify(returnedData);
  document.body.appendChild(elementCreation);
  document.getElementById("patchForm").reset();
});


