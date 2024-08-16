/* eslint-disable no-unused-vars */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Edit2Icon,
  ImageIcon,
  LaptopIcon,
  LinkIcon,
  LockIcon,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShortUrl = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/authenticate?createNew=${longUrl}`);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-gray-900 text-center text-3xl my-10 sm:my-16 sm:text-6xl lg:text-7xl font-extrabold dark:text-white">
          It's too long ? <br className="mb-2" /> Cut ett ✂
        </h2>
        <form
          onSubmit={handleShortUrl}
          className="flex flex-col w-full gap-4 sm:h-15 sm:flex-row md:w-2/4 text-center"
        >
          <Input
            type="url"
            value={longUrl}
            placeholder="Enter your long URL"
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 p-4 h-full border-4"
          />
          <Button className="min-h-14 text-1xl font-bold" type="submit">
            Shorten it!
          </Button>
        </form>
      </div>
      <div className="container mt-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-white dark:bg-opacity-0 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl ">
          <CardHeader>
            <CardTitle>
              <UserIcon />{" "}
            </CardTitle>
            <CardTitle className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              User friendly{" "}
            </CardTitle>
            <CardDescription className="font-normal text-gray-700 dark:text-gray-400 text-lg">
              Shutett is easy and fast, enter the long link to get your
              shortened link
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-white dark:bg-opacity-0 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl ">
          <CardHeader>
            <CardTitle>
              <ImageIcon />{" "}
            </CardTitle>
            <CardTitle className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Barcode{" "}
            </CardTitle>
            <CardDescription className="font-normal text-gray-700 dark:text-gray-400 text-lg">
              Shutett makes barcode creation effortless—just enter link data to
              generate a barcode instantly.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-opacity-0 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
          <CardHeader>
            <CardTitle>
              <LinkIcon />{" "}
            </CardTitle>
            <CardTitle className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Shortened{" "}
            </CardTitle>
            <CardDescription className="font-normal text-gray-700 dark:text-gray-400 text-lg">
              Shutett is easy and fast—enter your long link to get a shortened
              link quickly.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-opacity-0 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
          <CardHeader>
            <CardTitle>
              <Edit2Icon />{" "}
            </CardTitle>
            <CardTitle className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Customized{" "}
            </CardTitle>
            <CardDescription className="font-normal text-gray-700 dark:text-gray-400 text-lg">
              Shutett allows you to create a personalized short link for a
              custom URL.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-opacity-0 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
          <CardHeader>
            <CardTitle>
              <LaptopIcon />{" "}
            </CardTitle>
            <CardTitle className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Responsive{" "}
            </CardTitle>
            <CardDescription className="font-normal text-gray-700 dark:text-gray-400 text-lg">
              Compatible with smartphones, tablets, and desktops for seamless
              use on any device.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-white dark:bg-opacity-0 rounded-lg px-4 py-6 ring-1 ring-slate-900/5 shadow-xl">
          <CardHeader>
            <CardTitle>
              <LockIcon />{" "}
            </CardTitle>
            <CardTitle className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Secure{" "}
            </CardTitle>
            <CardDescription className="font-normal text-gray-700 dark:text-gray-400 text-lg">
              It is fast and secure—our service uses HTTPS protocol and data
              encryption to protect your information.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default IndexPage;
