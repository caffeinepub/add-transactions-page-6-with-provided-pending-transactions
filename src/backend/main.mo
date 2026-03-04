import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Nat32 "mo:core/Nat32";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserId = Nat;

  public type UserProfile = {
    name : Text;
  };

  public type Transaction = {
    beneficiaryName : Text;
    role : Text;
    bankName : Text;
    maskedAccount : Text;
    amountEur : Nat;
    status : TransactionStatus;
    date : Text;
    note : ?Text;
    id : TransactionId;
  };

  public type TransactionStatus = {
    #pending;
    #failed;
    #paid;
  };

  public type TransactionPage = {
    title : Text;
    transactions : [Transaction];
    pageNote : ?Text;
    sectionFootnote : ?Text;
  };

  public type CreateTransactionInput = {
    beneficiaryName : Text;
    role : Text;
    bankName : Text;
    maskedAccount : Text;
    amountEur : Nat;
    status : TransactionStatus;
    date : Text;
    note : ?Text;
  };

  public type TransactionId = Nat32;

  let userProfiles = Map.empty<Principal, UserProfile>();
  let transactions = Map.empty<TransactionId, Transaction>();
  var nextTransactionId : TransactionId = 0;

  // Helper function for admin authorization
  func assertAdmin(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // Helper function for user authorization
  func assertUser(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Transaction Management
  public shared ({ caller }) func createTransaction(input : CreateTransactionInput) : async TransactionId {
    assertAdmin(caller);

    let id = generateUniqueId();
    let transaction : Transaction = {
      beneficiaryName = input.beneficiaryName;
      role = input.role;
      bankName = input.bankName;
      maskedAccount = input.maskedAccount;
      amountEur = input.amountEur;
      status = input.status;
      date = input.date;
      note = input.note;
      id;
    };
    transactions.add(id, transaction);
    id;
  };

  public shared ({ caller }) func updateTransaction(id : TransactionId, input : CreateTransactionInput) : async () {
    assertAdmin(caller);

    let existing = transactions.get(id);
    switch (existing) {
      case (null) { Runtime.trap("Transaction not found") };
      case (?_) {
        let updatedTransaction : Transaction = {
          beneficiaryName = input.beneficiaryName;
          role = input.role;
          bankName = input.bankName;
          maskedAccount = input.maskedAccount;
          amountEur = input.amountEur;
          status = input.status;
          date = input.date;
          note = input.note;
          id;
        };
        transactions.add(id, updatedTransaction);
      };
    };
  };

  public shared ({ caller }) func markTransactionFailed(id : TransactionId) : async () {
    assertAdmin(caller);

    let existing = transactions.get(id);
    switch (existing) {
      case (null) { Runtime.trap("Transaction not found") };
      case (?transaction) {
        let updatedTransaction : Transaction = {
          transaction with
          status = #failed;
        };
        transactions.add(id, updatedTransaction);
      };
    };
  };

  public query ({ caller }) func getTransaction(id : TransactionId) : async ?Transaction {
    assertUser(caller);
    transactions.get(id);
  };

  public query ({ caller }) func getAllTransactions() : async [Transaction] {
    assertUser(caller);
    transactions.values().toArray();
  };

  public query ({ caller }) func getTransactionPages() : async [TransactionPage] {
    assertUser(caller);

    let transactionsArray = transactions.values().toArray();

    let page1 : TransactionPage = {
      title = "All Transactions";
      transactions = transactionsArray;
      pageNote = null;
      sectionFootnote = null;
    };

    [page1];
  };

  func generateUniqueId() : TransactionId {
    nextTransactionId += 1;
    nextTransactionId;
  };
};
