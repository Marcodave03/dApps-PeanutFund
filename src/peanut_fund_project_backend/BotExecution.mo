import Principal "mo:base/Principal";
import Result "mo:base/Result";
import StableMap "mo:base/StableMap";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

module {
    public type BotConfig = T.BotConfig;
    public type TradeAction = T.TradeAction;
    public type Error = T.Error;

    public type ExecutionRecord = {
        id: Nat;
        botId: Nat;
        timestamp: Time.Time;
        configUsed: BotConfig;
        recommendation: TradeAction;
        result: ExecutionResult;
    };

    public type ExecutionResult = {
        #success: { message: Text };
        #failure: { error: Text };
        #skipped: Null;
    };

    module T {
        public type BotConfig = { id : Nat; isActive : Bool; strategy : Text };
        public type TradeAction = { #buy; #sell; #hold };
        public type Error = { #BotNotFound; #BotNotActive; #ExecutionFailed: Text };
        public type TradeRecommendationActor = actor {
            getRecommendation: shared(Text) -> async Result.Result<TradeAction, Text>;
        };
    };
};

public actor class BotExecutionActor(tradeCanisterId: Principal) {
    var executionRecords: StableMap.StableMap<Nat, module.ExecutionRecord> = StableMap.StableMap(10, Nat.equal, Nat.hash);
    var nextExecId: Nat = 0;
    var tradeRecommendationCanister: module.T.TradeRecommendationActor = actor(tradeCanisterId);

    public shared(msg) func runBot(botConfig: module.BotConfig): async Result.Result<module.ExecutionRecord, module.Error> {
        if (not botConfig.isActive) {
            return #err(#BotNotActive);
        };
        let recommendationResult = await tradeRecommendationCanister.getRecommendation(botConfig.strategy);

        let execResult: module.ExecutionResult;
        switch (recommendationResult) {
            case (#ok(rec)) {
                execResult := #success({ message = "Trade simulated successfully." });
            };
            case (#err(e)) {
                execResult := #failure({ error = e });
            };
        };

        let newRecord: module.ExecutionRecord = {
            id = nextExecId;
            botId = botConfig.id;
            timestamp = Time.now();
            configUsed = botConfig;
            recommendation = switch (recommendationResult) {
                case (#ok(rec)) { rec };
                case (#err(_)) { #hold };
            };
            result = execResult;
        };

        executionRecords.put(nextExecId, newRecord);
        nextExecId += 1;

        return #ok(newRecord);
    };

    public shared query(msg) func getBotExecutions(botId: Nat): async [module.ExecutionRecord] {
        let records = Iter.filter<Nat, module.ExecutionRecord>(
            executionRecords.entries(),
            func((_, record)) { record.botId == botId }
        );
        return Iter.toArray(records.vals());
    };

    public shared(msg) func setTradeRecommendationCanister(id: Principal) {
        tradeRecommendationCanister := actor(id);
    };
};
