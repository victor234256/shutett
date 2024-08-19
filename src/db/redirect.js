// api/redirect.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { clicksStoring } from "./clicksAPI";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { shorturl } = req.query;

  try {
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
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
