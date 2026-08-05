import { postForm } from "@/util/AxiosUtil";
import { toMultipart } from "@/util/FileUtil";
import { InsertProfileRequest } from "./onboarding.type";

export const insertProfile = (
  body: InsertProfileRequest,
  profileImage: File | null,
) =>
  postForm<void>(
    "/api/v1/fitness-profile",
    toMultipart(body, profileImage ? { profileImage } : undefined),
  );
