import CreateLink from "@/components/create-link";
import ErrorMessage from "@/components/errorMessage";
import Linkcard from "@/components/linkcard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksFromURL } from "@/db/clicksAPI";
import { getUrl } from "@/db/urlAPI";
import useFetch from "@/useHooks/fetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: urlFunction,
  } = useFetch(getUrl, user?.id);
  const {
    loading: clicksLoading,
    data: clicks,
    fn: clicksFunction,
  } = useFetch(
    getClicksFromURL,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    urlFunction();
  }, []);

  useEffect(() => {
    if (urls?.length) clicksFunction();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || clicksLoading) && <BarLoader width={"100%"} color="red" />}
      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl">
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="font-extrabold text-3xl">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-3 p-1" />
      </div>
      {error && <ErrorMessage message={error?.message} />}

      {(filteredUrls || []).map((url, i) => {
        return <Linkcard key={i} url={url} fetchURL={urlFunction} />;
      })}
    </div>
  );
};

export default HomePage;
