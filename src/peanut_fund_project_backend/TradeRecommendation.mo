import Result "mo:base/Result";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Nat "mo:base/Nat";

module {
    public type TradeAction = { #buy; #sell; #hold };

    public type Recommendation = {
        action: TradeAction;
        explanation: Text;
    };

    public type Strategy = {
        #movingAverage: { shortWindow: Nat; longWindow: Nat };
        #rsi: { period: Nat; overbought: Float; oversold: Float };
        #custom: Text;
    };
}

public actor class TradeRecommendationActor() {
    public shared query func getRecommendation(strategy: module.Strategy): async Result.Result<module.Recommendation, Text> {
        switch (strategy) {
            case (#movingAverage(params)) {
                if (params.shortWindow > params.longWindow) {
                    return #ok({
                        action = #buy;
                        explanation = "Short-term MA is above long-term MA.";
                    });
                } else {
                    return #ok({
                        action = #sell;
                        explanation = "Short-term MA is below long-term MA.";
                    });
                };
            };
            case (#rsi(params)) {
                if (params.overbought > 70.0) {
                    return #ok({
                        action = #sell;
                        explanation = "RSI indicates overbought conditions.";
                    });
                } else {
                    return #ok({
                        action = #buy;
                        explanation = "RSI indicates oversold conditions.";
                    });
                };
            };
            case (#custom(_)) {
                return #err("Custom strategies not yet implemented.");
            };
        };
    };
};
