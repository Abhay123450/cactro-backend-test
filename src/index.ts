import express, { Application, NextFunction, Request, Response } from "express";
import { Cache } from "./components/cache/interface/Cache";
import { CacheImpl } from "./components/cache/CacheImpl";
import { cacheRouter } from "./components/cache/cache.router";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

const myCache: Cache = new CacheImpl();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.json("Hello World!");
});

app.use("/", cacheRouter(myCache));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: err.message
        // stack: err.stack
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
