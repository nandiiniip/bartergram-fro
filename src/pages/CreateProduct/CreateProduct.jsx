import React from "react";
import "./CreateProduct.css";

const CreateProduct = () => {
  return (
    <>
      <div className="createprod__container">
        <form>
          <div>
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              placeholder="Enter product name"
              //   value={formData.username}
              //   onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="product-desc">Product Description</label>
            <textarea
              id="prod-desc"
              name="prod-desc"
              rows="4"
              cols="50"
              required
            />
          </div>
          <div>
            <label htmlFor="prod-img">Upload Image</label>
            <input type="file" id="prod-img" name="prod-img" required />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
