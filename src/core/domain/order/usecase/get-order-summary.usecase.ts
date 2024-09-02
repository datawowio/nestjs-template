import { Result } from 'oxide.ts';

export interface OrderSummary {
  id: number;
  transactionId: string;
  status: string;
  totalProduct: number;
  user: {
    firstname: string;
    lastname: string;
  };
}

export interface IGetOrderSummaryUseCase {
  exec: () => Promise<Result<OrderSummary[], string>>;
}
