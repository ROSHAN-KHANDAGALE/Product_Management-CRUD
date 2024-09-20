import "../App.css";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import AdPage from "./Pagination";

function ProductRecords() {
  const [productData, setProductData] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [inputProduct, setInputProduct] = useState({
    productName: "",
    productType: "",
    productCompany: "",
    productPrice: "",
  });
  const handleShow = (data) => {
    setShow(true);
    setInputProduct(data);
  };

  const onChangeEventHandle = (e) => {
    setInputProduct({ ...inputProduct, [e.target.name]: e.target.value });
  };

  const getDataHandler = async () => {
    try {
      const result = await axios.get(
        "http://localhost:4000/product/api/product"
      );
      setProductData(result.data.item);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDataHandle = async (id) => {
    try {
      const updateData = await axios.put(
        `http://localhost:4000/product/api/product/:${id}`,
        inputProduct
      );
      console.log(updateData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDataHandle = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/api/product/${id}`);
      setProductData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataHandler();
  }, [productData]);

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead className="Table-container">
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price (Rs)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{ele.productName}</td>
                <td>{ele.productType}</td>
                <td>{ele.productPrice}</td>
                <td>
                  <>
                    <Button variant="success" onClick={() => handleShow(ele)}>
                      Update
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Product Registration</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={(e) => updateDataHandle(e, ele._id)}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="productName"
                              placeholder="Enter Product Name"
                              onChange={onChangeEventHandle}
                              value={inputProduct.productName}
                              required
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Product Type/ Category</Form.Label>
                            <Form.Control
                              type="text"
                              name="productType"
                              onChange={onChangeEventHandle}
                              value={inputProduct.productType}
                              placeholder="Enter Product Type"
                              required
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Product Company</Form.Label>
                            <Form.Control
                              type="text"
                              name="productCompany"
                              placeholder="Enter Product Company Name"
                              value={inputProduct.productCompany}
                              onChange={onChangeEventHandle}
                              required
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Price</Form.Label>

                            <Form.Control
                              type="number"
                              name="productPrice"
                              min="0"
                              placeholder="Price per Product"
                              onChange={onChangeEventHandle}
                              value={inputProduct.productPrice}
                              required
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </>

                  <Button
                    variant="danger"
                    onClick={() => deleteDataHandle(ele._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <AdPage />
      </div>
    </div>
  );
}

export default ProductRecords;
