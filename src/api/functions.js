import axios from "axios";
export const update_task = (data, userId, taskId) => {
  axios
    .put(`http://10.35.138.26:5000/user/${userId}/habit/${taskId}`, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
