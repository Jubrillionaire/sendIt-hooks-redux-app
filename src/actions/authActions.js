import { toast } from "react-toastify";

toast.configure();

const url = process.env.REACT_APP_API_URL;

export const submitAction = userDetails => async () => {
  const { firstName, lastName, email, phoneNo, password } = userDetails;
  try {
    const response = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_no: phoneNo,
        password: password,
      }),
    });
    const res = await response.json();
    if (res.token) {
      localStorage.setItem("token", res.token);
      toast.success(res.msg);
      window.location = "/user";
    } else if (res.msg) {
      toast.error(res.msg);
    } else {
      res.errors.forEach(err => {
        toast.error(err.nsg);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginAction = loginData => async () => {
  try {
    const { email, password } = loginData;
    const response = await fetch(`${url}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const res = await response.json();
    if (res.token) {
      const userRes = await fetch(`${url}/me`, {
        headers: {
          "Content-type": "application/json",
          Authorization: res.token,
        },
      });
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId);
      toast.success(res.msg);
      window.location = "/user";
    } else if (res.msg) {
      toast.error(res.msg);
    }
  } catch (err) {
    console.log(err);
  }
};
