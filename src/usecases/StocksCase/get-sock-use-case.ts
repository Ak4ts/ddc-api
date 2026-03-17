import { Stock, StockService } from "@domain";

export class GetStockUseCase {
  constructor(private readonly stockService: StockService) {}

  async execute(stock_ticker: string): Promise<Stock> {
    const stockGotten = await this.stockService.getStock(stock_ticker);
    return stockGotten;
  }
}
