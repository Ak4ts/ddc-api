import { TestRepositoryImpl } from "@infra";
import { TestService } from "@domain/services/test-service";
import { CreateTestUseCase } from "@usecases";
import { TestController } from "@infra";
import { GetStockUseCase } from "@usecases/StocksCase/get-sock-use-case";
import { StockService } from "@domain/services/stock/stock-service";
import { StocksController } from "@infra";

export function makeTestController() {
  const testRepository = new TestRepositoryImpl();
  const testService = new TestService(testRepository);
  const createTestUseCase = new CreateTestUseCase(testService);
  return new TestController(createTestUseCase);
}

export function makeStocksController() {
  // TODO: Implement StockRepositoryImpl when real data source is available
  // For now, StockService will throw NotFoundError for any ticker
  const mockStockRepository = {
    getByTicker: async () => {
      throw new Error("Stock not found");
    },
  };
  const stockService = new StockService(mockStockRepository as any);
  const getStockUseCase = new GetStockUseCase(stockService);
  return new StocksController(getStockUseCase);
}
