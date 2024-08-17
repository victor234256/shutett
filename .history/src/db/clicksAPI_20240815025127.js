import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksFromURL(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds); // in means inside

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load clicks");
  }
  return data;
}

const parser = new UAParser();

export const clicksStoring = async ({ id, originalUrl }) => {
  try {
    // Get device type
    const res = parser.getResult();
    const device = res.device.type || "desktop"; // Adjusted to use device.type

    // Fetch country and city data
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Failed to fetch location data");

    const data = await response.json();
    const { city, country_name: country } = data;

    // Insert data into Supabase
    await supabase.from("clicks").insert({
      url_id: id,
      city: city || "Unknown",
      country: country || "Unknown",
      device: device,
    });

    // Redirect user to the original URL

    window.location.href = originalUrl;
    // console.log(originalUrl);
  } catch (error) {
    console.error("Error storing click data: ", error);
  }
};

export async function gettingClickFromURL(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load Stats");
  }
  return data;
}
