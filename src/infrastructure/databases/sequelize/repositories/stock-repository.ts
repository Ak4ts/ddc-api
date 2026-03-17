import { StockRepository } from "@domain";
import Brapi from "brapi";

export class StockRepositoryImpl implements StockRepository {
  async getByTicker(stock_ticker: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = new Brapi({
      apiKey: process.env.BRAPI_API_KEY,
    });
    // Buscar cotação de uma ação
    const stock = await client.quote.retrieve(stock_ticker);
    return stock;
  }
}
