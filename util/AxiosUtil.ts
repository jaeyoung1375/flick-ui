// src/utils/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RefreshResponse } from "@/features/auth/auth.type";

interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // API 기본 URL
  timeout: 5000, // 5초 타임아웃
  withCredentials: true, // 쿠키(refreshToken) 자동 첨부
});

// accessToken은 메모리에만 보관 (새로고침 시 사라지므로 /auth/refresh로 재발급)
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 동시에 여러 요청이 401을 받아도 refresh는 한 번만 호출
let refreshPromise: Promise<RefreshResponse> | null = null;

export const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = api
      .post<ApiResponse<RefreshResponse>>("/api/v1/auth/refresh")
      .then((res) => {
        setAccessToken(res.data.data.accessToken);

        return res.data.data;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

api.interceptors.response.use(
  (res: AxiosResponse<ApiResponse<unknown>>) => {
    const { code, data, message } = res.data;

    if (code !== "0000") {
      return Promise.reject({ code, data, message });
    }

    return res;
  },
  async (err) => {
    const status = err.response?.status;
    const original = err.config;
    const url = original?.url;

    if (
      status === 401 &&
      !original?._retry &&
      !url?.includes("/auth/login") &&
      !url?.includes("/auth/refresh")
    ) {
      original._retry = true;

      try {
        // 재발급 성공 시 request 인터셉터가 새 accessToken을 붙여 원래 요청을 재시도
        await refreshAccessToken();
        return api(original);
      } catch (refreshErr) {
        // 네트워크 오류·타임아웃·서버 오류는 일시적일 수 있으므로 로그아웃하지 않고 원래 401만 전달
        if (
          axios.isAxiosError(refreshErr) &&
          (!refreshErr.response || refreshErr.response.status >= 500)
        ) {
          return Promise.reject(err);
        }

        // refreshToken도 만료 -> 홈으로 리다이렉트
        setAccessToken(null);
        window.location.href = "/";
        return new Promise(() => {});
      }
    }

    return Promise.reject(err);
  },
);

// GET 요청
export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const res = await api.get<ApiResponse<T>>(url, config);

  return res.data.data;
};

// POST 요청
export const post = async <T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
) => {
  const res = await api.post<ApiResponse<T>>(url, body, config);

  const { code, message, data } = res.data;

  return { code, message, data };
};

// POST 요청
export const postForm = async <T>(
  url: string,
  body?: FormData,
  config?: AxiosRequestConfig,
) => {
  const res = await api.postForm<ApiResponse<T>>(url, body, config);

  const { code, message, data } = res.data;

  return { code, message, data };
};

// DELETE 요청
export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
) => {
  const res = await api.delete<ApiResponse<T>>(url, config);

  const { code, data } = res.data;

  return { code, data };
};

// PATCH 요청
export const patch = async <T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
) => {
  const res = await api.patch<ApiResponse<T>>(url, body, config);

  const { code, message, data } = res.data;

  return { code, message, data };
};

// PUT 요청
export const put = async <T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
) => {
  const res = await api.put<ApiResponse<T>>(url, body, config);

  const { code, message, data } = res.data;

  return { code, message, data };
};

export default api;
