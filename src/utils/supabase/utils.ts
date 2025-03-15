import axios from "axios";

export const getAllRoles = async () => {
  try {
    const res = await axios.get(
      "/api/database/roles"
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "/api/database/roles | Axios Error :",
        error.response?.data || error.message
      );
    } else {
      console.error(
        "client: /api/database/roles | error fetch roles : ",
        error
      );
    }
  }
};
