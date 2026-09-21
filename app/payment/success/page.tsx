import { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess";

export default function Page() {
  return (
    <Suspense>
      <PaymentSuccess />
    </Suspense>
  );
}
