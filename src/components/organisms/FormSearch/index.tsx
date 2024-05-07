import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import { FiSearch } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FormSearchProps {}

const FormSearch: FC<FormSearchProps> = ({}) => {
  return (
    <>
      <div className="mt-6 p-4 bg-background  shadow-sm inline-flex items-center gap-4 relative w-max z-10">
        <div className="inline-flex gap-3 items-center">
          <FiSearch />
          <Input
            className="py-8 w-[300px] border-none"
            placeholder="Job Title or keyword"
          />
        </div>
        <div className="inline-flex gap-3 items-center">
          <SlLocationPin />
          <Select>
            <SelectTrigger className="w-[300px] border-none text-gray-500 outline-none py-8">
              <SelectValue placeholder="Select a Location " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button className="py-8 px-10 text-lg">Search my job</Button>
        </div>
      </div>
      <div>
        <div className="text-muted-foreground sad">
          Populer: UI Designer, UX Researcher, Android, Admin
        </div>
      </div>
    </>
  );
};

export default FormSearch;
