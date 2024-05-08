import { fetcher, parseJobs } from "@/lib/utils";
import { JobType } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const useJob = (filter?: string[]) => {
  const paramsCategory = useMemo(() => {
    if (filter && filter.length > 0) {
      return filter.join(",");
    }
    return "";
  }, [filter]);

  const { data, isLoading, error, mutate } = useSWR(
    `/api/job/filter?category=${paramsCategory}`,
    fetcher,
    { revalidateOnMount: false }
  );

  const [jobs, setJobs] = useState<JobType[]>();

  const parsingJob = useCallback(async () => {
    const parsedJob = await parseJobs(data, isLoading, error);
    setJobs(parsedJob);
  }, [data, isLoading, error]);

  useEffect(() => {
    parsingJob();
  }, [data, isLoading, error]);

  return {
    jobs,
    isLoading,
    mutate,
  };
};

export default useJob;
