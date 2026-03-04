import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type TransactionId = number;
export interface CreateTransactionInput {
    status: TransactionStatus;
    beneficiaryName: string;
    date: string;
    note?: string;
    role: string;
    bankName: string;
    amountEur: bigint;
    maskedAccount: string;
}
export interface TransactionPage {
    title: string;
    pageNote?: string;
    sectionFootnote?: string;
    transactions: Array<Transaction>;
}
export interface UserProfile {
    name: string;
}
export interface Transaction {
    id: TransactionId;
    status: TransactionStatus;
    beneficiaryName: string;
    date: string;
    note?: string;
    role: string;
    bankName: string;
    amountEur: bigint;
    maskedAccount: string;
}
export enum TransactionStatus {
    pending = "pending",
    paid = "paid",
    failed = "failed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createTransaction(input: CreateTransactionInput): Promise<TransactionId>;
    getAllTransactions(): Promise<Array<Transaction>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTransaction(id: TransactionId): Promise<Transaction | null>;
    getTransactionPages(): Promise<Array<TransactionPage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markTransactionFailed(id: TransactionId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateTransaction(id: TransactionId, input: CreateTransactionInput): Promise<void>;
}
