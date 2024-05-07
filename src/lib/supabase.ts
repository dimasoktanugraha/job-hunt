import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!!
);

export const createId = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const characterLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
    counter += 1;
  }
  return result;
};

export const supabasePublicUrl = async (filename: string, bucket: string) => {
  const {
    data: { publicUrl },
  } = await supabaseClient.storage
    .from(bucket)
    .getPublicUrl(`public/${filename}`);

  return publicUrl;
};

export const supabaseUploadFile = async (
  file: File | string,
  bucket: string
) => {
  const filename = `resume-${createId(6)}.pdf`;
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload("public/" + filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, error, filename };
};

export const supabaseDeleteFile = async (
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .remove([`public/${filename}`]);

  return { data, error };
};

export const supabaseUpdateFile = async (
  file: File | string,
  filename: string,
  bucket: "company" | "applicant"
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .update(`public/${filename}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  return { data, error };
};
