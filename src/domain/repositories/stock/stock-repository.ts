import { Stock } from "@domain/models";

export interface StockRepository {
  getByTicker(stock_ticker: string): Promise<Stock>;
}
