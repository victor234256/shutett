import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { clicksStoring } from "@/db/clicksAPI";
import { getLongUrl } from "@/db/urlAPI";
import useFetch from "@/useHooks/fetch";

const Redirect = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: statsLoader, fn: statsFunction } = useFetch(clicksStoring, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, [fn]);

  useEffect(() => {
    if (!loading && data) {
      statsFunction();
      // Redirect after the data is fetched and statistics are recorded
      window.location.href = data.original_url;
    }
  }, [loading, data, statsFunction]);

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
