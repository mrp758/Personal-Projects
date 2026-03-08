from pydantic import BaseModel
from uuid import UUID
from typing import List

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


class AllProdcutsViewAdmin(BaseModel):
    id: UUID
    name: str
    description: str
    type_field : str
    image_url: str
    created_at: str
    updated_at : str



class LoginCerds(BaseModel):
    access_token: str
    token_type: str

class ProductCreation(BaseModel):
    id: UUID
    name: str
    description: str
    image_url: str

