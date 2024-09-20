import React from "react";
import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

function UpdateRecord() {
  const [inputProduct, setInputProduct] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeEventHandle = (e) => {
    setInputProduct({ ...inputProduct, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = () => {};

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
              <Form.Label>Phone Number</Form.Label>
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

export default UpdateRecord;
