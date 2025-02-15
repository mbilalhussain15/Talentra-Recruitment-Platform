import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../../.env") });


async function fetchJWKS(jku) {
  const response = await axios.get(jku);
  return response.data.keys;
}

function getPublicKeyFromJWKS(kid, keys) {
  const key = keys.find((k) => k.kid === kid);
  if (!key) throw new Error("Unable to find a signing key that matches the 'kid'");
  return `-----BEGIN PUBLIC KEY-----\n${key.n}\n-----END PUBLIC KEY-----`;
}

async function verifyJWTWithJWKS(token) {
  const { header } = jwt.decode(token, { complete: true });
  const { kid, jku, alg } = header;

  if (!kid || !jku) throw new Error("JWT header missing 'kid' or 'jku'");
  if (alg !== "RS256") throw new Error(`Unsupported algorithm: ${alg}`);

  const keys = await fetchJWKS(jku);
  const publicKey = getPublicKeyFromJWKS(kid, keys);
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
}



function verifyRole(allowedRoles) {
    return async (req, res, next) => {
    //   const token = req.headers.authorization?.split(" ")[1];
    const token = req.cookies.authToken;

    console.log("Token:", token);
    console.log("Allowed Roles:", allowedRoles);
      if (!token) {
        console.log("Token missing");
        return res.status(401).json({ message: "Authorization token missing" });
      }
  
      try {
        const decoded = await verifyJWTWithJWKS(token);
        console.log("Decoded Token:", JSON.stringify(decoded, null, 2)); 
        req.user = decoded;
  
        const userRoles = req.user.roles || [];
        console.log("User Roles:", userRoles);
        console.log("Allowed Roles:", allowedRoles); 
  
        if (allowedRoles.some((role) => userRoles.includes(role))) {
          console.log("Role matched, access granted.");
          return next(); 
        }
        console.log("Role mismatch: Access forbidden");
        res.status(403).json({ message: "Access forbidden: Insufficient role" });
      } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ message: "Invalid or expired token", error: error.message });
      }
    };
  }
  

function restrictToOwnData(idField) {
  return (req, res, next) => {
    if (req.user[idField] !== req.params.id) {
      return res.status(403).json({ message: "Access forbidden: Restricted to own data" });
    }
    next();
  };
}

export { verifyRole, restrictToOwnData };
