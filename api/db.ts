interface TimeEntry {
  timestamp: string;
  userId: string;
  isActive: boolean;
}

export async function handleDb(_req: Request): Promise<Response> {
  const kv = await Deno.openKv();
  
  try {
    const entries = kv.list<TimeEntry>({ prefix: ["startDate"] });
    const timeEntries: TimeEntry[] = [];
    
    for await (const entry of entries) {
      timeEntries.push(entry.value);
    }
    
    const html = `
      <div class="db-container">
        <h2>Database Entries</h2>
        <div class="db-entries">
          ${timeEntries.map(entry => `
            <div class="db-entry ${entry.isActive ? 'active' : 'inactive'}">
              <div class="entry-header">
                <span class="status-dot"></span>
                <h3>Entry ID: ${entry.userId}</h3>
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
