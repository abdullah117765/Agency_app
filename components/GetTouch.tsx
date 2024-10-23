"use client";
import { createContact } from "@/app/dashboard/contacts/axiosApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTouchSchema } from "@/lib/validator";
import map from "@/public/California_map-L.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";

const GetTouch = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    message: "",
  };
  const form = useForm<z.infer<typeof getTouchSchema>>({
    resolver: zodResolver(getTouchSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  async function onSubmit(values: any) {
    try {
      await createContact(values);

      form.reset({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      alert("Contact submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit contact");
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full p-5 md:mt-10">
      <div className="flex flex-col md:flex-row items-center justify-center md:items-center md:justify-between px-4 sm:px-6 lg:px-36">
        <div className="flex flex-col items-center gap-10 justify-center px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="font-extrabold tracking-tighter text-2xl md:text-3xl border-b-4 border-yellow-500 py-2">
              Get in touch
            </h1>
            <div className="flex items-center justify-center gap-8">
              <InstagramLogoIcon />
              <LinkedInLogoIcon />
              <TwitterLogoIcon />
              <GitHubLogoIcon />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-8">
            <div className="flex items-center justify-center gap-5 px-3 py-2">
              <div>
                <Phone className="bg-yellow-500 rounded-full px-2 py-1 h-[40px] w-[40px]" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-bold tracking-tighter">+92 312 3456789</h1>
                <p className="text-gray-500 tracking-tighter">
                  Help phone support
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 px-3 py-2">
              <div>
                <Mail className="bg-yellow-500 rounded-full px-2 py-1 h-[40px] w-[40px]" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-bold tracking-tighter">
                  support@agency.com
                </h1>
                <p className="text-gray-500 tracking-tighter">
                  Help email support
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 px-3 py-2">
              <div>
                <MapPin className="bg-yellow-500 rounded-full px-2 py-1 h-[40px] w-[40px]" />
              </div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-bold tracking-tighter">
                  5th Avenue, New York, NY.
                </h1>
                <p className="text-gray-500 tracking-tighter">
                  Our office address
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 px-24 py-16 md:px-24 md:py-24">
          <div className="flex flex-col items-center justify-center gap-28">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-11"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="relative">
                      <FormLabel className="font-bold text-white">
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          {...field}
                          className="placeholder:text-slate-400 text-white w-full max-w-md"
                        />
                      </FormControl>
                      <FormMessage className="absolute text-red-500 text-sm -bottom-6">
                        {error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="relative">
                      <FormLabel className="font-bold text-white">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          className="placeholder:text-slate-400 text-white w-full max-w-md"
                        />
                      </FormControl>
                      <FormMessage className="absolute text-red-500 text-sm -bottom-6">
                        {error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="relative">
                      <FormLabel className="font-bold text-white">
                        Phone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="phone"
                          placeholder="Phone"
                          {...field}
                          className="placeholder:text-slate-400 text-white w-full max-w-md"
                        />
                      </FormControl>
                      <FormMessage className="absolute text-red-500 text-sm -bottom-10">
                        {error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="relative">
                      <FormLabel className="font-bold text-white">
                        Message *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          {...field}
                          className="placeholder:text-slate-400 text-white w-full max-w-md"
                        />
                      </FormControl>
                      <FormMessage className="absolute text-red-500 text-sm -bottom-6">
                        {error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-yellow-500 text-black hover:bg-yellow-500 hover:opacity-80 w-full max-w-md"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center my-24">
        <Image
          src={map}
          alt="map"
          height={700}
          width={700}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default GetTouch;
