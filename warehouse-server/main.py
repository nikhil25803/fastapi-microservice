from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


redis = get_redis_connection(
    host="redis-12137.c241.us-east-1-4.ec2.cloud.redislabs.com",
    port=12137,
    password="bthiIrr1ZvXQyhzwf0CzssrIdsPi22yE",
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
