import "reflect-metadata";

import { DataSource } from "typeorm";
import { PermitBlackList } from "./Models/PermitBlacklist";
import { SwapEvent } from "./Models/SwapEvent";

let AppDataSource: DataSource;
let connection: DataSource;

function getAppDataSource() {
  if (!AppDataSource)
    AppDataSource = new DataSource({
      type: "postgres",
      database: "content",
      entities: [SwapEvent, PermitBlackList],
      logging: false,
      url: process.env.AGGREGATOR_DB_URL,
    });
  return AppDataSource;
}

async function initLlamaswapDB() {
  try {
    connection = await getAppDataSource().initialize();
    console.log("DB connected");
    return connection;
  } catch (e) {
    console.error("DB connection error", e);
  }
}

export { initLlamaswapDB, getAppDataSource, connection };
