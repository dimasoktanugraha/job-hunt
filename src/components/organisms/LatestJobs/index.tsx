"use client";

import TitleSection from "@/components/atoms/TitleSection";
import React, { FC } from "react";
import JobItem from "./JobItem";
import useFeaturedJob from "@/hooks/useFeaturedJob";
import { JobType } from "@/types";

interface LatestJobsProps {}

const LatestJobs: FC<LatestJobsProps> = ({}) => {
  const { jobs, isLoading, error } = useFeaturedJob();

  return (
    <div className="py-16 mt-32 mb-10 relative">
      <TitleSection title="Latest" subtitle="jobs open" />
      <div className="mt-12 grid grid-cols-3 gap-8">
        {jobs.map((item: JobType) => (
          <JobItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
