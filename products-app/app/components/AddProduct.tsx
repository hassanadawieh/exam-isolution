import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { AiOutlinePlus } from "react-icons/ai";

export const AddProduct = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="btn btn-primary w-full" onClick={() => setOpen(true)}>
        Add product <AiOutlinePlus size={18} className="ml-2" />
      </button>
      {open && <ProductForm setOpen={setOpen} status="add" />}
    </div>
  );
};
