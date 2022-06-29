import Accounts from "./account";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Accounts);

export default app;