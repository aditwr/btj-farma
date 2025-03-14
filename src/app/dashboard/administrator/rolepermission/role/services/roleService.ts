import axios from "axios";

export async function getRoles(page: number, pageSize: number) {
  try {
    const response = await axios.get(
      `/dashboard/administrator/rolepermission/role/api?page=${page}&pageSize=${pageSize}`
    );
    const apirRes = response.data;
    return apirRes;
  } catch (error) {
    console.log(
      "/dashboard/administrator/rolepermission/role/api/api error: ",
      error
    );
    return [];
  }
}
