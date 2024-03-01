import { Request, Response } from "express";
import { PermitBlackList } from "../db/Models/PermitBlacklist";
import { connection } from "../db/init";

export async function getPermitBlackList(req: Request, res: Response) {
  const { chain } = req.query;
  const permitBlacklistRepository = connection.getRepository(PermitBlackList);
  const blacklistedTokens = await permitBlacklistRepository
    .createQueryBuilder()
    .select("permitBlackList")
    .from(PermitBlackList, "permitBlackList")
    .where("permitBlackList.chain = :chain", { chain })
    .getMany();

  res.json(blacklistedTokens);
}
