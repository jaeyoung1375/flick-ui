import { useMutation } from "@tanstack/react-query";
import { insertProfile } from "./onboarding.api";
import { InsertProfileRequest } from "./onboarding.type";

export const useInsertProfileMutation = () =>
  useMutation({
    mutationFn: ({
      body,
      profileImage,
    }: {
      body: InsertProfileRequest;
      profileImage: File | null;
    }) => insertProfile(body, profileImage),
  });
