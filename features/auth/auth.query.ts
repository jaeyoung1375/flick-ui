import { useQuery } from "@tanstack/react-query";
import { get, post, setAccessToken } from "@/util/AxiosUtil";
import { RefreshResponse, User } from "./auth.type";

export const getToken = async () => {
  const res = await post<RefreshResponse>("/api/v1/auth/refresh");
  setAccessToken(res.data.accessToken);
  return res.data;
};

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
