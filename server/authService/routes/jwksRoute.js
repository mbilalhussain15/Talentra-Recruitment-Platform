import express from "express";
import fs from "fs";
import path from "path";
import { kid } from "../utils/jwtGenerator.js";

const router = express.Router();

const publicKey = fs.readFileSync(path.join(process.cwd(), "keys/public.key"), "utf8");

router.get("/", (req, res) => {
  const publicJWK = {
    keys: [
      {
        kty: "RSA",
        kid,
        use: "sig",
        alg: "RS256",
        n: publicKey
          .match(
            /(?:-----BEGIN PUBLIC KEY-----)(.*)(?:-----END PUBLIC KEY-----)/s
          )[1]
          .replace(/\n/g, ""),
        e: "AQAB",
      },
    ],
  };
  res.json(publicJWK);
});

export default router;
