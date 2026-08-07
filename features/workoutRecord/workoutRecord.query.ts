import { useQuery } from "@tanstack/react-query";
import { ApiError } from "../common/types/common.type";
import { fetchWorkoutRecordList, fetchWorkoutRecord } from "./workoutRecord.api";
import type { WorkoutRecordResponse } from "./workoutRecord.type";

export const useWorkoutRecordListQuery = (yearMonth: string) =>
  useQuery<WorkoutRecordResponse[], ApiError>({
    queryKey: ["workout-records", "list", yearMonth],
    queryFn: () => fetchWorkoutRecordList({ yearMonth }),
  });

export const useWorkoutRecordQuery = (workoutRecordId: number) =>
  useQuery<WorkoutRecordResponse, ApiError>({
    queryKey: ["workout-records", "detail", workoutRecordId],
    queryFn: () => fetchWorkoutRecord(workoutRecordId),
  });
