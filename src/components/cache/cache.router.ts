import { Router } from "express";
import { Cache } from "./interface/Cache";
import { CacheController } from "./CacheController";

const router = Router();

export function cacheRouter(cache: Cache): Router {
    const cacheController = new CacheController(cache);

    router.get("/cache/all", cacheController.getAll.bind(cacheController));

    router.get("/cache/:key", cacheController.getValue.bind(cacheController));

    router.post("/cache", cacheController.setvalue.bind(cacheController));

    router.delete(
        "/cache/:key",
        cacheController.deleteValue.bind(cacheController)
    );

    return router;
}
