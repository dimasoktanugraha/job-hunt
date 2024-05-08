import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { JobType } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

interface JobItemProps extends JobType {}

const JobItem: FC<JobItemProps> = ({
  image,
  jobType,
  name,
  type,
  location,
  category,
  skills,
}) => {
  return (
    <div className="border border-border p-8 cursor-pointer flex flex-row items-start gap-6 ">
      <div>
        <Image src={image} alt={image} width={64} height={64} />
      </div>
      <div>
        <div className="font-semibold text-lg">{name}</div>
        <div className="text-muted-foreground text-sm mb-2">
          {type} . {location}
        </div>
        <div className="h-5 inline-flex gap-2 items-start">
          <Badge variant="secondary">{jobType}</Badge>
          <Separator orientation="vertical" />
          <div className="space-x-2">
            {skills.map((item: string, i: number) => (
              <Badge
                key={i}
                variant="outline"
                className="rounded border-primary bg-primary/5 text-primary"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
