"use client";

import TitleSection from "@/components/atoms/TitleSection";
import React, { FC, useMemo } from "react";
import CategoryItem from "./CategoryItem";
import { fetcher, parseCategories } from "@/lib/utils";
import useSwr from "swr";
import { categoryJobType } from "@/types";

interface CategoryProps {}

const Category: FC<CategoryProps> = ({}) => {
  const { data, error, isLoading } = useSwr("/api/job/categories", fetcher);

  const categories = useMemo(
    () => parseCategories(data, error, isLoading),
    [data, error, isLoading]
  );

  return (
    <div className="mt-32 mb-8">
      <TitleSection title="Explore by" subtitle="category" />
      <div className="grid grid-cols-5 gap-9 mt-12">
        {categories.map((item: categoryJobType) => (
          <CategoryItem
            key={item.id}
            name={item.name}
            totalJobs={item.totalJobs}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
