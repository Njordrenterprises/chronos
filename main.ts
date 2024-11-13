// Import handlers for our API endpoints
import { handleStart } from "./api/start.ts";
import { handleDb } from "./api/db.ts";

// Define server port
const port = 8000;

// Main request handler function - processes all incoming HTTP requests
async function handler(req: Request): Promise<Response> {
  // Parse the URL from the request to determine which route to handle
  const url = new URL(req.url);
  
  // Route: Serve the main HTML page
  // When: GET request to root "/"
  // Does: Reads and returns the index.html file
  if (url.pathname === "/" && req.method === "GET") {
    const html = await Deno.readFile("./frontend/index.html");
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  }
  
  // Route: Serve the CSS file
  // When: GET request to "/frontend/main.css"
  // Does: Reads and returns the main.css file
  if (url.pathname === "/frontend/main.css" && req.method === "GET") {
    const css = await Deno.readFile("./frontend/main.css");
    return new Response(css, {
      headers: { "Content-Type": "text/css" },
    });
  }
  
  // Route: Handle time entry creation
  // When: POST request to "/api/start"
  // Does: Creates new time entry and returns HTML fragment
  if (url.pathname === "/api/start" && req.method === "POST") {
    return await handleStart(req);
  }
  
  // Route: Handle database view
  // When: GET request to "/api/db"
  // Does: Retrieves and returns all time entries as HTML fragment
  if (url.pathname === "/api/db" && req.method === "GET") {
    return await handleDb(req);
  }

  // Handle 404 Not Found
  // When: Any request that doesn't match above routes
  // Does: Returns a 404 status with simple message
  return new Response("Not Found", { 
    status: 404,
    headers: { "Content-Type": "text/html" }
  });
}

// Start the server and log initialization message
console.log(`🚀 CHRONOSPHERE INITIALIZED ON http://localhost:${port}`);
Deno.serve({ port }, handler);
