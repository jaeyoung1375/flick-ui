"use client";

import { useParams } from "next/navigation";
import RecordDetailPage from "./RecordDetailPage";

export default function Page() {
  const params = useParams<{ id: string }>();
  return <RecordDetailPage workoutRecordId={Number(params.id)} />;
}
