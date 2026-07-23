import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { runBhojpuriCode } from "./src/engine/index";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Endpoint: POST /run and POST /api/run
  const runHandler = (req: express.Request, res: express.Response) => {
    const { code } = req.body || {};
    if (typeof code !== "string") {
      res.status(400).json({
        success: false,
        output: "",
        errors: ["Invalid request body. 'code' field must be a string."],
      });
      return;
    }

    const result = runBhojpuriCode(code);
    res.json(result);
  };

  app.post("/run", runHandler);
  app.post("/api/run", runHandler);

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", language: "BhojpuriLang" });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BhojpuriLang Web IDE Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
