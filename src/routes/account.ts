import { AccountCreator, TransactionIn, TransactionOut, Withdraw, Deposit, Extract } from "../controllers";
import Router from "express";

const route = Router();

route.post("/account", (req, res) => {
	new AccountCreator().handle(req, res);
});

route.post("/transaction-in", (req, res) => {
	new TransactionIn().handle(req, res);
});

route.post("/transaction-out", (req, res) => {
	new TransactionOut().handle(req, res);
});

route.post("/withdraw", (req, res) => {
	new Withdraw().handle(req, res);
});

route.post("/deposit", (req, res) => {
	new Deposit().handle(req, res);
});

route.get("/extract", (req, res) => {
	new Extract().handle(req, res);
});

export default route;