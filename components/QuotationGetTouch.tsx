"use client";
import React from "react";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getQuoteSchema } from "@/lib/validator";

const QuotaionGetTouch = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    services: "",
    NoOfServices: 0,
    comments: "",
  };

  const form = useForm({
    resolver: zodResolver(getQuoteSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  async function onSubmit(values: any) {
    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      form.reset(initialValues);

      alert("Quote submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit quote");
    }
  }

  return (
    <div id="quote-form" className="max-w-7xl mx-auto px-10 py-5">
      <div className="flex flex-col items-center justify-center gap-2 md:mb-3 mb-3">
        <h1 className="font-extrabold tracking-tighter text-3xl md:text-3xl border-b-8 border-yellow-500 py-2">
          Fill Out The Form To Get Quote
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-20 mb-32">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex gap-10 items-center justify-center w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">First Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...field}
                        className="placeholder:text-slate-400 w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {error?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">Last Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...field}
                        className="placeholder:text-slate-400 w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {error?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="placeholder:text-slate-400 w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="font-bold">Phone *</FormLabel>
                  <FormControl>
                    <Input
                      type="phone"
                      placeholder="Phone"
                      {...field}
                      className="placeholder:text-slate-400 w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-16 w-full">
              <FormField
                control={form.control}
                name="services"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <FormLabel className="font-bold text-black">
                      Services *
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="placeholder:text-slate-400 text-black border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      >
                        <option value="">Select a Service</option>
                        <option value="Service_Type_1">Service Type 1</option>
                        <option value="Service_Type_2">Service Type 2</option>
                        <option value="Service_Type_3">Service Type 3</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {error?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="NoOfServices"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold">
                      Leads/Services *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the number of leads you are looking to get"
                        value={field.value}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                        className="placeholder:text-slate-400 w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm">
                      {error?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="comments"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="font-bold">Comments *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comments if any"
                      {...field}
                      className="placeholder:text-slate-400 w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm">
                    {error?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-yellow-500 text-black hover:bg-yellow-500 hover:opacity-80 w-full"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuotaionGetTouch;
