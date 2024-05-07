import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { FC } from "react";

interface BannerSignupProps {}

const BannerSignup: FC<BannerSignupProps> = ({}) => {
  return (
    <div className="mt-32 mb-10 bg-primary text-primary-foreground px-16 pt-16 flex flex-row justify-between items-start">
      <div>
        <div className="text-5xl font-semibold">
          Start posting <br />
          Jobs today
        </div>
        <div className="my-6">Start posting job for only $10</div>
        <Button
          size="lg"
          variant="secondary"
          className="hover:text-primary text-primary"
        >
          Sign Up for Free
        </Button>
      </div>
      <div>
        <Image
          src="/images/dashboard.png"
          alt="/images/dashboard/png"
          width={500}
          height={300}
        />
      </div>
    </div>
  );
};

export default BannerSignup;
