"use client";

import TitleSection from "@/components/atoms/TitleSection";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import JobItem from "./JobItem";
import useSWR from "swr";
import { fetcher, parseJobs } from "@/lib/utils";
import { JobType } from "@/types";
import useFeaturedJob from "@/hooks/useFeaturedJob";

interface FeaturedJobsProps {}

const FeaturedJobs: FC<FeaturedJobsProps> = ({}) => {

  const { jobs, isLoading, error} = useFeaturedJob()
  
  return (
    <div className="mt-32 mb-10">
      <TitleSection title="Featured" subtitle="jobs" />
      <div className="grid grid-cols-4 gap-4 mt-12">
        {jobs.map((item: JobType) => (
          <JobItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
