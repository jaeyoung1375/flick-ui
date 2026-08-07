import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkoutRecord } from "./workoutRecord.api";
import { WorkoutRecordCreateRequest } from "./workoutRecord.type";

export const useCreateWorkoutRecordMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: WorkoutRecordCreateRequest) => createWorkoutRecord(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workout-records"] }),
  });
};
