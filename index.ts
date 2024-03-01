import express from "express";
import { initLlamaswapDB } from "./db/init";
import saveEvent from "./routes/saveEvent";
import { getHistory } from "./routes/getHistory";
import { getPermitBlackList } from "./routes/getPermitBlacklist";
import { saveBlacklistPemrit } from "./routes/saveBlacklistPermit";

initLlamaswapDB();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.text());

app.post("/saveEvent", saveEvent);
app.post("/saveBlacklistPermit", saveBlacklistPemrit);
app.get("/history", getHistory);
app.get("/permitBlacklist", getPermitBlackList);

app.listen(port, () => {
  console.log(`Server running`);
});
