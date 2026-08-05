"use client";

import { useRouter } from "next/navigation";
import ExerciseListPage from "./ExerciseListPage";

export default function Page() {
  const router = useRouter();

  return <ExerciseListPage onBack={() => router.back()} />;
}
