// Netlify Scheduled Function — keeps the Free-plan Supabase project awake.
//
// Supabase pauses Free projects after ~7 days of low DATABASE activity, not
// after low HTTP traffic. The auth health endpoint answers without touching
// Postgres, so pinging it does not reset the inactivity timer. A PostgREST read
// evaluates RLS and runs a real query, which is what the timer actually counts.

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

const KEEP_ALIVE_PATH = "/rest/v1/projects?select=id&limit=1";

export default async function handler() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("keep-alive: missing Supabase URL or anon key in environment");
    return new Response("Missing Supabase configuration", { status: 500 });
  }

  const url = `${SUPABASE_URL.replace(/\/+$/, "")}${KEEP_ALIVE_PATH}`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        `keep-alive: Supabase returned ${response.status}`,
        body.slice(0, 500),
      );
      return new Response(`Supabase returned ${response.status}`, {
        status: 502,
      });
    }

    const rows = await response.json();
    const count = Array.isArray(rows) ? rows.length : 0;
    console.log(`keep-alive: ok, ${count} row(s) read`);
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("keep-alive: request failed", error);
    return new Response("Supabase request failed", { status: 502 });
  }
}

// Every 6 hours (UTC). Supabase looks for "a few user requests each day" over a
// 7-day window, and Netlify's minimum scheduled interval is 1 hour.
export const config = { schedule: "0 */6 * * *" };
