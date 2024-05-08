"use client";

import ExploreDataContainer from "@/containers/ExploreDataContainer";
import { formFilterSchema } from "@/lib/form-schema";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useCategoryJobFilter from "@/hooks/useCategoryJobFilter";
import useJob from "@/hooks/useJobs";

interface FindJobsPageProps {}

const FindJobsPage: FC<FindJobsPageProps> = ({}) => {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });

  const [categories, setCategories] = useState<string[]>([]);
  const { filters } = useCategoryJobFilter();
  const { jobs, isLoading, mutate } = useJob(categories);

  useEffect(() => {
    mutate();
  }, [categories]);

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    setCategories(val.categories);
  };

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFiter={onSubmitFormFilter}
      filterForm={filters}
      title="job"
      subtitle="Find your next career at companies like HubSpot, Nike and Dropbox"
      loading={isLoading}
      type="job"
      data={jobs}
    />
  );
};

export default FindJobsPage;
