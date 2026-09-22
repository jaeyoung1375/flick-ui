import { useQuery } from "@tanstack/react-query";
import { get, refreshAccessToken } from "@/util/AxiosUtil";
import { User } from "./auth.type";

export const getToken = () => refreshAccessToken();

export const useGetTokenQuery = (enabled = true) =>
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: getToken,
    enabled,
    retry: false,
  });

export const getMe = () => get<User>("/api/v1/auth/me");

export const useMeQuery = (enabled = true) =>
  useQuery<User>({
    queryKey: ["auth", "profile"],
    queryFn: getMe,
    enabled,
    retry: false,
  });

export const useLoginUser = () => {
  const { data, isSuccess } = useGetTokenQuery(false);
  return useMeQuery(isSuccess && !!data?.accessToken);
};
