import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PRODUCTS_URL = "http://127.0.0.1:8000/"
const ORDER_URL = "http://127.0.0.1:8001/"

export const Order = () => {
    const [id, setId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [message, setMessage] = useState("")
    const [productName, setProductName] = useState("")

    const naviagate = useNavigate()

    useEffect(() => {
        fetch(

            PRODUCTS_URL + "product/" + id
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                return response
            })
            .then(data => {
                console.log(data);
                const price = parseFloat(data.price * 0.2)
                setMessage(`Your product price is ${price}`)
                setProductName(`Name of Product: ${data.name}`)
            })
            .catch(err => {
                console.log(err);
            })

    }, [id])

    const handleCreate = (event) => {
        event?.preventDefault();

        const json_string = JSON.stringify({
            "product_id": id,
            "quantity": quantity
        })

        const requestOptions = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: json_string
        }

        fetch(
            ORDER_URL + "orders",
            requestOptions
        )
            .then(response => {
                if (!response.ok) {
                    throw response
                }
            })
            .then(data => {
                setMessage(`Order for ${quantity} items sent`)
                naviagate("/")
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="body">

            <div className="order_title title">
                Create Order
            </div>
            <div>
                <input
                    className="input-1"
                    placeholder="Product ID..."
                    onChange={(event) => setId(event.target.value)}
                >
                </input>
                <div>
                    {productName}
                </div>
                <input
                    className="input-1"
                    placeholder="Quantity ID..."
                    onChange={(event) => setQuantity(event.target.value)}
                >
                </input>
                <button className="button-4" onClick={handleCreate}>
                    Place Order
                </button>
            </div>

            <div className="message">
                {
                    message
                }
            </div>
        </div>
    )
}