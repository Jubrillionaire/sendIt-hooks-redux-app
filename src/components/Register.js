import React, { useState } from "react";
import "../styles/register.css";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { submitAction } from "../actions/authActions";
toast.configure();

function Register(props) {
  const details = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  };

  const [user, setUser] = useState(details);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitAction(user);
  };



  const { firstName, lastName, email, phoneNo, password } = user;
  return (
    <Form className="input" onSubmit={handleSubmit}>
      <h1 className="register">Register</h1>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          value={firstName}
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          value={lastName}
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          value={email}
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="mobile-no">Mobile-No</Label>
        <Input
          value={phoneNo}
          type="text"
          name="phoneNo"
          placeholder="Mobile-No"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <input type="submit" value="submit" />
    </Form>
  );
}

export default connect(null, { submitAction })(Register);
