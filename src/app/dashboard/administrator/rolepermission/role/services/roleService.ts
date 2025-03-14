import axios from "axios";

export async function getRoles() {
    try {
        const response = await axios.get("/dashboard/administrator/rolepermission/role/api");
        const apirRes = response.data;
        return apirRes.data; // return array of roles { id: number, role: string }[]
    } catch (error) {
        console.log("/dashboard/administrator/rolepermission/role/api/api error: ", error);
        return [];  }
}