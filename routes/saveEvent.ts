import { SwapEvent } from "../db/Models/SwapEvent";
import { connection } from "../db/init";
import { Request, Response } from "express";

const saveEvent = async (req: Request, res: Response) => {
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const {
      user,
      aggregator,
      isError,
      chain,
      from,
      to,
      quote,
      txUrl,
      amount,
      errorData,
      amountUsd,
      slippage,
      routePlace,
      route,
      realOutput,
      reportedOutput,
    } = body as any;
    const event = new SwapEvent();
    event.aggregator = aggregator;
    event.user = user;
    event.isError = isError;
    event.chain = chain;
    event.from = from;
    event.to = to;
    event.quote = quote;
    event.txUrl = txUrl;
    event.amount = amount;
    event.errorData = errorData;
    event.amountUsd = amountUsd;
    event.slippage = slippage;
    event.routePlace = routePlace;
    event.route = route;
    event.realOutput = realOutput;
    event.reportedOutput = reportedOutput;

    const result = await connection.manager.insert(SwapEvent, event);

    res.json({
      message: "Event saved",
      createdAt: result?.generatedMaps[0]?.createdAt,
    });
  } catch (e) {
    console.error("Error saving event", e.message, e.stack);
    res.status(500).json({ error: e.message });
  }
};

export default saveEvent;
