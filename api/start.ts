// Import our custom ID generator for creating unique time entry IDs
import { generateId } from "../utils/id_generator.ts";

// Define the shape of our time entry data
interface TimeEntry {
  timestamp: string;    // ISO string of when entry was created
  userId: string;       // Our custom generated ID (e.g., "quantum-hacking-dragon")
  isActive: boolean;    // Whether this time entry is currently running
}

// Handler for POST requests to /api/start
// Creates a new time entry and returns HTML fragment for HTMX to inject
export async function handleStart(_req: Request): Promise<Response> {
  // Open connection to Deno KV database
  const kv = await Deno.openKv();
  
  try {
    // Generate unique ID and create new time entry
    const userId = generateId();
    const entry: TimeEntry = {
      timestamp: new Date().toISOString(),
      userId,
      isActive: true
    };
    
    // Store entry in KV database
    // Key structure: ["startDate", userId] allows for easy listing/filtering
    await kv.set(["startDate", userId], entry);
    
    // Generate HTML fragment for HTMX to inject into the page
    // Shows entry details with cyberpunk styling
    const html = `
      <h2>Time Entry</h2>
      <p>Started at: ${new Date(entry.timestamp).toLocaleString()}</p>
      <p class="entry-id">ID: ${entry.userId}</p>
    `;
    
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
    
  } catch (error: unknown) {
    // Error handling with type narrowing for better error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  } finally {
    // Always close the KV connection to prevent resource leaks
    kv.close();
  }
}