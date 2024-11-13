// Import Deno's argument parser
import { parse } from "https://deno.land/std/flags/mod.ts";

// Interface shared across the application for time entries
interface TimeEntry {
  timestamp: string;    // Creation time
  userId: string;       // Unique identifier
  isActive: boolean;    // Current status
}

// Function to retrieve all time entries from the database
async function parseTimeEntry(): Promise<TimeEntry[]> {
  const kv = await Deno.openKv();
  const entries = kv.list<TimeEntry>({ prefix: ["startDate"] });
  const timeEntries: TimeEntry[] = [];
  
  // Collect all entries
  for await (const entry of entries) {
    timeEntries.push(entry.value);
  }
  
  await kv.close();
  return timeEntries;
}

// Main CLI function
async function main() {
  // Parse command line arguments
  const args = parse(Deno.args);
  const entries = await parseTimeEntry();
  
  // Output JSON format if --json flag is present
  if (args.json) {
    console.log(JSON.stringify(entries, null, 2));
    return;
  }
  
  // Default pretty-printed console output with emojis
  console.log("\n🕒 CHRONOSPHERE TIME ENTRIES:\n");
  entries.forEach(entry => {
    console.log(`Time Entry: ${new Date(entry.timestamp).toLocaleString()}`);
    console.log(`Status: ${entry.isActive ? '🟢 Active' : '🔴 Inactive'}`);
    console.log(`ID: ${entry.userId}`);
    console.log("-------------------");
  });
}

// Only run if called directly (not imported)
if (import.meta.main) {
  main();
}