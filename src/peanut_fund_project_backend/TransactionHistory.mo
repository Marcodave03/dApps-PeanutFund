import Principal "mo:base/Principal";
import StableMap "mo:base/StableMap";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Float "mo:base/Float";
import Text "mo:base/Text";

module {
    public type Action = { #buy; #sell };

    public type Transaction = {
        id: Nat;
        userId: Principal;
        botId: Nat;
        timestamp: Int;
        action: Action;
        symbol: Text;
        amount: Float;
        price: Float;
    };

    public type Error = {
        #Unauthorized: ();
    };
};

actor class TransactionHistory() {
    private var transactions: StableMap.StableMap<Nat, TransactionHistory.Transaction> = StableMap.StableMap<Nat, TransactionHistory.Transaction>(0, Nat.equal, Nat.hash);
    private var nextTransactionId: Nat = 0;
    public shared(msg) func recordTransaction(
        botId: Nat, 
        action: TransactionHistory.Action, 
        symbol: Text, 
        amount: Float, 
        price: Float
    ): async Nat {
        let caller = msg.caller;
        let newTransaction: TransactionHistory.Transaction = {
            id = nextTransactionId;
            userId = caller;
            botId = botId;
            timestamp = Time.now();
            action = action;
            symbol = symbol;
            amount = amount;
            price = price;
        };
        
        transactions.put(nextTransactionId, newTransaction);
        nextTransactionId += 1;
        return nextTransactionId - 1;
    };

    public shared query func getTransaction(
        transactionId: Nat
    ): async ?TransactionHistory.Transaction {
        transactions.get(transactionId);
    };

    public shared(msg) func getUserTransactions(): async [TransactionHistory.Transaction] {
        let userTransactions = Buffer.Buffer<TransactionHistory.Transaction>(0);
        for ((id, transaction) in transactions.entries()) {
            if (transaction.userId == msg.caller) {
                userTransactions.add(transaction);
            };
        };
        Buffer.toArray(userTransactions);
    };

    public shared(msg) func getBotTransactions(
        botId: Nat
    ): async [TransactionHistory.Transaction] {
        let botTransactions = Buffer.Buffer<TransactionHistory.Transaction>(0);
        for ((id, transaction) in transactions.entries()) {
            if (transaction.botId == botId and transaction.userId == msg.caller) {
                botTransactions.add(transaction);
            };
        };
        Buffer.toArray(botTransactions);
    };
};
