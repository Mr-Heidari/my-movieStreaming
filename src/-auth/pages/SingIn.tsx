import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SinginValidation } from "@/lib/validation";
// import Loader from "@/components/ui/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { useSignInAccount } from "@/lib/reat-query/queriesAndMutation";
// import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import { useSignInAccount } from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/useUserContext";

const SingIn = () => {
  const [showPassword, setShowpassword] = useState(false);

  // this work like pop up message
  const { toast } = useToast();

  // check if user is on our database
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const navigate = useNavigate();

  const { mutateAsync: signInAccount ,isPending :singinLoaded} = useSignInAccount();

  // 1. Define your form
  const form = useForm<z.infer<typeof SinginValidation>>({
    resolver: zodResolver(SinginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SinginValidation>) {
    //save browser and ip address and device on DB with user email and passwrod
    const session =  await signInAccount({
      email: values.email,
      password: values.password,
    });

    //   if saved failed
    if (!session) {
      console.log(session);
      return toast({ title: "title: Sign in failed. Please try again." });
    }

    const isLoggedIn = await checkAuthUser();

    //check if user account was saved in DB next go to home page
    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({ title: "title: Sign up failed. Please try again." });
    }
  }

  return (
    <div
      className="w-full 
 text-white  z-10  h-screen flex"
    >
      <Form {...form} >
        <div className=" relative px-10 justify-center items-center bg-black/80 max-sm:w-[300px] sm:max-w-[420px] m-auto flex flex-col p-5 rounded-md  ">
          <header className=" flex  w-full">
            <Link to={'/'} className=" mx-auto">
            <img
              src="/assets/images/logo.png"
              width={80}
              height={80}
              alt=""
              className=" object-cover  "
            />
            </Link>
          </header>

          <h2 className="font-bold max-sm:text-xl sm:text-xl pt-5 ">
            Log in to your account
          </h2>
          <p className=" text-neutral-400 text-xs md:text-base   mt-2">
            Welcome back, please enter your details
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-zinc-700/40 focus:border-none ring-transparent  border-none "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-gray-300 " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="bg-zinc-700/40 focus:border-none  border-none ring-transparent"
                      {...field}
                    />
                  </FormControl>
                  <img
                    src={
                      showPassword
                        ? "/assets/icons/show-icone.svg"
                        : "/assets/icons/hide-icone.svg"
                    }
                    alt=""
                    className="absolute right-2 top-8 cursor-pointer"
                    onClick={() => setShowpassword((prev) => !prev)}
                  />
                  <FormMessage className="text-gray-300 " />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" w-full bg-red-800 mt-5 hover:bg-red-600"
              disabled={isUserLoading||singinLoaded}
            >
              {singinLoaded ? (
                <>
                  <Loader width={18} height={18} /> Loading...
                </>
              ) : (
                "Log in"
              )}
            </Button>
            <p className=" font-thin text-[14px] opacity-90 text-center mt-2">
              Don't have an account?
              <Link
                to="/sing-up"
                className="text-small-semibold text-gray-200 bg-neutral-700 p-2 rounded-md  ml-1"
              >
                Sign up
              </Link>{" "}
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SingIn;
