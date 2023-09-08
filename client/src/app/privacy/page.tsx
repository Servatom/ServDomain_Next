"use client";
import { Terms } from "@/config";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function TnC() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start p-12 text-gray-300">
      <h1 className="font-semibold text-3xl my-3 flex flex-row items-center">
        <IoArrowBackOutline
          className="mr-6 cursor-pointer hidden sm:block"
          onClick={() => {
            router.back();
          }}
        />
        Privacy Policy
      </h1>
      <div className="flex flex-col sm:px-14 gap-4">
        <h3 className="font-semibold text-base text-gray-400">
          Last updated on Sep 8th 2023
        </h3>
        <p>
          <p className="mt-4">
            This privacy policy sets out how Servatom uses and protects any
            information that you give Servatom when you use this website.
          </p>
          <p className="mt-4">
            Servatom is committed to ensuring that your privacy is protected.
            Should we ask you to provide certain information by which you can be
            identified when using this website, and then you can be assured that
            it will only be used in accordance with this privacy statement.
          </p>
          <p className="mt-4">
            Servatom may change this policy from time to time by updating this
            page. You should check this page from time to time to ensure that
            you are happy with any changes.
          </p>
          <p className="mt-4">
            <strong>We may collect the following information:</strong>
          </p>
          <ul className="list-disc list-inside">
            <li className="list-item">Full name</li>
            <li className="list-item">Phone number and email address</li>
            <li className="list-item">
              Payment information including credit/ debit card information
              (handled by Stripe)
            </li>
            <li className="list-item">
              Other information relevant to customer surveys and/or offers
            </li>
          </ul>
          <p className="mt-4">
            <strong>What we do with the information we gather:</strong>
          </p>
          <p className="mt-4">
            We require this information to understand your needs and provide you
            with a better service, and in particular for the following reasons:
          </p>
          <ul className="list-disc list-inside">
            <li className="list-item">Internal record keeping.</li>
            <li className="list-item">
              Creating your Stripe Customer Account for managing subscriptions.
            </li>
            <li className="list-item">
              Charging you for the subscription using Stripe.
            </li>
            <li className="list-item">
              We may use the information to improve our products and services.
            </li>
            <li className="list-item">
              We may periodically send promotional emails about new products,
              special offers or other information which we think you may find
              interesting using the email address which you have provided.
            </li>
            <li className="list-item">
              From time to time, we may also use your information to contact you
              for market research purposes. We may contact you by email or
              phone. We may use the information to customise the website
              according to your interests.
            </li>
          </ul>
          <p className="mt-4">
            We are committed to ensuring that your information is secure. In
            order to prevent unauthorised access or disclosure we have put in
            suitable measures.
          </p>
          <p className="mt-4">
            <strong>How we use cookies:</strong>
          </p>
          <p className="mt-4">
            A cookie is a small file which asks permission to be placed on your
            computer&apos;s hard drive. Once you agree, the file is added and
            the cookie helps analyses web traffic or lets you know when you
            visit a particular site. Cookies allow web applications to respond
            to you as an individual. The web application can tailor its
            operations to your needs, likes and dislikes by gathering and
            remembering information about your preferences.
          </p>
          <p className="mt-4">
            We use cookies to store user information for authentication and to
            provide a better user experience.
          </p>
          <p className="mt-4">
            Overall, cookies help us provide you with a better and personalised
            website experience. A cookie in no way gives us access to your
            computer or any information about you, other than the data you
            choose to share with us.
          </p>
          <p className="mt-4">
            You can choose to accept or decline cookies. Most web browsers
            automatically accept cookies, but you can usually modify your
            browser setting to decline cookies if you prefer. This may prevent
            you from taking full advantage of the website.
          </p>
          <p className="mt-4">
            <strong>Controlling your personal information:</strong>
          </p>
          <p className="mt-4">
            You may choose to restrict the collection or use of your personal
            information in the following ways:
          </p>
          <ul className="list-disc list-inside">
            <li className="list-item">
              whenever you are asked to fill in a form on the website, look for
              the box that you can click to indicate that you do not want the
              information to be used by anybody for direct marketing purposes
            </li>
            <li className="list-item">
              if you have previously agreed to us using your personal
              information for direct marketing purposes, you may change your
              mind at any time by filling the form on the{" "}
              <a
                href="/support"
                className="text-pink-500 underline underline-offset-4"
              >
                support page
              </a>{" "}
              or by emailing us at{" "}
              <a
                href="mailto:yash22arora+servatom@gmail.com"
                className="text-pink-500 underline underline-offset-4"
              >
                yash22arora+servatom@gmail.com
              </a>
            </li>
          </ul>
          <p className="mt-4">
            We will not sell, distribute or lease your personal information to
            third parties unless we have your permission or are required by law
            to do so. We may use your personal information to send you
            promotional information about third parties which we think you may
            find interesting if you tell us that you wish this to happen.
          </p>
          <p className="mt-4">
            If you believe that any information we are holding on you is
            incorrect or incomplete, please write to or email us as soon as
            possible, at the above address. We will promptly correct any
            information found to be incorrect.
          </p>
        </p>
      </div>
    </div>
  );
}
