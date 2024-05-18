"use client";

import AuthContext from "@/store/auth-context";
import { Button } from "../ui/button";
import { useContext, useEffect, useRef } from "react";
import Callout from "../common/Callout";
import { useUpdateWaitlistStatus } from "@/api/mutation/user/mutation";
import { useRouter } from "next/navigation";
import JSConfetti from "js-confetti";

const Waitlist: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const jsConfetti = new JSConfetti();

  const addConfetti = () => {
    jsConfetti.addConfetti({
      emojis: ["🚀", "⚡️", "🦄"],
      confettiNumber: 20,
      emojiSize: 120,
    });
  };

  const { mutate: joinWaitlistMutate } = useUpdateWaitlistStatus(
    true,
    authCtx,
    addConfetti
  );

  const handleJoinWaitlist = () => {
    if (!authCtx.user) {
      router.push("/login");
      return;
    }

    if (!authCtx.user.email) {
      router.push("/account/complete-profile");
      return;
    }

    joinWaitlistMutate();
  };

  return (
    <div
      className={`flex ${
        authCtx.user?.onWaitlist ? "flex-col" : "flex-row"
      }  gap-4 items-center mt-12 mb-16`}
    >
      <Callout className="">
        <span className="font-semibold text-purple-400">✨ COMING SOON: </span>
        Subdomain{" "}
        <span className="underline underline-offset-4 decoration-purple-400">
          marketplace!
        </span>{" "}
        List your domain for subdomain rentals.
      </Callout>
      {authCtx.user?.onWaitlist ? (
        <span className="font-semibold ">
          You are <em>on</em> the waitlist ⚡️
        </span>
      ) : (
        <Button
          variant={"default"}
          className="relative"
          onClick={handleJoinWaitlist}
        >
          Join the waitlist 🥏
        </Button>
      )}
    </div>
  );
};

export default Waitlist;
