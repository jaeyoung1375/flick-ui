import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "../common/types/common.type";
import {
  fetchExerciseList,
  fetchAdminExerciseList,
  createAdminExercise,
  updateAdminExercise,
  deleteAdminExercise,
} from "./exercise.api";
import type {
  ExerciseResponse,
  ExerciseCreateRequest,
  ExerciseUpdateRequest,
} from "./exercise.type";

export const useExerciseListQuery = (params?: { name?: string; bodyPartCd?: string }) =>
  useQuery<ExerciseResponse[], ApiError>({
    queryKey: ["exercises", "list", params],
    queryFn: () => fetchExerciseList(params),
  });

// ── Admin - 운동 쿼리 & 뮤테이션 ──────────────────────────

export const useAdminExerciseListQuery = (params?: { name?: string; bodyPartCd?: string }) =>
  useQuery<ExerciseResponse[], ApiError>({
    queryKey: ["admin", "exercises", params],
    queryFn: () => fetchAdminExerciseList(params),
  });

export const useCreateAdminExerciseMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: ExerciseCreateRequest) => createAdminExercise(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "exercises"] }),
  });
};

export const useUpdateAdminExerciseMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: ExerciseUpdateRequest }) =>
      updateAdminExercise(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "exercises"] }),
  });
};

export const useDeleteAdminExerciseMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteAdminExercise(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "exercises"] }),
  });
};
