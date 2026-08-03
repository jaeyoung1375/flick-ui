import { useMutation } from "@tanstack/react-query";
import { insertProfile } from "./onboarding.api";
import { InsertProfileRequest } from "./onboarding.type";

export const useInsertProfileMutation = () =>
  useMutation({
    mutationFn: (body: InsertProfileRequest) => insertProfile(body),
  });
