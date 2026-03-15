   const result = JSON.parse(sessionStorage.getItem("productsResult"));
   const productArray = result["products"];
   let areaBlock = document.createElement("div");
    areaBlock.innerHTML = "";
    productArray.forEach(item => {

        let id = document.createElement("p");
        let name = document.createElement("p");
        let description = document.createElement("p");
        let type = document.createElement("p");
        let imageUrl = document.createElement("p");
        let createdAt = document.createElement("p");
        let updatedAt = document.createElement("p");

        id.innerText = `ID Product: ${item.id}`;
        name.innerText = `Product Name: ${item.name}`;
        description.innerText = `Description: ${item.description}`;
        type.innerText = `Type: ${item.type}`;
        imageUrl.innerText = `Image URL: ${item.image_url}`;
        createdAt.innerText = `Created At: ${item.created_at}`;
        updatedAt.innerText = `Updated At: ${item.updated_at}`;

        areaBlock.appendChild(id);
        areaBlock.appendChild(name);
        areaBlock.appendChild(description);
        areaBlock.appendChild(imageUrl);
        areaBlock.appendChild(createdAt);
        areaBlock.appendChild(updatedAt);
        areaBlock.appendChild(document.createElement("br"));
    });
document.body.appendChild(areaBlock);