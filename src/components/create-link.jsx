import { UrlState } from "@/context";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/useHooks/fetch";
import { createUrl } from "@/db/urlAPI";
import { BeatLoader } from "react-spinners";
import ErrorMessage from "./errorMessage";
import { Button } from "./ui/button";

export default function CreateLink() {
  const { user } = UrlState();
  const ref = useRef();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("Please Enter Title"),
    longUrl: Yup.string()
      .url("Enter a valid URL")
      .required("Enter your long URL"),
    customUrl: Yup.string(),
  });

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: createURLFunction,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate("/https://shutett.vercel.app/homePage");
      window.location.reload();
    }
  }, [error, data, navigate]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current?.canvasRef?.current;
      if (canvas) {
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        await createURLFunction(blob);
      }
    } catch (e) {
      const newErrors = {};

      if (e.inner) {
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Create New Link
          </DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && (
          <QRCode value={formValues?.longUrl} size={250} ref={ref} />
        )}
        <Input
          id="title"
          placeholder="Enter your Short Link Title"
          value={formValues.title}
          onChange={handleFormChange}
        />
        {errors.title && <ErrorMessage message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter your Long URL"
          value={formValues.longUrl}
          onChange={handleFormChange}
        />
        {errors.longUrl && <ErrorMessage message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-2">shutett</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (Optional)"
            value={formValues.customUrl}
            onChange={handleFormChange}
          />
        </div>
        {error && <ErrorMessage message={error.message} />}
        <DialogFooter>
          <Button
            type="button"
            disabled={loading}
            variant="destructive"
            onClick={createNewLink}
          >
            {loading ? <BeatLoader size={10} color="red" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
