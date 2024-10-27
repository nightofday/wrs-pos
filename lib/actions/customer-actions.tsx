"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Customer } from "@/types/customer";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const getSupabaseClient = () => {
  return createServerComponentClient({ cookies });
};

export async function getCustomers(): Promise<Customer[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("customers").select("*");
  if (error) throw error;
  return data;
}

const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  notes: z.string().optional(),
  photo: z.string().url().optional(),
  status: z.enum(["active", "inactive"]),
  customerType: z.enum(["reseller", "walk-in"]),
});

export async function createCustomer(data: z.infer<typeof customerSchema>) {
  const supabase = getSupabaseClient();
  const customer = customerSchema.parse(data);

  const { data: newCustomer, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/customers");
  return newCustomer;
}

export async function updateCustomer(
  id: string,
  data: z.infer<typeof customerSchema>
) {
  const supabase = getSupabaseClient();
  const customer = customerSchema.parse(data);

  const { data: updatedCustomer, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/customers");
  return updatedCustomer;
}

export async function deleteCustomer(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/customers");
}
