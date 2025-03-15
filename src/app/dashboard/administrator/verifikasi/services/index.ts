import axios from "axios";

export const getUsers = async ({
  activeStatus,
  page,
  itemsPerPage,
}: {
  activeStatus: boolean;
  page: number;
  itemsPerPage: number;
}) => {
  try {
    const res = await axios.get(
      `/dashboard/administrator/verifikasi/api?active=${activeStatus}&page=${page}&perPage=${itemsPerPage}`
    );
    return res.data;
  } catch (error) {
    console.log(
      "client: /dashboard/administrator/verifikasi/api error: ",
      error
    );
  }
};

export const getRoles = async () => {
  try {
    const res = await axios.get(
      "/dashboard/administrator/verifikasi/api/roles"
    );
    return res.data;
  } catch (error) {
    console.log(
      "client: /dashboard/administrator/verifikasi/api/roles error: ",
      error
    );
  }
};
