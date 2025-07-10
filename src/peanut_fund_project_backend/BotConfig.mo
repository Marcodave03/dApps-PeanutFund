import Principal "mo:base/Principal";
import Result "mo:base/Result";
import StableMap "mo:base/StableMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

module {
    public type BotConfig = {
        id: Nat;
        owner: Principal;
        symbol: Text; // e.g., "ICP/USD"
        strategy: Strategy;
        risk: RiskProfile;
        isActive: Bool;
    };

    public type Strategy = {
        #movingAverage: { shortWindow: Nat; longWindow: Nat };
        #rsi: { period: Nat; overbought: Float; oversold: Float };
        #custom: Text;
    };

    public type RiskProfile = { #low; #medium; #high };

    public type Error = { #NotFound; #Unauthorized; #InvalidInput: Text };
};

public actor class BotConfigActor() {
    var configs: StableMap.StableMap<Nat, module.BotConfig> = StableMap.StableMap(10, Nat.equal, Nat.hash);
    var nextId: Nat = 0;

    public shared(msg) func createConfig(symbol: Text, strategy: module.Strategy, risk: module.RiskProfile): async Nat {
        let newConfig: module.BotConfig = {
            id = nextId;
            owner = msg.caller;
            symbol = symbol;
            strategy = strategy;
            risk = risk;
            isActive = true;
        };
        configs.put(nextId, newConfig);
        let newId = nextId;
        nextId += 1;
        return newId;
    };

    public shared query(msg) func getConfig(id: Nat): async Result.Result<module.BotConfig, module.Error> {
        switch (configs.get(id)) {
            case (null) { return #err(#NotFound) };
            case (?config) {
                if (config.owner != msg.caller) {
                    return #err(#Unauthorized);
                };
                return #ok(config);
            };
        };
    };

    public shared query(msg) func getUserConfigs(): async [module.BotConfig] {
        let userConfigs = Iter.filter<Nat, module.BotConfig>(
            configs.entries(),
            func((_, config)) { config.owner == msg.caller }
        );
        return Iter.toArray(userConfigs.vals());
    };

    public shared(msg) func updateConfig(id: Nat, symbol: Text, strategy: module.Strategy, risk: module.RiskProfile, isActive: Bool): async Result.Result<Null, module.Error> {
        switch (configs.get(id)) {
            case (null) { return #err(#NotFound) };
            case (?config) {
                if (config.owner != msg.caller) {
                    return #err(#Unauthorized);
                };
                let updatedConfig = { ...config, symbol, strategy, risk, isActive };
                configs.put(id, updatedConfig);
                return #ok(null);
            };
        };
    };

    public shared(msg) func deleteConfig(id: Nat): async Result.Result<Null, module.Error> {
        switch (configs.get(id)) {
            case (null) { return #err(#NotFound) };
            case (?config) {
                if (config.owner != msg.caller) {
                    return #err(#Unauthorized);
                };
                configs.delete(id);
                return #ok(null);
            };
        };
    };
};
