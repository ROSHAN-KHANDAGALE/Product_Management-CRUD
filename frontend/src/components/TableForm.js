/**
 * Importing all Necessary Packages
 */
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import BasicPagination from "./BasicPagination";
import "../App.css";

function TableForm() {
  // Initialization of states for each fields

  const [data, setData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch data from API
  const getChangeHandle = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/product/api/product"
      );
      if (result.data && result.data.item) {
        setData(result.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete data
  const deleteDataHandle = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/api/product/${id}`);

      // Update tables state to filter out the deleted item
      setData((pData) => pData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Function to update product
  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:4000/product/api/product/${id}`,
        updatedProduct
      );

      // ... = item => ...

      // Update the product in the local state
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, ...updatedProduct } : item
        )
      );

      // Clear form fields and reset edit state
      clearForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Function to clear the form fields and reset edit state
  const clearForm = () => {
    setProductName("");
    setProductType("");
    setProductCompany("");
    setProductPrice("");
    setEditId(null); // Reset edit mode
  };

  // Run the data fetching function
  useEffect(() => {
    getChangeHandle();
  }, []);

  // Function for both Editing and Posting
  const submitHandle = async (e) => {
    e.preventDefault();
    const productData = {
      productName,
      productType,
      productCompany,
      productPrice,
    };

    if (editId) {
      // TO run when edit mode is on
      updateProduct(editId, productData);
    } else {
      try {
        const result = await axios.post(
          "http://localhost:4000/product/api/product",
          productData
        );
        setData((prevData) => [...prevData, result.data]);

        // To reload the Window to refresh the window
        window.location.reload();

        // Clear form fields
        clearForm();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  // Edit button handle
  const editDataHandle = async (product) => {
    setEditId(product._id);
    setProductName(product.productName);
    setProductType(product.productType);
    setProductCompany(product.productCompany);
    setProductPrice(product.productPrice);
  };

  return (
    <div className="App">
      <form onSubmit={submitHandle}>
        <div>
          <input
            type="text"
            value={productName}
            placeholder="Enter Product Name"
            onChange={(e) => setProductName(e.target.value)}
            disabled={!editId && productName === ""}
          />
          <input
            type="text"
            value={productType}
            placeholder="Enter Category"
            onChange={(e) => setProductType(e.target.value)}
            disabled={!editId && productType === ""}
          />
          <input
            type="text"
            value={productCompany}
            placeholder="Enter Company"
            onChange={(e) => setProductCompany(e.target.value)}
            disabled={!editId && productCompany === ""}
          />
          <input
            type="number"
            min={0}
            value={productPrice}
            placeholder="Enter Price(RS)"
            onChange={(e) => setProductPrice(e.target.value)}
            disabled={!editId && productPrice === ""}
          />
          <Button type="submit" variant="success">
            EDIT
          </Button>
          <Button type="reset" variant="danger">
            CLEAR
          </Button>
        </div>
      </form>
      <div className="Table-container">
        <div className="table-wrapper">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/**
               * The Map function to fetch and insert the records in the fields accordingly
               */}
              {data.map((ele) => (
                <tr key={ele._id}>
                  <td>{ele.productName}</td>
                  <td>{ele.productType}</td>
                  <td>{ele.productPrice}</td>
                  <td>
                    <Button variant="info" onClick={() => editDataHandle(ele)}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteDataHandle(ele._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div>
        <BasicPagination />
      </div>
    </div>
  );
}

export default TableForm;
