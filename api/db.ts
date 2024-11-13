// Interface defining the structure of time entries in our database
interface TimeEntry {
  timestamp: string;    // When the entry was created (ISO format)
  userId: string;       // Unique identifier (e.g., "quantum-hacking-dragon")
  isActive: boolean;    // Current status of the time entry
}

// Handler for GET requests to /api/db
// Returns HTML fragment containing all time entries for HTMX to inject
export async function handleDb(_req: Request): Promise<Response> {
  // Open connection to Deno KV database
  const kv = await Deno.openKv();
  
  try {
    // List all entries with prefix "startDate"
    const entries = kv.list<TimeEntry>({ prefix: ["startDate"] });
    const timeEntries: TimeEntry[] = [];
    
    // Collect all entries into array
    for await (const entry of entries) {
      timeEntries.push(entry.value);
    }
    
    // Reverse order to show newest first
    timeEntries.reverse();
    
    // Generate HTML fragment with cyberpunk styling
    const html = `
      <div class="db-container">
        <h2>Database Entries</h2>
        <div class="db-entries">
          ${timeEntries.map(entry => `
            <div class="db-entry ${entry.isActive ? 'active' : 'inactive'}">
              <div class="entry-header">
                <span class="status-dot"></span>
                <h3 class="entry-id">Entry ID: ${entry.userId}</h3>
              </div>
              <p>Started: ${new Date(entry.timestamp).toLocaleString()}</p>
              <p>Status: ${entry.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  } finally {
    kv.close();
  }
}
