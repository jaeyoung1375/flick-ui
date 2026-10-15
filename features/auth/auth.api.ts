import { post } from "@/util/AxiosUtil";
import { SignupRequest } from "./auth.type";

export const join = (body: SignupRequest) =>
  post<void>("/api/v1/auth/join", body);
