import time
from main import redis, Product


key = "order-completed"
group = "warehouse-group"

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

                try:

                    product = Product.get(obj["product_id"])
                    product.quantity -= int(obj["quantity"])
                    product.save()
                    print(product)
                except:
                    redis.xadd(
                        name="refund-order",
                        fields=obj
                    )
    except Exception as e:
        print(str(e))
    time.sleep(3)


'''
[
    ['order-completed', 
        [
            ('1681073205632-0', {'pk': '01GXKWAQG5R8FH8924E6YSJNJT', 'product_id': '01GXKTK5EF5PPY8K2DS6KD0V5J', 'price': '1000.0', 'fee': '200.0', 'total': '1200.0', 'quantity': '5', 'status': 'completed'})
        ]
    ]
]
'''
