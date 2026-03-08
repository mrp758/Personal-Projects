<strong> how to run the project </strong>

1. clone project
2. docker-compose up --build - start the project
3. docker-compose down -v - If you want to remove volumes (database reset)

<strong> Endpoints </strong>

<strong> In reseller endpoints I used curl to any /api/v1/...  </strong>

But first make sure you go to the /authenticate - to get a token, The token lasts 15 minutes

curl -H "Authorization: Bearer <YOUR_TOKEN>" <DOCKER_BASE_URL>/api/v1/products - get products

curl -H "Authorization: Bearer <YOUR_TOKEN>" <DOCKER_BASE_URL>/api/v1/products/<product id> - single product

curl -X POST "<DOCKER_BASE_URL>/api/v1/products/<YOUR_PRODUCTID>/purchase?reseller_price=<YOUR_PRICE>" \
     -H "Authorization: Bearer <YOUR_TOKEN>" - To purchase the item at lower/minimum sell price

<strong> The rest of the end points are used with html pages and javascript files to make UI and fetching information </strong>
