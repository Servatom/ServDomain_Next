import { useContext, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import Button from "../common/Button";
import Loader from "../common/Loader";
import AuthContext from "@/store/auth-context";

const UpdateEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetch("/api/account/update-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json().then((data) => data.data);
          authCtx.updateEmail(data.email);
          toast({
            title: "Email updated successfully!",
          });
          router.push("/");
        } else {
          toast({
            title: "Something went wrong :/",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // if (result?.status === 200) {
    //   toast({
    //     title: "Email updated successfully!",
    //   });
    // }

    setLoading(false);
  };
  return (
    <div className="w-full h-[60%] flex items-center justify-center p-4 flex-col">
      <form
        className="flex flex-col gap-5 items-start w-[40vw] mb-4 rounded-lg text-gray-300 border-[0.5px] border-gray-900 bg-slate-700 backdrop-blur-xl bg-opacity-20 p-8"
        onSubmit={(e) => {
          handleUpdateEmail(e);
        }}
      >
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="email">Email:</label>
          <Input
            id="email"
            type="email"
            placeholder="john@gmail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <Button className={"w-full mt-4"} type="submit">
          {loading && (
            <div className="animate-spin mr-3">
              <Loader />
            </div>
          )}
          Update Email
        </Button>
      </form>
      <div className="mt-2 text-center w-full">
        <span className="text-xs text-gray-400 font-normal ">
          Your email is important for all subscription related updates.
        </span>
      </div>
    </div>
  );
};

export default UpdateEmail;
