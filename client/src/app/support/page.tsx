"use client";
import Button from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Terms } from "@/config";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Support() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-start p-6 sm:p-12 text-gray-300">
            <h1 className="font-semibold text-3xl flex flex-row items-center">
                <IoArrowBackOutline
                    className="text-gray-300 mr-6 cursor-pointer"
                    onClick={() => {
                        router.back();
                    }}
                />
                Support
            </h1>
            <p className="p-4 sm:ml-10 mt-4">
                For any queries or support, you can fill the following form or
                write directly at{" "}
                <a
                    href="mailto:servdomain@servatom.com"
                    className="underline underline-offset-2 text-pink-500"
                >
                    servdomain@servatom.com
                </a>{" "}
                . Queries will be answered within 4 business days.
            </p>
            <form
                className="px-6 sm:px-14 my-4 py-4 flex flex-col gap-6 w-full max-w-3xl mx-auto mt-16"
                action={`https://formie.io/form/${process.env.NEXT_PUBLIC_FORMIE_KEY}`}
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.currentTarget.submit();
                    toast({
                        title: "Sit back and Relax!",
                        description:
                            "Your query has been submitted successfully. We'll get back to you soon.",
                    });
                }}
            >
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    <input
                        name="_redirect"
                        type="hidden"
                        value={
                            process.env.NODE_ENV === "development"
                                ? "http://localhost:3000/"
                                : "https://domains.servatom.com/"
                        }
                    ></input>
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="email">Email ID</label>
                        <Input
                            type="email"
                            name="email"
                            required
                            id="email"
                            placeholder="johndoe123@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="name">Full Name</label>
                        <Input
                            type="text"
                            name="name"
                            required
                            id="name"
                            placeholder="John Doe"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <label htmlFor="concern">Concern/Feedback</label>
                    <Textarea
                        className="text-xl"
                        name="concern"
                        required
                        id="concern"
                        rows={5}
                        placeholder="I would like to raise a concern regarding my subdomain 'cooldude69' ..."
                    />
                </div>
                <Button className="mt-3 opacity-90" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}
