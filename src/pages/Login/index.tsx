import Form from "@components/Ui/Form";
import Input from "@components/Ui/Input";
import Label from "@components/Ui/Label";
import InputErrorMessage from "@components/Ui/InputErrorMessage";
import "./index.css";

import { CredentialsLogin, IErrorResponse } from "../../interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation";
import toast from "react-hot-toast";

import { useCallback, useEffect } from "react";
import AxiosInstance from "@config/axios.config";
import { AxiosError } from "axios";
import { IMAGES } from "@config/assets";
import Button from "@components/Ui/Button";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  console.log(watch()); // This will log the form va
  const onSubmit = useCallback(async (data: CredentialsLogin) => {
    console.log(data);
    try {
      //  * 2 - Fulfilled => SUCCESS => (OPTIONAL)
      const { status, data: resData } = await AxiosInstance.post(
        "/auth/login",
        data
      );
      console.log(data);
      console.log(resData);
      if (status === 200) {
        toast.success("You will navigate to the home page after 2 seconds.", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setTimeout(() => {
          location.replace("/admin-panel");
        }, 2000);
      }
    } catch (error) {
      //  * 3 - Rejected => FAILED => (OPTIONAL)
      console.log(error);
      const errorObj = error as AxiosError<IErrorResponse>;
      console.log(errorObj.response);
      console.log(errorObj.response?.data?.error?.message);
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center p-[5rem]">
        <div className="flex-1">
          <img
            src={IMAGES.GirlSignIn}
            alt="Girl Sign In"
            className="w-full h-auto"
          />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold">Login to admin panel</p>
          <p className="text-[#757575] pb-2">Enter username and password</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email-login">username</Label>
            <Input
              type="text"
              {...register("username")}
              name="username"
              id="email-login"
              placeholder="name@example.com"
              autoComplete="username"
              required
            />
            {errors["username"] && (
              <InputErrorMessage msg={errors["username"]?.message} />
            )}

            <Label htmlFor="Password-login">Password</Label>
            <Input
              title="password"
              {...register("password")}
              name="password"
              type="password"
              id="Password-login"
              autoComplete="current-password"
              required
            />
            {errors["password"] && (
              <InputErrorMessage msg={errors["password"]?.message} />
            )}
            <Button type="submit" className="w-full">
              Send
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
