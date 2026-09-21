import { post } from "@/util/AxiosUtil";
import { PaymentSuccessRequest } from "./payment.type";

export const confirmPayment = (body: PaymentSuccessRequest) =>
  post<void>("/api/v1/payment/success", body);
