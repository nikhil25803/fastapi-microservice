import { useState } from "react";
import { useNavigate } from "react-router-dom";



const BASE_URL = "http://127.0.0.1:8000/"


export const ProductsCreate = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")

    const navigate = useNavigate()

    const handleCreate = (event) => {
        event?.preventDefault()

        const json_string = JSON.stringify({
            name,
            price,
            quantity
        })

        const requestOptions = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: json_string
        }

        fetch(
            BASE_URL + "product",
            requestOptions
        )
            .then(response => {
                if (!response.ok) {
                    throw response
                }
            })
            .then(data => {
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="new_product body">
            <div className="new_product_title title">
                Create a new product
            </div>
            <div>
                <input
                    className="input-1" placeholder="Name ..."
                    onChange={
                        (event) => {
                            setName(event.target.value)
                        }
                    }
                />
            </div>
            <div>
                <input
                    className="input-1" placeholder="Price ..."
                    onChange={
                        (event) => {
                            setPrice(event.target.value)
                        }
                    }
                />
            </div>
            <div>
                <input
                    className="input-1" placeholder="Quantity ..."
                    onChange={
                        (event) => {
                            setQuantity(event.target.value)
                        }
                    }
                />
            </div>
            <button
                className="button-4"
                onClick={handleCreate}
            >
                Create Product
            </button>
        </div>
    )
}