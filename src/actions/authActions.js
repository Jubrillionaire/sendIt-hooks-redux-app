import { LOAD_PARCELS, EDIT_DESTINATION } from "./types";
import { toast } from "react-toastify";
import dotenv from 'dotenv'
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

dotenv.config()
toast.configure();

const url = process.env.REACT_APP_API_URL

export const submitAction = (userDetails) => (dispatch) => {
  const { firstName, lastName, email, phoneNo, password } = userDetails;
  fetch(`${url}/users`, {
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
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        toast.success(res.msg);
        console.log(res.msg);
      } else if (res.msg) {
        toast.error(res.msg);
      } else {
        res.errors.forEach((err) => {
          toast.error(err.nsg);
          console.log(err);
        });
      }
    })
    .catch((err) => console.log(err));
};

export const loginAction = (loginData) => (dispatch) => {
  const {email, password} = loginData
  fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        fetch(`${url}/me`, {
          headers: {
            "Content-type": "application/json",
            Authorization: res.token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.userId);
            toast.success(res.msg);
            window.location="/user"
            console.log(data, res)
          });
      } else if (res.msg) {
        toast.error(res.msg);
      }
    })
    .catch((err) => console.log(err));
};


export const createOrderAction = (order) => (dispatch) => {
  const {pickupLocation, destination, recipientName, recipientNo} = order
  fetch(`${url}/parcels`, {
    method: "POST",
    headers: {
      Authorization:token,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      pickup_location: pickupLocation,
      destination: destination,
      recipient_name: recipientName,
      recipient_phone_no: recipientNo
    })
  })
    .then(res => res.json())
    .then(data => {
        console.log(data)
      if (data.success === true) {
        toast.success(data.msg);
        window.location = "/user";
      } else {
        data.errors.forEach(err => {
          toast.error(err.msg);
        });
      }
    })
}

export const loadParcelsAction = () => (dispatch) => {
  fetch(`${url}/${userId}/parcels`, {
    headers: {
      "Content-type": "Application/json",
      Authorization: token
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.sort((a, b) => a.id - b.id);
     dispatch({
       type: LOAD_PARCELS,
       payload: data
     })
    })
    .catch(err => console.log(err));
}

export const editDestinationAction = (destination , id) => (dispatch) => {
  console.log(id)
  fetch(`${url}/parcels/destination`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      parcelId: id,
      user_id: userId,
      destination: destination
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        toast.success(data.msg);
      }
    })
   .then(() => window.location.reload())
}


export const cancelParcel = (id) => {
  if (window.confirm("are you sure you want to delete this parcel?")) {
    fetch(`${url}/parcels/cancel`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        parcelId: id,
        user_id: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          toast.success(data.msg);
        }
      }).then(() => window.location.reload())
      .catch(err => console.log(err));
  }
}

