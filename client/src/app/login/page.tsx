"use client";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase.config";
import { validateOtp, validatePhoneNumber } from "@/lib/utils";
import AuthContext from "@/store/auth-context";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TUser } from "@/types/types";
import { axiosBackendInstance } from "@/lib/axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const setServerLogin = async (user: TUser) => {
  return await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpInputRef = useRef<HTMLInputElement>(null);
  const authCtx = useContext(AuthContext);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setPhoneNumber(e.target.value);
    } else {
      setPhoneNumber(e.target.value.slice(0, 10));
    }
  };

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleSendOtp();
        },
      });
    }
  };

  const handleSendOtp = () => {
    if (isPhoneValid) {
      setLoading(true);
      onCaptchaVerify();
      const formattedPhoneNumber = "+91" + phoneNumber;

      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).

          window.confirmationResult = confirmationResult;
          setOtpSent(true);
          setLoading(false);
          toast({
            title: "OTP sent successfully!",
          });
          if (otpInputRef.current) otpInputRef.current.focus();
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error sending OTP. Try again later.",
            variant: "destructive",
          });
          setLoading(false);
          // reset recaptcha
          window.recaptchaVerifier.render().then((widgetId) => {
            window.grecaptcha.reset(widgetId);
          });
        });
    } else return;
  };

  const handleVerifyOtp = async () => {
    if (!isOtpValid) return;
    // verify otp
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in via firebase successfully.

        const user = result.user;
        axiosBackendInstance
          .post<{
            data: TUser;
            message: string;
          }>("/user/login", {
            phoneNumber: user.phoneNumber,
            firebaseUID: user.uid,
          })
          .then((res) => {
            authCtx.login(res.data.data);
            // TODO: check if user is new and collect info if yes
            setLoading(false);
            toast({
              title: "Logged in successfully!",
            });
            return res.data.data;
          })
          .then(async (data) => {
            await setServerLogin(data)
              .then((res) => {
                res.json().then((data) => {
                  router.replace(data.redirect);
                });
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            toast({
              title: "Error logging in. Try again later.",
              variant: "destructive",
            });
          });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Wrong OTP. Try again.",
          variant: "destructive",
        });
        setLoading(false);
        setIsOtpValid(false);
      });
  };

  useEffect(() => {
    setIsPhoneValid(validatePhoneNumber(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setIsOtpValid(validateOtp(otp));
  }, [otp]);

  useEffect(() => {
    if (authCtx.isLoggedIn) router.replace("/");
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div id="sign-in-button"></div>
      <h1 className="font-semibold text-4xl p-12 text-gray-300 flex flex-row items-center">
        <IoArrowBackOutline
          className="text-gray-300 mr-6 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        Login
      </h1>
      <div className="w-full h-[60%] flex items-center justify-center p-4 flex-col">
        <div className="flex flex-col gap-5 items-start w-[40vw] md:min-w-[500px] min-w-[350px] mb-4 rounded-lg text-gray-300 border-[0.5px] border-gray-900 bg-slate-700 backdrop-blur-xl bg-opacity-20 p-8">
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="number">Mobile Number:</label>
            <Input
              id="number"
              maxLength={10}
              placeholder="XXXXX XXXXX"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={otpSent}
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="otp">OTP:</label>
            <InputOTP
              maxLength={6}
              id="otp"
              value={otp}
              onChange={(x) => {
                setOtp(x);
              }}
              disabled={!otpSent}
              ref={otpInputRef}
              autoComplete="off"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="w-full md:h-16 h-12 text-gray-300 font-semibold">
                <InputOTPSlot index={0} className="w-full h-full text-lg" />
                <InputOTPSlot index={1} className="w-full h-full text-lg" />
                <InputOTPSlot index={2} className="w-full h-full text-lg" />
                <InputOTPSlot index={3} className="w-full h-full text-lg" />
                <InputOTPSlot index={4} className="w-full h-full text-lg" />
                <InputOTPSlot index={5} className="w-full h-full text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {!otpSent && (
            <Button
              className={"w-full mt-4"}
              disabled={!isPhoneValid}
              onClick={handleSendOtp}
            >
              {loading && (
                <div className="animate-spin mr-3">
                  <Loader />
                </div>
              )}
              Send OTP
            </Button>
          )}
          {otpSent && (
            <Button
              className={"w-full mt-4"}
              disabled={!isOtpValid}
              onClick={handleVerifyOtp}
            >
              {loading && (
                <div className="animate-spin mr-3">
                  <Loader />
                </div>
              )}
              {isOtpValid ? "Log in" : "Enter OTP"}
            </Button>
          )}
        </div>
        <div className="mt-2 text-center w-full">
          <span className="text-xs text-gray-400 font-normal ">
            Enter mobile number without country code. We only serve in India
            currently.
          </span>
        </div>
      </div>
    </div>
  );
}
