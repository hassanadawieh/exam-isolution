"use client"
import { AddProduct } from "./components/AddProduct";
import { ProductsList } from "./components/ProductsList";
import { DataProvider } from "./store/context";
export default function Home() {

  return (
    <DataProvider>
      <main className="max-w-4xl mx-auto  p-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <AddProduct />
        </div>
        <ProductsList />
      </main>
    </DataProvider>
  );
}
