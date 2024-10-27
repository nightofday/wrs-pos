"use client";

import { Suspense } from "react";
import { CustomersTable } from "@/components/customers/customers-table";
import { getCustomers } from "@/lib/actions/customer-actions";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">Customers</h1>
      </div>
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomersTable initialCustomers={customers} />
      </Suspense>
    </div>
  );
}
