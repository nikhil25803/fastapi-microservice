import time
from main import redis, Order


key = "refund-order"
group = "payment"

try:
    redis.xgroup_create(
        name=key,
        groupname=group,
        mkstream=True
    )
    print("Group Created")
except Exception as e:
    print(e)

while True:
    try:
        results = redis.xreadgroup(
            groupname=group,
            consumername=key,
            streams={key: ">"}
        )
        print(results)
        if results != []:
            for result in results:
                obj = result[1][0][1]
                #  Here, we have an order but do not have a product
                order = Order.get(obj["pk"])
                order.status = "refunded"
                order.save()
                print(order)

    except Exception as e:
        print(str(e))
    time.sleep(3)

