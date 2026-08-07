import { get, post, put, deleteData } from "@/util/AxiosUtil";
import {
  ExerciseResponse,
  ExerciseCreateRequest,
  ExerciseUpdateRequest,
} from "./exercise.type";

export const fetchExerciseList = (params?: { name?: string; bodyPartCd?: string }) =>
  get<ExerciseResponse[]>("/api/v1/exercises", { params });

// ── Admin APIs - 운동 ──────────────────────────────────────

export const fetchAdminExerciseList = (params?: { name?: string; bodyPartCd?: string }) =>
  get<ExerciseResponse[]>("/api/v1/admin/exercises", { params });

export const createAdminExercise = (body: ExerciseCreateRequest) =>
  post<void>("/api/v1/admin/exercises", body);

export const updateAdminExercise = (id: number, body: ExerciseUpdateRequest) =>
  put<void>(`/api/v1/admin/exercises/${id}`, body);

export const deleteAdminExercise = (id: number) =>
  deleteData<void>(`/api/v1/admin/exercises/${id}`);
