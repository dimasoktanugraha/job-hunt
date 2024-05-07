"use client";

import ExploreDataContainer from "@/containers/ExploreDataContainer";
import { formFilterCompanySchema } from "@/lib/form-schema";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CATEGORIES_OPTION } from "@/constants";
import useCategoryCompanyFilter from "@/hooks/useCategoryCompanyFilter";
import useCompanies from "@/hooks/useCompanies";

interface FindCompaniesPageProps {}

const FindCompaniesPage: FC<FindCompaniesPageProps> = ({}) => {
  const formFilter = useForm<z.infer<typeof formFilterCompanySchema>>({
    resolver: zodResolver(formFilterCompanySchema),
    defaultValues: {
      industry: [],
    },
  });

  const [categories, setCategories] = useState<string[]>([]);
  const { filters } = useCategoryCompanyFilter();
  const { companies, isLoading, mutate } = useCompanies(categories);

  useEffect(() => {
    mutate();
  }, [categories]);

  const onSubmitFormFilter = async (
    val: z.infer<typeof formFilterCompanySchema>
  ) => {
    setCategories(val.industry);
  };

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFiter={onSubmitFormFilter}
      filterForm={filters}
      title="dream companies"
      subtitle="Find the dream companies you dream work for "
      loading={isLoading}
      type="company"
      data={companies}
    />
  );
};

export default FindCompaniesPage;
