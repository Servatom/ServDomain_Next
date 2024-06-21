import Image from "next/image";
import logo from "../../assets/media/logo_small.png";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-row justify-between px-32 py-16 bg-primary-foreground/30 backdrop-blur-sm relative">
      <Image
        src={logo}
        alt="Servatom Logo"
        className="w-52 h-52 right-24 bottom-8 absolute opacity-5 saturate-0"
      />
      <div className="select-none tracking-tight flex flex-col gap-2 items-start opacity-70 max-w-[40%] z-20 h-full">
        <h1 className="font-semibold text-3xl sm:text-6xl">servdomain.</h1>
        <p className=" mt-4 opacity-50 text-base sm:text-xl">
          Flexible Subdomain Plans
        </p>
        <p className=" mt-2 opacity-50 text-base">
          Enabling students and developers to own their space on the internet,
          at affordable prices.
        </p>
        <p className="mt-16 opacity-50 text-base">
          Address: J-406, Purva Fountain Square, <br /> Marathahalli, Bangalore,
          Karnataka - 560037, India
        </p>
        <p className="opacity-60 text-base">
          Email:
          <a
            href="mailto:servdomain@servatom.com"
            className="underline underline-offset-2 ml-2"
          >
            servdomain@servatom.com
          </a>
        </p>

        <span className="mt-8 opacity-50 text-xs">
          Born at{" "}
          <a
            target="_blank"
            href="https://github.com/servatom"
            className="border-b border-spacing-4 border-purple-400"
          >
            Servatom
          </a>
        </span>

        <p className="opacity-50 text-base">
          © {new Date().getFullYear()} Servatom. All Rights Reserved.
        </p>
      </div>
      <div className="flex flex-col gap-4 opacity-70">
        <h3 className="opacity-50 text-base sm:text-xl">Links</h3>
        <Link href={"/privacy"} className="underline underline-offset-4">
          Privacy Policy
        </Link>

        <Link href={"/tnc"} className="underline underline-offset-4">
          Terms and Conditions
        </Link>

        <Link
          href={"/tnc#cancellation"}
          className="underline underline-offset-4"
        >
          Cancellation and Refund
        </Link>

        <Link href={"/support"} className="underline underline-offset-4">
          Contact Us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
