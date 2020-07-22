import { LOAD_PARCELS, EDIT_DESTINATION } from "./types";
import { toast } from "react-toastify";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

toast.configure();

const url = process.env.REACT_APP_API_URL;

export const submitAction = (userDetails) => async () => {
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
      res.errors.forEach((err) => {
        toast.error(err.nsg);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loginAction = (loginData) => async (dispatch) => {
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

export const createOrderAction = (order) => async (dispatch) => {
  try {
    const { pickupLocation, destination, recipientName, recipientNo } = order;
    const response = await fetch(`${url}/parcels`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        pickup_location: pickupLocation,
        destination: destination,
        recipient_name: recipientName,
        recipient_phone_no: recipientNo,
      }),
    });
    const data = await response.json();
    if (data.success === true) {
      toast.success(data.msg);
      window.location = "/user";
    } else {
      data.errors.forEach((err) => {
        toast.error(err.msg);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const loadParcelsAction = () => async (dispatch) => {
  try {
    const res = await fetch(`${url}/users/${userId}/parcels`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    data.sort((a, b) => a.id - b.id);
    dispatch({
      type: LOAD_PARCELS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editDestinationAction = (destination, id) => async (dispatch) => {
  try {
    const response = await fetch(`${url}/parcels/destination`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        parcelId: id,
        user_id: userId,
        destination: destination,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.msg) {
      toast.success(data.msg);
    }
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const cancelParcel = (id) => async (dispatch) => {
  try {
    if (window.confirm("are you sure you want to delete this parcel?")) {
      const response = await fetch(`${url}/parcels/cancel`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          parcelId: id,
          user_id: userId,
        }),
      });
      const data = await response.json();
      if (data.msg) {
        toast.success(data.msg);
      }
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};
