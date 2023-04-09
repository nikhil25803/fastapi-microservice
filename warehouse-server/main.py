from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel
from dotenv import load_dotenv
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Redis Connection
redis = get_redis_connection(
    host=os.getenv("HOST"),
    port=int(os.getenv("PORT")),
    password=os.getenv("PASSWORD"),
    decode_responses=True
)

class Product(HashModel):
    name: str
    price: float
    quantity: int

    class Meta:
        database = redis


@app.post('/product')
def create(product: Product):

    return product.save()


@app.get("/product/{pk}")
def get(pk: str):
    return Product.get(pk)


#  Helper function
def format(pk: str):
    product = Product.get(pk)
    return {
        "id": product.pk,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity
    }


@app.get("/product")
def all():
    # return Product.all_pks()
    return [
        format(pk)
        for pk in Product.all_pks()
    ]


@app.delete("/product/{pk}")
def delete(pk: str):
    return Product.delete(pk)
