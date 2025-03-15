import { APIResponse } from "@/types/types";
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
    // Menangani error pada level request
    if (axios.isAxiosError(error)) {
      // Error dari axios, misalnya error.response.data
      console.error("Axios Error :", error.response?.data || error.message);
    } else {
      console.error(
        "client:/dashboard/administrator/verifikasi/api error get users : ",
        error
      );
    }
  }
};

export const updateUsers = async ({
  id,
  id_role,
  aktif,
}: {
  id?: string;
  id_role?: number;
  aktif?: boolean;
}) => {
  try {
    const res = await axios.put(
      `/dashboard/administrator/verifikasi/api`,
      {
        id,
        id_role,
        aktif,
      }
    );
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
        console.error("Axios Error :", error.response?.data || error.message);
    } else {
      console.log(
        "client:/dashboard/administrator/verifikasi/api error update users : ",
        error
      );
    }
  }
};
