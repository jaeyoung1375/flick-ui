import { post } from "@/util/AxiosUtil";
import { LoginRequest, RefreshResponse, SignupRequest } from "./auth.type";

export const login = (body: LoginRequest) =>
  post<RefreshResponse>("/api/v1/auth/login", body);

export const join = (body: SignupRequest) =>
  post<void>("/api/v1/auth/join", body);

export const logout = () => post<void>("/api/v1/auth/logout");
