import { post } from "@/util/AxiosUtil";
import { InsertProfileRequest } from "./onboarding.type";

export const insertProfile = (body: InsertProfileRequest) =>
  post<void>("/api/v1/fitness-profile", body);
