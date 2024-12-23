"use client";

import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/loader/loader";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone } from "lucide-react";
import api from "@/lib/api";

// Validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  suburb: z.string().optional(),
  state: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// Type inference from Zod schema
type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
        name: '',
        email: '',
        phone: '',
        suburb: '',
        state: '',
        message: ''
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await api("api/v2/email/send", {
        method: "POST",
        body: data,
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong.");
      }

      return response;
    },
    onSuccess: () => {
      toast.success("Your message has been sent");
      reset(); // Reset the form on success
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <div className="container mx-auto p-5 flex flex-col gap-8 min-h-screen md:flex-row lg:p-12 lg:gap-[8rem]">
      <Toaster />
      <div className="md:p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">
          Contact Us
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {/* Suburb Field */}
            <div className="w-full">
              <label
                htmlFor="suburb"
                className="block text-xs font-medium text-gray-600"
              >
                Suburb
              </label>
              <input
                type="text"
                id="suburb"
                {...register("suburb")}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.suburb && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.suburb.message}
                </p>
              )}
            </div>

            {/* State Field */}
            <div className="w-full">
              <label
                htmlFor="state"
                className="block text-xs font-medium text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                {...register("state")}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full md:w-[150px] bg-[#1F2937] hover:bg-black text-white transition-all font-medium py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                isPending && 'rounded-lg'
              }`}
            >
              {isPending ? <Loader className="" loaderStyles="!h-[25px] !w-[25px]" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-4 md:w-[26%] md:mt-[5rem]">
        <p className="text-sm block">Get in Touch!</p>
        <p className="text-xs block">
          We&apos;d love to hear from you - please use the form to send us your
          message or contact us using the following
        </p>
        <div className="flex flex-col gap-2">
          <p className="flex items-center mt-1 gap-2 text-xs">
            <Phone size={15} /> +61 412 131 460
          </p>
          <a href="mailto:info@sefpro.com.au">
            <p className="flex items-center mt-1 gap-2 text-xs">
              <Mail size={15} />
              info@sefpro.com.au
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
