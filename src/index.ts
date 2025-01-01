import { configureWeb3 } from "./ethWeb3";
import { PORT } from "./utils/env";
import { log } from "./utils/handlers";
import { getProfileTxns } from "./utils/web3";
import express from "express";
import { userTxns } from "./vars/txns";
import { syncUsers } from "./vars/users";

(async function () {
  configureWeb3();
  await Promise.all([syncUsers()]);
  getProfileTxns();
  setInterval(async () => {
    await getProfileTxns();
  }, 60 * 60 * 1e3);

  const app = express();

  app.get("/profile/:username", async (req, res) => {
    const { username } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);

    try {
      const profileTxns = userTxns[username] || [];
      const start = (pageNumber - 1) * pageSizeNumber;
      const end = start + pageSizeNumber;
      const paginatedTxns = profileTxns.slice(start, end);

      res.json({
        transactions: paginatedTxns,
        currentPage: pageNumber,
        totalPages: Math.ceil(profileTxns.length / pageSizeNumber),
      });
    } catch (error) {
      res
        .status(500)
        .send(`Error fetching profile transactions for ${username}`);
    }
  });

  app.listen(PORT, () => {
    log(`Server is running on http://localhost:${PORT}`);
  });
})();
