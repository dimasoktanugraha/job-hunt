import { fetcher, parseJobs } from "@/lib/utils";
import { JobType } from "@/types";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

const useFeaturedJob = () => {
    const { data, error, isLoading } = useSWR("/api/job/featured", fetcher);

    const [jobs, setJobs] = useState<JobType[]>([])
  
    console.log(data)
  
    const parsingJobs = useCallback(async() => {
      const parsedJob = await parseJobs(data, error, isLoading)
      setJobs(parsedJob)
    }, [data, error, isLoading])
  
    useEffect(() => {
      parsingJobs()
    }, [data, error, isLoading])

    return {
        jobs,
        isLoading,
        error
    }
}

export default useFeaturedJob