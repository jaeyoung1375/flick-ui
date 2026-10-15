import { useMutation } from "@tanstack/react-query";
import { join } from "./auth.api";
import { SignupRequest } from "./auth.type";

export const useJoinMutation = () =>
  useMutation({
    mutationFn: (body: SignupRequest) => join(body),
  });
