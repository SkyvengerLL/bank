import * as dotenv from "dotenv";
dotenv.config();

const config = {
   dbstring: process.env.DB_STRING
};

export { config };