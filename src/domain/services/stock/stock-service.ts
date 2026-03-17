import { NotFoundError } from "@infra/express/middlewares/error-handler";
import { Stock } from "@domain/models";
import { StockRepository } from "@domain/repositories";

export class StockService {
  constructor(private readonly stockRepository: StockRepository) {}

  async getStock(stock_ticker: string): Promise<Stock> {
    const stock = await this.stockRepository.getByTicker(stock_ticker);
    if (!stock) {
      throw new NotFoundError("Stock not found");
    }
    return stock;
  }
}
