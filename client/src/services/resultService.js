import api from "./api";

export const getResults =
async(userId)=>{

 const response =
 await api.get(
 `/results/user/${userId}`
 );

 return response.data;

};