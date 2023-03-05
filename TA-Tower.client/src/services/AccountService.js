import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      console.log("[ACCOUNT INFO]", res.data);
      AppState.account = res.data;
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }

  async getTickets() {
    const res = await api.get("/account/tickets");
    console.log("[MY TICKETS]", res.data);
    AppState.myTickets = res.data;
  }

  async editAccount(accountBody) {
    const res = await api.put("/account", accountBody);
    console.log("[EDITED ACCOUNT]", res.data);
  }
}

export const accountService = new AccountService();
