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

const errorHandler = (func:(req:Request, res:Response)=>Promise<any>) => {
  return async (req:Request, res:Response) => {
    try{
      return await func(req, res)
    } catch(e:any){
      console.log(e.message)
    }
  }
}

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');//['https://'+FRONTEND_DOMAIN]);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type, authorization');
  next();
});

app.post("/saveEvent", errorHandler(saveEvent));
app.post("/saveBlacklistPermit", errorHandler(saveBlacklistPemrit));
app.get("/history", errorHandler(getHistory));
app.get("/permitBlacklist", errorHandler(getPermitBlackList));

app.listen(port, () => {
  console.log(`Server running`);
});
