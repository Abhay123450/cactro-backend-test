import { NextFunction, Request, Response } from "express";
import { Cache } from "./interface/Cache";

export class CacheController {
    _cache: Cache;
    constructor(cache: Cache) {
        this._cache = cache;
    }

    getValue(req: Request, res: Response, _next: NextFunction) {
        const key = req.params.key;
        const value = this._cache.get(key);
        if (value === undefined) {
            res.status(404).json({
                success: false,
                message: `Key ${key} not found`
            });
        }
        res.json({
            success: true,
            message: "Value fetched successfully",
            data: value
        });
    }

    getAll(_req: Request, res: Response, _next: NextFunction) {
        res.json({
            success: true,
            message: "All values fetched successfully",
            data: this._cache.getAll()
        });
    }

    setvalue(req: Request, res: Response, _next: NextFunction) {
        const { key, value } = req.body;
        if (!key || value === undefined) {
            throw new Error("key and value are required");
        }
        this._cache.set(key, value);
        res.json({
            success: true,
            message: "Value saved successfully",
            data: { [key]: value }
        });
    }

    deleteValue(req: Request, res: Response, _next: NextFunction) {
        const key = req.params.key;
        this._cache.delete(key);
        res.json({
            success: true,
            message: "Value deleted successfully"
        });
    }
}
