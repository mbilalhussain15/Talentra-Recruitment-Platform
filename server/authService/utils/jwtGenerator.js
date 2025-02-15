import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: path.resolve("../../.env") });



const privateKey = fs.readFileSync(path.join(process.cwd(), "keys/private.key"), "utf8");


const kid = "1";  
const jku = `http://localhost:${process.env.PORT_AUTH_SERVICE}/.well-known/jwks.json`; 

function generateJWTWithPrivateKey(payload) {
  const options = {
    algorithm: "RS256",
    expiresIn: "1h",
    header: { kid, jku }  
  };

  return jwt.sign(payload, privateKey, options);
}

export { generateJWTWithPrivateKey, kid };
