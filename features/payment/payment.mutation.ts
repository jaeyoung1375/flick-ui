import { useMutation } from "@tanstack/react-query";
import { confirmPayment } from "./payment.api";
import { PaymentSuccessRequest } from "./payment.type";

export const useConfirmPaymentMutation = () =>
  useMutation({
    mutationFn: (body: PaymentSuccessRequest) => confirmPayment(body),
  });
