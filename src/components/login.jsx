import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ErrorMessage from "./errorMessage";
import { login } from "@/db/apiAuthentication";
import { ClipLoader } from "react-spinners";

import { UrlState } from "@/context";
import useFetch from "@/useHooks/fetch";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const { data, error, loading, fn: loginFunction } = useFetch(login, dataForm);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(
        `/homePage${
          longLink ? `?createNew=${encodeURIComponent(longLink)}` : ""
        }`
      );
      fetchUser();
    }
  }, [error, data, navigate, longLink, fetchUser]);

  const handleLogin = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
      });

      await schema.validate(dataForm, { abortEarly: false });
      // Call the API
      await loginFunction();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card className="shadow-xl h-1/2 text-2x">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
          {error && <ErrorMessage message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={dataForm.email}
              onChange={(e) =>
                setDataForm({ ...dataForm, email: e.target.value })
              }
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter your Password"
              value={dataForm.password}
              onChange={(e) =>
                setDataForm({ ...dataForm, password: e.target.value })
              }
            />
            {errors.password && <ErrorMessage message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter className="md:w-full">
          <Button onClick={handleLogin}>
            {loading ? <ClipLoader size={12} color="red" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
