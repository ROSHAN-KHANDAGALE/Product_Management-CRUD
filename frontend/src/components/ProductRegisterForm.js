/**
 * Importing all Necessary Packages
 */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ProductRegisterForm() {
  /**
   * Initialization of states
   */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * For input parameter states
   */
  const [inputProduct, setInputProduct] = useState({
    productName: "",
    productType: "",
    productCompany: "",
    productPrice: "",
  });

  /**
   * To accept value into the fields via user
   */
  const onChangeEventHandle = (e) => {
    setInputProduct({ ...inputProduct, [e.target.name]: e.target.value });
  };

  /**
   * Function to Submit or post to the Backend API
   */
  const onSubmitHandle = async (e) => {
    console.log(e);
    try {
      e.preventDefault();
      await axios.post(
        "http://localhost:4000/product/api/product",
        inputProduct
      );
      /**
       * Function call to close form on Submission of Form
       */
      handleClose();
      /**
       * Function to reload form after each addition of record
       */
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Product Registration
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandle}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                onChange={onChangeEventHandle}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Type/ Category</Form.Label>
              <Form.Control
                type="text"
                name="productType"
                onChange={onChangeEventHandle}
                placeholder="Enter Product Type"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Company</Form.Label>
              <Form.Control
                type="text"
                name="productCompany"
                placeholder="Enter Product Company Name"
                onChange={onChangeEventHandle}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="productPrice"
                min="0"
                placeholder="Price per Product"
                onChange={onChangeEventHandle}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductRegisterForm;
