import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAccessToken } from "@/util/AxiosUtil";
import { join, login, logout } from "./auth.api";
import { LoginRequest, SignupRequest } from "./auth.type";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: ({ data }) => {
      // refresh와 같은 형태로 토큰·로그인 상태 캐시를 채워 로그인 화면으로 전환
      setAccessToken(data.accessToken);
      queryClient.setQueryData(["auth", "me"], data);
    },
  });
};

export const useJoinMutation = () =>
  useMutation({
    mutationFn: (body: SignupRequest) => join(body),
  });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 메모리 토큰과 로그인 상태 캐시를 비워 비로그인 화면으로 전환
      setAccessToken(null);
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["auth", "profile"] });
    },
  });
};
