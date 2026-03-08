
async function handlePurchase(productId) {
         const response = await fetch(`/purchase-product/${productId}`, {
            method: "POST"
        });

        if (!response.ok) {
        const error = await response.json();
        localStorage.setItem("errorData", JSON.stringify(error));
        window.location.href = "/static/html pages/errorPage.html";
        }

        
        const returnedData = await response.json();
        localStorage.setItem("purchaseData", JSON.stringify(returnedData));
        window.location.href = "/static/html pages/checkoutPage.html";

}


async function loadProducts() {
    const response = await fetch("/products");
    const data = await response.json();
    const productArray = data["products"];

    let areaBlock = document.createElement("div");
    areaBlock.innerHTML = "";

    productArray.forEach(item => {

        const form = document.createElement("form");

        let image_url = document.createElement("p");
        let name = document.createElement("p");
        let description = document.createElement("p");
        let price = document.createElement("p");

        let purchaseButton = document.createElement("button");
        purchaseButton.type = "submit";

        const hiddenId = document.createElement("input");
        hiddenId.type = "hidden";
        hiddenId.name = "product_id";
        hiddenId.value = item.id;

        image_url.innerText = `Image URL: ${item.image_url}`;
        name.innerText = `Product Name: ${item.name}`;
        description.innerText = `Description: ${item.description}`;
        price.innerText = `Price: ${item.price}`;
        purchaseButton.innerText = "Buy Item";

        form.appendChild(image_url);
        form.appendChild(name);
        form.appendChild(description);
        form.appendChild(price);
        form.appendChild(hiddenId);
        form.appendChild(purchaseButton);

        form.addEventListener("submit", async function(event){
            event.preventDefault();

            const formData = new FormData(form);
            const productId = formData.get("product_id");

            handlePurchase(productId);
        });

        areaBlock.appendChild(form);
        areaBlock.appendChild(document.createElement("hr"));
    });

    document.body.appendChild(areaBlock);
}

loadProducts();