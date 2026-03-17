import { Request, Response } from "express";
import { GetStockUseCase } from "@usecases/StocksCase/get-sock-use-case";

export class StocksController {
  constructor(private readonly getStockUseCase: GetStockUseCase) {}

  /**
   * @openapi
   * /stocks:
   *   post:
   *     tags:
   *       - Stocks
   *     summary: Get stock information
   *     description: Retrieve stock information by ticker symbol
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - stock_ticker
   *             properties:
   *               stock_ticker:
   *                 type: string
   *                 description: Stock ticker symbol (e.g., AAPL, GOOGL)
   *     responses:
   *       201:
   *         description: Stock information retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 ticker:
   *                   type: string
   *                 price:
   *                   type: number
   *       400:
   *         description: Bad request - invalid stock ticker
   *       404:
   *         description: Stock not found
   *       500:
   *         description: Internal server error
   */
  async getStock(req: Request, res: Response): Promise<void> {
    try {
      const { stock_ticker } = req.body;
      const stock = await this.getStockUseCase.execute(stock_ticker);
      res.status(201).json(stock);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "BadRequestError") {
          res.status(400).json({ message: error.message });
          return;
        }
        if (error.name === "NotFoundError") {
          res.status(404).json({ message: error.message });
          return;
        }
      }
      console.error(error);
      res.status(500).json({ message: "Error creating stock" });
    }
  }
}
