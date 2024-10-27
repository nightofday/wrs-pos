"use client";

import { useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { CustomerModal } from "@/components/customers/customer-modal";
import { deleteCustomer } from "@/lib/actions/customer-actions";
import { useRouter } from "next/navigation";

export function CustomersTable({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const router = useRouter();

  const openModal = useCallback((customer?: Customer) => {
    setSelectedCustomer(customer || null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure you want to delete this customer?")) {
        await deleteCustomer(id);
        setCustomers((prevCustomers) =>
          prevCustomers.filter((c) => c.id !== id)
        );
        router.refresh();
      }
    },
    [router]
  );

  const handleCustomerUpdated = useCallback((updatedCustomer: Customer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) =>
        c.id === updatedCustomer.id ? updatedCustomer : c
      )
    );
  }, []);

  const handleCustomerCreated = useCallback((newCustomer: Customer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer List</h2>
        <Button onClick={() => openModal()}>Add Customer</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.status}</TableCell>
              <TableCell>{customer.customerType}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openModal(customer)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        customer={selectedCustomer}
        onCustomerUpdated={handleCustomerUpdated}
        onCustomerCreated={handleCustomerCreated}
      />
    </>
  );
}
