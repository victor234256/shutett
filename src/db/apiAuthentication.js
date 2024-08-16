import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUserData() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}
// if no error return session.session users data then.

// creating a new API for signing up
export async function signup({ name, email, password, phone, profile_images }) {
  const fileName = `displayPicture-${name
    .split(" ")
    .join("-")} -${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profile_images")
    .upload(fileName, profile_images);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        profile_images: `${supabaseUrl}/storage/v1/object/public/profile_images/${fileName}`,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
