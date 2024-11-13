import { parse } from "https://deno.land/std/flags/mod.ts";

interface TimeEntry {
  timestamp: string;
  userId: string;
  isActive: boolean;
}

async function parseTimeEntry(): Promise<TimeEntry[]> {
  const kv = await Deno.openKv();
  const entries = kv.list<TimeEntry>({ prefix: ["startDate"] });
  const timeEntries: TimeEntry[] = [];
  
  for await (const entry of entries) {
    timeEntries.push(entry.value);
  }
  
  await kv.close();
  return timeEntries;
}

async function main() {
  const args = parse(Deno.args);
  const entries = await parseTimeEntry();
  
  if (args.json) {
    console.log(JSON.stringify(entries, null, 2));
    return;
  }
  
  console.log("\n🕒 CHRONOSPHERE TIME ENTRIES:\n");
  entries.forEach(entry => {
    console.log(`Time Entry: ${new Date(entry.timestamp).toLocaleString()}`);
    console.log(`Status: ${entry.isActive ? '🟢 Active' : '🔴 Inactive'}`);
    console.log(`ID: ${entry.userId}`);
    console.log("-------------------");
  });
}

if (import.meta.main) {
  main();
}
