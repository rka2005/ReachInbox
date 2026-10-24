import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

const gClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Backend is running",
  });
});

app.post("/api/auth/google", async (req: Request, res: Response) => {
    try {
        const { credential } = req.body;

        if(!credential) {
            return res.status(400).json ({
                message: "Google Credential missing"
            });
        }

        const ticket = await gClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({
                message: "User not identified",
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
            },
        });
    }

    catch {
        return res.status(401).json({
            message: "Login failed",
        });
    }
});


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});