from pydantic import BaseModel
from uuid import UUID
from typing import List,Optional

class Product(BaseModel):
    id: UUID
    name: str
    description: str
    image_url: str
    price: float

class SoldProduct(BaseModel):
    coupon_value: str

class ResellerPrice(BaseModel):
    product_id: UUID
    reseller_price: float
    value_type: str
    value: str

class ProductList(BaseModel):
    products: List[Product]




class LoginCerds(BaseModel):
    access_token: str
    token_type: str

class ProductCreation(BaseModel):
    id: UUID
    name: str
    description: str
    image_url: str

