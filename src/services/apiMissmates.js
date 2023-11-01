import supabase from "./supabase";

export async function getMissmates() {
  const { data, error } = await supabase.from("missmates").select("*");
  if (error) {
    console.error(error);
    throw new Error("No se han podido cargar...");
  }

  return data;
}

export async function createMissmate(newMissmate) {
  const { data, error } = await supabase
    .from("missmates")
    .insert([newMissmate])
    .select();
  console.log(data, error);
}
