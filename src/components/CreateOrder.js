import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { createOrderAction } from "../actions/parcelActions";
import { connect } from "react-redux";

toast.configure();

const CreateOrder = props => {
  const orderDetails = {
    pickupLocation: "",
    destination: "",
    recipientName: "",
    recipientNo: "",
  };

  const [order, setOrder] = useState(orderDetails);

  const handleChange = e => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createOrderAction(order);
  };

  return (
    <Form className="input" onSubmit={handleSubmit}>
      <h1 className="pickupLocation">Create Order</h1>
      <FormGroup>
        <Label for="pickupLocation">Pickup Location</Label>
        <Input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="Destination">Destination</Label>
        <Input
          type="text"
          name="destination"
          placeholder="Destination"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="Recipient-name">Recipient's name</Label>
        <Input
          type="text"
          name="recipientName"
          placeholder="Recipient's name"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="Recipient's Mobile-No">Recipient's Mobile-No</Label>
        <Input
          type="text"
          name="recipientNo"
          placeholder="Recipient's Mobile-No"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>
      <input type="submit" value="create" />
      {/* <Button>Create Order</Button> */}
    </Form>
  );
};

export default connect(null, { createOrderAction })(CreateOrder);
