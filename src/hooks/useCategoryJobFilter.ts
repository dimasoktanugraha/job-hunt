import { fetcher, parseCategoryToOptions } from "@/lib/utils";
import { filterFormType } from "@/types";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

const useCategoryJobFilter = () => {
  const { data, isLoading, error } = useSWR("/api/job/categories", fetcher);

  const categories = useMemo(
    () => parseCategoryToOptions(data, isLoading, error),
    [data, isLoading, error]
  );

  const filters = useMemo(() => {
    return [
      {
        name: "categories",
        label: "Categories",
        items: categories,
      },
    ]as filterFormType[];
  }, [categories]);

  console.log(categories);
  console.log(filters);

  return { filters };
};

export default useCategoryJobFilter;
