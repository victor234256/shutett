import { clicksStoring } from "@/db/clicksAPI";
import { getLongUrl } from "@/db/urlAPI";
import useFetch from "@/useHooks/fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: statsLoader, fn: statsFuction } = useFetch(clicksStoring, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      statsFuction();
    }
  }, [loading]);

  if (loading || statsLoader) {
    return (
      <>
        <BarLoader width={"100%"} color="red" />
        <br />
        Redirecting..........
      </>
    );
  }
  return null;
};

export default Redirect;
