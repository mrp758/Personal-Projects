from fastapi import FastAPI,HTTPException,Depends,Header,Form
from fastapi.staticfiles import StaticFiles
import uuid
import os
import sys

current_dir = os.getcwd()
app = FastAPI()
app.mount("/static", StaticFiles(directory=os.path.join(current_dir,"../../","front-end")), name="static")

sys.path.extend([
    os.path.abspath(os.path.join(current_dir, "..")),
])

from repository import db_connection,db_customer,db_reseller,db_admin
from models import base_models
from service import auth

access_to_db = db_connection.create_connection("YOUR HOST","DB USERNAME","DB PASSWORD","market_place")
handler_auth = auth.authenticate_user(access_to_db)
customer_handler = db_customer.customer_db(access_to_db)
reseller_handler = db_reseller.reseller_db(access_to_db)
admin_handler = db_admin.admin_access_db(access_to_db)
base_models_handler = base_models


def validate_authorization(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail={"error_code": "UNAUTHORIZED","message": "missing or invalid token"})
    token = authorization.split(" ")[1]
    error = handler_auth.verify_token(token)
    if error:
        raise HTTPException(status_code=401, detail={"error_code": "UNAUTHORIZED","message":"JWT token is not valid"})

def grant_token_to_user(result):
    token_data = {
        "jti" : str(uuid.uuid4()),
        "sub": result['username'],
        "role": result['role']
    }
    access_token,session_error = handler_auth.create_access_token(token_data)

    if session_error == 403:
        raise HTTPException(status_code=403, detail={"error_code": "Forbidden","message": "JWT token is valid and already exists!"})

    return {"access_token": access_token, "token_type": "Bearer"}




@app.post("/login")
async def login(user_name:str = Form(...),password:str = Form(...), jwt_token:str = Form(...)):
    result,login_error = handler_auth.handle_login(user_name,password)
    if login_error == 401:
        raise HTTPException(status_code=401, detail={"error_code": "UNAUTHORIZED","message": "username or password is invalid"})
    
    elif jwt_token != "None":
        result = handler_auth.check_if_user_has_token(jwt_token)
        if result == 200:
            return {"server_code": result}
        else:
            raise HTTPException(status_code=403, detail={"error_code": "UNAUTHORIZED","message":"JWT token is not valid, Please login again to get a new JWT token"})
    else:
        return grant_token_to_user(result)




@app.post("/api/v1/authenticate/",response_model=base_models_handler.LoginCerds)
async def login_to_get_token(user_name:str,password:str):
    result,login_error = handler_auth.handle_login(user_name,password)
    if login_error == 401:
        raise HTTPException(status_code=401, detail={"error_code": "UNAUTHORIZED","message": "username or password is invalid"})
    token_data = {
        "jti" : str(uuid.uuid4()),
        "sub": result['username'],
        "role": result['role']
    }
    access_token,session_error = handler_auth.create_access_token(token_data)

    if session_error == 403:
        raise HTTPException(status_code=403, detail={"error_code": "Forbidden","message": "JWT token is valid and already exists!"})

    return {"access_token": access_token, "token_type": "Bearer"}




@app.get("/products", response_model=base_models_handler.ProductList)
async def display_all_products():
    return {"products":customer_handler.view_items()}




@app.post("/purchase-product/{product_id}", response_model=base_models_handler.SoldProduct)
async def purchase_product(product_id:base_models_handler.UUID):
    result,error_detected = customer_handler.marked_item_as_sold(product_id)
    if error_detected == 404:
        raise HTTPException(status_code=404, detail={"error_code": "PRODUCT_NOT_FOUND","message": f"Product {product_id} not found"})
    elif error_detected == 409:
        raise HTTPException(status_code=409, detail={"error_code": "PRODUCT_ALREADY_SOLD","message": f"Product {product_id} has already been sold"})
    
    return {
        "coupon_value": result['coupon_value']
    }




@app.get("/api/v1/products", response_model=base_models_handler.ProductList)
async def display_all_products(_=Depends(validate_authorization)):
    return {"products": reseller_handler.view_items()}



@app.get("/api/v1/products/{product_id}", response_model=base_models_handler.Product)
async def display_product_by_id(product_id:base_models_handler.UUID,_=Depends(validate_authorization)):
    result,error_detected = reseller_handler.view_item_by_id(product_id)
    if error_detected == 404:
        raise HTTPException(status_code=404, detail={"error_code": "PRODUCT_NOT_FOUND","message": f"Product {product_id} not found"})
    return {
        "id": result['id'],
        "name": result['name'],
        "description": result['description'],
        "image_url": result['image_url'],
        "price": result['price']
    }



@app.post("/api/v1/products/{product_id}/purchase", response_model=base_models_handler.ResellerPrice)
async def reseller_purchase_item(product_id: base_models_handler.UUID, reseller_price: float,_=Depends(validate_authorization)):
    result,error_detected,minimun_price = reseller_handler.mark_items_as_sold(product_id, reseller_price)
    if error_detected == 404:
        raise HTTPException(status_code=404, detail={"error_code": "PRODUCT_NOT_FOUND","message": f"Product {product_id} not found"})
    elif error_detected == 400:
        raise HTTPException(status_code=400, detail={"error_code": "RESELLER_PRICE_TOO_LOW","message": f"Reseller price {reseller_price} is below minimum price {minimun_price}"})
    return {
        "product_id": result['product_id'],
        "reseller_price": result['reseller_price'],
        "value_type": result['value_type'],
        "value": result['value']
    }



@app.get("/admin/products/")
async def display_all_products(_=Depends(validate_authorization)):
    return {"products": admin_handler.view_items()}


@app.post("/admin/create-product",response_model=base_models_handler.ProductCreation)
async def create_new_product(product_name:str = Form(...),description:str = Form(...), product_type:str = Form(...), image_url:str = Form(...),_=Depends(validate_authorization)):
    result = admin_handler.create_and_show_item(product_name,description,product_type,image_url)
    return {
        "id": result['id'],
        "name": result['name'],
        "description": result['description'],
        "image_url": result['image_url']
    }


@app.delete("/admin/delete-product/{product_id}")
async def delete_product(product_id:base_models_handler.UUID,_=Depends(validate_authorization)):
    admin_handler.delete_item(product_id)
    return {"product was deleted!"}



@app.patch("/admin/update-items/")
async def update_item_in_market_place(table_name:str = Form(...), column_name: str = Form(...),product_id:base_models_handler.UUID = Form(...),current_column_value: str = Form(...), new_column_value: str = Form(...),_=Depends(validate_authorization)):
    admin_handler.update_item(table_name, column_name, product_id, current_column_value, new_column_value)
    return {"Items were updated"}
