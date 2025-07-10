import Principal "mo:base/Principal";
import Result     "mo:base/Result";
import Text       "mo:base/Text";

import BotConfigModule          "./BotConfig";
import BotExecutionModule       "./BotExecution";
import TradeRecommendationModule "./TradeRecommendation";
import TransactionHistoryModule "./TransactionHistory";
import AuthModule               "./Auth";


actor PeanutFundProjectBackend {
    stable var botConfigCanister: ?Principal = null;
    stable var botExecutionCanister: ?Principal = null;
    stable var tradeRecommendationCanister: ?Principal = null;
    stable var transactionHistoryCanister: ?Principal = null;
    stable var authCanister: ?Principal = null;

    private func getActor<T>(canisterId: ?Principal): T {
        switch (canisterId) {
            case (?id) { return actor(id) };
            case (null) { trap("Sub-canister not initialized") };
        };
    };

    public shared func setCanisterIds(
        configId: Principal,
        execId: Principal,
        recId: Principal,
        histId: Principal,
        authId: Principal
    ) : async () {
        botConfigCanister := ?configId;
        botExecutionCanister := ?execId;
        tradeRecommendationCanister := ?recId;
        transactionHistoryCanister := ?histId;
        authCanister := ?authId;
    };

    public shared func register(username: Text): async Result<UserProfile, AuthError> {
        let auth: AuthActor = getActor(authCanister);
        return await auth.register(username);
    };

    public shared query func getSelf(): async Result<UserProfile, AuthError> {
        let auth: AuthActor = getActor(authCanister);
        return await auth.getSelf();
    };

  public shared func createConfig(symbol : Text,
                                strategy : BotConfigModule.Strategy,
                                risk     : BotConfigModule.RiskProfile)
        : async Nat {
  let cfg : BotConfigModule.BotConfigActor = getActor(botConfigCanister);
  await cfg.createConfig(symbol, strategy, risk);
};

public shared query func getUserConfigs() : async [BotConfigModule.BotConfig] {
  let cfg : BotConfigModule.BotConfigActor = getActor(botConfigCanister);
  await cfg.getUserConfigs();
};

public shared func runBot(botConfig : BotConfigModule.BotConfig)
        : async Result<BotExecutionModule.ExecutionRecord,
                        BotExecutionModule.Error> {
  let exec : BotExecutionModule.BotExecutionActor = getActor(botExecutionCanister);
  await exec.runBot(botConfig);
};

public shared query func getUserTransactions()
        : async [TransactionHistoryModule.Transaction] {
  let hist : TransactionHistoryModule.TransactionHistoryActor =
      getActor(transactionHistoryCanister);
  await hist.getUserTransactions();
};
}