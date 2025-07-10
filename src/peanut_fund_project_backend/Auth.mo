import Principal "mo:base/Principal";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

type AuthUserProfile = {
    principal: Principal;
    username: Text;
};

type AuthError = {
    #UserAlreadyExists: ();
    #UserNotFound: ();
    #InvalidUsername: Text;
};

actor class Auth() = this {
    private var userProfiles = HashMap.HashMap<Principal, AuthUserProfile>(0, Principal.equal, Principal.hash);

    public shared(msg) func register(username: Text): async Result.Result<AuthUserProfile, AuthError> {
        if (userProfiles.get(msg.caller) != null) {
            return #err(#UserAlreadyExists);
        };
        let newUser: AuthUserProfile = {
            principal = msg.caller;
            username = username;
        };
        userProfiles.put(msg.caller, newUser);
        return #ok(newUser);
    };

    public shared query(msg) func getSelf(): async Result.Result<AuthUserProfile, AuthError> {
        switch (userProfiles.get(msg.caller)) {
            case (null) { return #err(#UserNotFound) };
            case (?profile) { return #ok(profile) };
        };
    };

    public shared(msg) func updateUsername(newUsername: Text): async Result.Result<(), AuthError> {
        if (newUsername == "") {
            return #err(#InvalidUsername("Username cannot be empty."));
        };
        switch (userProfiles.get(msg.caller)) {
            case (null) { return #err(#UserNotFound) };
            case (?profile) {
                let updatedProfile: AuthUserProfile = {
                    principal = profile.principal;
                    username = newUsername;
                };
                userProfiles.put(msg.caller, updatedProfile);
                return #ok();
            };
        };
    };

    public shared query func getProfileByPrincipal(principal: Principal): async Result.Result<AuthUserProfile, AuthError> {
        switch (userProfiles.get(principal)) {
            case (null) { return #err(#UserNotFound) };
            case (?profile) { return #ok(profile) };
        };
    };
};
