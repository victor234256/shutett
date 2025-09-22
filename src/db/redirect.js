import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function redirect(shorturl) {
	const { data, error } = await supabase
		.from("urls")
		.select("id, original_url")
		.or(
			`short_url.eq.${shorturl}, custom_url.eq.${shorturl}`,
		)
		.single();

	if (error || !data) {
		alert("URL not found");
		return;
	}

	// track clicks (frontend-safe version)
	await supabase.from("clicks").insert({
		url_id: data.id,
		device: "desktop", // or detect
	});

	// redirect
	window.location.href = data.original_url;
}
