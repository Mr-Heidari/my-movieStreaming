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
import {  SingupValidation } from "@/lib/validation";
// import Loader from "@/components/ui/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { useSignInAccount } from "@/lib/reat-query/queriesAndMutation";
// import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queries";
import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/useUserContext";

const SingUp = () => {
  const [showPassword, setShowpassword] = useState(false);

  //this work like pop up message
  const { toast } = useToast();

  //check if user is on our database
  const { checkAuthUser, isLoading: isLoggedIn } = useUserContext();

  const navigate = useNavigate();

  // //create account and save it on database
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccountMutation();

  // //and after account created next user must be sign in
  const { mutateAsync: signInAccount, isPending: singinLoaded } =
    useSignInAccount();

  //1. Define form with zod Validation library
  const form = useForm<z.infer<typeof SingupValidation>>({
    resolver: zodResolver(SingupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SingupValidation>) {
    //first create account on DB
    const newUser = await createUserAccount(values);

    //if creation failed
    if (!newUser) {
      return toast({
        title: "title: Sign up failed. Please try again.",
      });
    }

    //save browser and ip address and device on DB with user email and passwrod
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    //if saved failed
    if (!session) {
      console.log(session);
      return toast({ title: "title: Sign in failed. Please try again." });
    }

    //we need this cuz wanna all of our entire app know user is logged in or not on DB
    const isLoggedIn = await checkAuthUser();

    //if user was on DB as logged in user next go to home page
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
      <Form {...form}>
        <div className=" relative px-10 justify-center items-center bg-black/80 max-sm:w-[300px] sm:max-w-[420px] m-auto flex flex-col p-5 rounded-md  ">
          <header className=" flex  w-full">
            <img
              src="/assets/images/logo.png"
              width={80}
              height={80}
              alt=""
              className=" object-cover  mx-auto "
            />
          </header>

          <h2 className="font-bold max-sm:text-xl sm:text-xl pt-5 ">
            Log in to your account
          </h2>
          <p className=" text-neutral-400 text-xs md:text-base   mt-2">
            Welcome back, please enter your details
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
              name="username"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
              disabled={isLoggedIn || isCreatingAccount || singinLoaded}
            >
             {isCreatingAccount || singinLoaded ? (
                <>
                  <Loader width={18} height={18} /> Loading...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            <p className=" font-thin text-[14px] opacity-90 text-center mt-2">
              Don't have an account?
              <Link
                to="/sing-in"
                className="text-small-semibold text-gray-200 bg-neutral-700 p-2 rounded-md  ml-1"
              >
                Sign in
              </Link>{" "}
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SingUp;
