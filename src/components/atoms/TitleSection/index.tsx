import React, { FC } from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

interface TitleSectionProps {
  title: string;
  subtitle: string;
}

const TitleSection: FC<TitleSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="text-4xl font-bold">
        {title} <span className="text-primary">{subtitle}</span>
      </div>
      <div className="inline-flex gap-3 items-center text-primary font-semibold cursor-pointer">
        <span>Show all jobs</span>
        <HiOutlineArrowCircleRight />
      </div>
    </div>
  );
};

export default TitleSection;
