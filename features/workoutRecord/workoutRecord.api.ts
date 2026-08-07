import { get, post } from "@/util/AxiosUtil";
import { WorkoutRecordCreateRequest, WorkoutRecordResponse } from "./workoutRecord.type";

export const createWorkoutRecord = (body: WorkoutRecordCreateRequest) =>
  post<void>("/api/v1/workout-records", body);

export const fetchWorkoutRecordList = (params: { yearMonth: string }) =>
  get<WorkoutRecordResponse[]>("/api/v1/workout-records", { params });

export const fetchWorkoutRecord = (workoutRecordId: number) =>
  get<WorkoutRecordResponse>(`/api/v1/workout-records/${workoutRecordId}`);
