import axios from "@/axios";
import { ResponseData } from "@/types/global";
import { UserResponse } from "@/types/user.type";

export const getUser = async (): Promise<ResponseData<UserResponse>> => {
  return await axios.get("/api/get/user");
};
