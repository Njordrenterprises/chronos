import { generateId } from "../utils/id_generator.ts";

interface TimeEntry {
  timestamp: string;
  userId: string;
  isActive: boolean;
}

export async function handleStart(_req: Request): Promise<Response> {
  const kv = await Deno.openKv();
  
  try {
    const userId = generateId();
    const entry: TimeEntry = {
      timestamp: new Date().toISOString(),
      userId,
      isActive: true
    };
    
    await kv.set(["startDate", userId], entry);
    
    const html = `
      <h2>Time Entry</h2>
      <p>Started at: ${new Date(entry.timestamp).toLocaleString()}</p>
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
