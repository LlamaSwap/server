import { Request, Response } from "express";
import { SwapEvent } from "../db/Models/SwapEvent";
import { connection } from "../db/init";

export async function getHistory(req: Request, res: Response) {
  const { userId, chain } = req.query;
  const swapEventRepository = connection.getRepository(SwapEvent);
  const transactionHistory = await swapEventRepository
    .createQueryBuilder("swapEvent")
    .select([
      "swapEvent.id",
      "swapEvent.createdAt",
      "swapEvent.user",
      "swapEvent.aggregator",
      "swapEvent.isError",
      "swapEvent.chain",
      "swapEvent.from",
      "swapEvent.to",
      "swapEvent.txUrl",
      "swapEvent.amount",
      "swapEvent.amountUsd",
      "swapEvent.slippage",
      "swapEvent.route",
    ])
    .where("swapEvent.user = :userId", { userId })
    .andWhere("swapEvent.chain = :chain", { chain })
    .andWhere("swapEvent.isError = false")
    .orderBy("swapEvent.id", "DESC")
    .take(30)
    .getMany();

  res.append('Cache-Control': 'max-age=10');
  res.json(transactionHistory);
}
