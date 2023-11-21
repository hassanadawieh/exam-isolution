"use client";
import { useState, useEffect } from "react";
import { Product } from "./ProductsList";
import { useData } from "../store/context";
import axios from "axios";
export const ProductForm = ({ setOpen, productDetails, status }) => {
  const { fetchData, headers, URL_API } = useData();
  const [productValue, setProductValue] = useState<Product>({
    title: productDetails?.title ?? "",
    description: productDetails?.description ?? "",
    price: productDetails?.price ?? "",
    quantity: productDetails?.quantity ?? "",
  });

  // function submit data edit or add products
  function submitHandler() {
    if (status === "edit") {
      axios
        .put(`${URL_API}/product/${productDetails.id}`, productValue, {
            headers,
        })
        .then((response) => {
          console.log(response.status);

          fetchData();
        });
    } else {
      axios
        .post(`${URL_API}/product`, productValue, {
            headers,
        })
        .then((response) => {
          fetchData();
        });
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded z-50">
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            value={productValue.title}
            onChange={(event) =>
              setProductValue((prevValue) => ({
                ...prevValue,
                title: event.target.value,
              }))
            }
            type="text"
            id="title"
            name="title"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <input
            value={productValue.description}
            onChange={(event) =>
              setProductValue((prevValue) => ({
                ...prevValue,
                description: event.target.value,
              }))
            }
            type="text"
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            value={productValue.price}
            onChange={(event) =>
              setProductValue((prevValue) => ({
                ...prevValue,
                price: event.target.value,
              }))
            }
            type="number"
            id="price"
            name="price"
            step="0.01"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quantity:
          </label>
          <input
            value={productValue.quantity}
            onChange={(event) =>
              setProductValue((prevValue) => ({
                ...prevValue,
                quantity: event.target.value,
              }))
            }
            type="number"
            id="quantity"
            name="quantity"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => submitHandler()}
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setOpen(false)}
          >
            close
          </button>
        </div>
      </form>
    </div>
  );
};
