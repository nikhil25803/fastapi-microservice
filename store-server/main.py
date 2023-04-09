from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel
import requests


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


class ProductOrder(HashModel):
    product_id: str
    quantity: int

    class Meta:
        databse = redis


class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str

    class Meta:
        database = redis


@app.post("/orders")
def create(product_order: ProductOrder):
    req = requests.get(
        f"http://127.0.0.1:8000/product/{product_order.product_id}")
    product = req.json()
    fee = product["price"] * 0.2

    order = Order(
        product_id=product_order.product_id,
        price=product["price"],
        fee=fee,
        total=product["price"] + fee,
        quantity=product_order.quantity,
        status="pending"
    )

    return order.save()


def format(pk: str):
    order = Order.get(pk)
    return {
        "id": order.pk,
        "product_id": order.product_id,
        "fee": order.fee,
        "total": order.total,
        "quantity": order.quantity,
        "status": order.status
    }


@app.get('/orders/{pk}')
def get(pk: str):
    return format(pk)


@app.get("/orders")
def get_all():
    return [
        format(pk)
        for pk in Order.all_pks()
    ]
