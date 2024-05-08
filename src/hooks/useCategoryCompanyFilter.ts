import { fetcher, parseCategoryToOptions } from "@/lib/utils";
import { filterFormType } from "@/types";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

const useCategoryCompanyFilter = () => {
  const { data, isLoading, error } = useSWR("/api/company/categories", fetcher);

  const categories = useMemo(
    () => parseCategoryToOptions(data, isLoading, error, true),
    [data, isLoading, error]
  );

  const filters = useMemo(() => {
    return [
      {
        name: "industry",
        label: "Industry",
        items: categories,
      },
    ] as filterFormType[];
  }, [categories]);

  console.log(categories);
  console.log(filters);

  return { filters };
};

export default useCategoryCompanyFilter;
