import { useEffect, useState } from "react";
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
import * as Yup from "yup";
import { signup } from "@/db/apiAuthentication";
import { useNavigate, useSearchParams } from "react-router-dom";
// Import the correct hook
import { ClipLoader } from "react-spinners";
import useFetch from "@/useHooks/fetch";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    profile_images: null,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleFormInput = (e) => {
    const { name, value, files } = e.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const {
    data,
    error,
    loading,
    fn: signupFunction,
  } = useFetch(signup, dataForm);

  // const { fetchingUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/homePage?${longLink ? `createNew=${longLink}` : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phone: Yup.string()
          .matches(/^[0-9]{10,15}$/, "Invalid phone format")
          .required("Phone number is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_images: Yup.mixed(),
      });

      await schema.validate(dataForm, { abortEarly: false });
      await signupFunction(); // Ensure this is handling the API call correctly
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create A New Account</CardTitle>
          <CardDescription>
            Welcome to{" "}
            <b className="text-gray-900 dark:text-red-600"> Shutett</b> Please
            create an account to keep track of your links
          </CardDescription>
          {error && <ErrorMessage message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          {["name", "email", "password", "phone"].map((field) => (
            <div key={field} className="space-y-1">
              <Input
                name={field}
                type={field === "password" ? "password" : "text"}
                placeholder={`Enter your ${
                  field.charAt(0).toUpperCase() + field.slice(1)
                }`}
                onChange={handleFormInput}
              />
              {errors[field] && <ErrorMessage message={errors[field]} />}
            </div>
          ))}
          <div className="space-y-1">
            <Input
              name="profile_images"
              type="file"
              accept="image/*"
              onChange={handleFormInput}
            />
            {errors.profile_images && (
              <ErrorMessage message={errors.profile_images} />
            )}
          </div>
        </CardContent>
        <CardFooter className="md:w-full">
          <Button onClick={handleSignup} className="w-full">
            {loading ? <ClipLoader size={12} color="red" /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
