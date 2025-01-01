import { configureWeb3 } from "./ethWeb3";
import { PORT } from "./utils/env";
import { log } from "./utils/handlers";
import { processProfileTxns } from "./utils/web3";
import express from "express";
import { syncUsers } from "./vars/users";
import { getNewWallet, getProfileTxns } from "./apiPaths";

(async function () {
  configureWeb3();
  await Promise.all([syncUsers()]);
  processProfileTxns();
  setInterval(async () => {
    await processProfileTxns();
  }, 60 * 60 * 1e3);

  const app = express();

  // @ts-expect-error ejjkhjk
  app.get("/profile/:username", getProfileTxns);
  // @ts-expect-error ejjkhjk
  app.post("/newWallet", getNewWallet);

  app.listen(PORT, () => {
    log(`Server is running on http://localhost:${PORT}`);
  });
})();
