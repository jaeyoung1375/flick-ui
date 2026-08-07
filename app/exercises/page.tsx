"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ExerciseListPage from "./ExerciseListPage";
import { useRecordDraftStore } from "@/store/recordDraftStore";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSelectMode = searchParams.get("select") === "1";
  const addExercise = useRecordDraftStore((s) => s.addExercise);

  return (
    <ExerciseListPage
      onBack={() => router.back()}
      onSelect={
        isSelectMode
          ? (exercise) => {
              addExercise(exercise);
              router.back();
            }
          : undefined
      }
    />
  );
}
