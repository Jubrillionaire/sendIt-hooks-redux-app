import { LOAD_PARCELS, FETCH_FAILURE, FETCH_SUCCESS, LOADING } from "./types";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const url = process.env.REACT_APP_API_URL;

toast.configure();

export const cancelParcel = id => async () => {
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

export const editDestinationAction = (destination, id) => async () => {
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

export const loadParcelsAction = () => async dispatch => {
  try {
    const response = await fetch(`${url}/users/${userId}/parcels`, {
      headers: {
        "Content-type": "Application/json",
        Authorization: token,
      },
    });
    const res = await response;
    const data = await response.json();
    if (res.status === 200) {
      dispatch({
        type: FETCH_SUCCESS,
      });
    } else if (res.status === 400) {
      dispatch({
        type: FETCH_FAILURE,
        payload: "sorry, unable to fetch parcels",
      });
    }
    console.log(data);
    data.sort((a, b) => a.id - b.id);
    dispatch({
      type: LOAD_PARCELS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createOrderAction = order => async () => {
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
      data.errors.forEach(err => {
        toast.error(err.msg);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};
