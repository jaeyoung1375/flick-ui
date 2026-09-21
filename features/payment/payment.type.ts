export type PaymentSuccessRequest = {
  orderId: string; // 주문번호
  paymentKey: string; // 토스 결제 키
  amount: number; // 결제 금액
};
