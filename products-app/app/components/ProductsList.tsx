"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ProductForm } from "./ProductForm";
import { useData } from "../store/context";

export interface Product {
  id?: number;
  title: string;
  description: string;
  price: string;
  quantity: number;
}

export const ProductsList = () => {
  const { products, fetchData, headers, URL_API } = useData();

  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<Product>();

  useEffect(() => {
    fetchData();
  }, []);
  
  function deleteHandle(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      console.log(headers)
      axios.delete(`${URL_API}/product/${id}`, {
        headers,
      }).then((response) => {
        console.log("Product deleted successfully", response.data);
        fetchData();
      });
    }
  }

  return (
    <div className="overflow-x-auto">
      {open && (
        <div>
          <ProductForm
            fetchData={fetchData}
            setOpen={setOpen}
            productDetails={productDetails}
            status="edit"
          />
        </div>
      )}
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th>{index}</th>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td className=" flex justify-around ">
                <button
                  className="text-green-500"
                  onClick={() => [
                    setOpen(true),
                    setProductDetails(() => ({
                      id: product.id,
                      title: product.title,
                      description: product.description,
                      price: product.price,
                      quantity: product.quantity,
                    })),
                  ]}
                >
                  <AiFillEdit size={20} />
                </button>
                <button
                  onClick={() => deleteHandle(product.id)}
                  className="text-red-500"
                >
                  <AiFillDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
