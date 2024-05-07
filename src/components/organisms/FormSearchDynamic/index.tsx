import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATION_OPTIONS } from "@/constants";
import { optionType } from "@/types";
import React, { FC } from "react";
import { FiSearch } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";

interface FormSearchDynamicProps {}

const FormSearchDynamic: FC<FormSearchDynamicProps> = ({}) => {
  return (
    <div className="mx-auto w-max">
      <div className=" p-4 bg-background  shadow-sm inline-flex items-center gap-4 relative w-max z-10 text-center">
        <div className="inline-flex gap-3 items-center">
          <FiSearch />
          <Input
            className="py-5 w-[300px] border-none"
            placeholder="Job Title or keyword"
          />
        </div>
        <div className="inline-flex gap-3 items-center">
          <SlLocationPin />
          <Select>
            <SelectTrigger className="w-[300px] border-none text-gray-500 outline-none py-5">
              <SelectValue placeholder="Select a Location " />
            </SelectTrigger>
            <SelectContent>
              {LOCATION_OPTIONS.map((item: optionType, i: number) => (
                <SelectItem key={i} value="light">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button>Search</Button>
        </div>
      </div>
      <div>
        <div className="text-muted-foreground mt-3 ">
          Populer: UI Designer, UX Researcher, Android, Admin
        </div>
      </div>
    </div>
  );
};

export default FormSearchDynamic;
