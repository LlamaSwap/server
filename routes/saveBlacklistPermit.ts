import { Request, Response } from "express";
import { connection } from "../db/init";
import { PermitBlackList } from "../db/Models/PermitBlacklist";

export const saveBlacklistPemrit = async (req: Request, res: Response) => {
  const { address, chain } = req.body;
  const blacklistedToken = new PermitBlackList();
  blacklistedToken.address = address;
  blacklistedToken.chain = chain;

  const result = await connection.manager.save(blacklistedToken);
  res.json(result);
};
