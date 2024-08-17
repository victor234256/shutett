// api/redirect.js
import { createClient } from "@supabase/supabase-js";
import { clicksStoring } from "../db/clicksAPI";

// eslint-disable-next-line no-undef
const supabaseUrl = process.env.SUPABASE_URL;
// eslint-disable-next-line no-undef
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { shorturl } = req.query;

  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${shorturl}, custom_url.eq.${shorturl}`)
    .single();

  if (error || !data) {
    res.status(404).json({ message: "URL not found" });
  } else {
    // Store click statistics
    await clicksStoring({ id: data.id, originalUrl: data.original_url });

    res.writeHead(301, { Location: data.original_url });
    res.end();
  }
}
