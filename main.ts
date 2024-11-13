import { handleStart } from "./api/start.ts";

const port = 8000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  if (url.pathname === "/" && req.method === "GET") {
    const html = await Deno.readFile("./frontend/index.html");
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }
  
  if (url.pathname === "/frontend/main.css" && req.method === "GET") {
    const css = await Deno.readFile("./frontend/main.css");
    return new Response(css, {
      headers: { "Content-Type": "text/css" },
    });
  }
  
  if (url.pathname === "/api/start" && req.method === "POST") {
    return await handleStart(req);
  }

  return new Response("Not Found", { 
    status: 404,
    headers: { "Content-Type": "text/html" }
  });
}

console.log(`🚀 CHRONOSPHERE INITIALIZED ON http://localhost:${port}`);
Deno.serve({ port }, handler);
