import { useEffect, useState } from "react";
import "./Product.css"
import { Link } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/"

export const Products = () => {

    const [products, setProducts] = useState([])

    const handleDelete = (event, id) => {
        event?.preventDefault();
        const requestOptions = {
            method: "DELETE",
        }

        fetch(
            BASE_URL + `product/${id}`,
            requestOptions
        )
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetch(BASE_URL + "product")
            .then((response) => {
                const json = response.json()
                if (response.ok) {
                    return json
                }
                throw response
            })
            .then(data => {
                console.log(data);
                setProducts(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    console.log(products);

    return (
        <div className="products_div body">
            <div className="product_title title">
                Products
            </div>
            <div className="products_add_div">
                <Link to={"/create"} className="button-4">
                    Add
                </Link>
                <table className="products_table">
                    <thead className="products_table_head">
                        <th scope="col">
                            Order ID
                        </th>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            Price
                        </th>
                        <th scope="col">
                            Quantity
                        </th>
                        <th scope="col">
                            Actions
                        </th>
                    </thead>
                    <tbody>
                        {
                            products.map(product => {
                                return <tr className="products_table_row" key={product.id}>
                                    <td className="products_table_td">
                                        {product.id}
                                    </td>
                                    <td className="products_table_td">
                                        {product.name}
                                    </td>
                                    <td className="products_table_td">
                                        {product.price}
                                    </td>
                                    <td className="products_table_td">
                                        {product.quantity}
                                    </td>
                                    <td className="products_table_td">
                                        <a href="/" className="product_delete_link" onClick={event => handleDelete(event, product.id)}>
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            })

                        }
                    </tbody>

                </table>
            </div>
            <div className="products_order_div">
                <Link to={"/order"} className="button-4">
                    Order
                </Link>
            </div>
        </div>
    )
}