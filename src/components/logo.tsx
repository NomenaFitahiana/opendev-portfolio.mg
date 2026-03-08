import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

export const Logo = ({
  withLabel,
  ...props
}: ComponentPropsWithoutRef<"img"> & { withLabel: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={"/logo_opendev.webp"}
        alt="logo"
        className={cn("w-14 h-14 rounded-lg", props.className)}
        {...props}
      />
      {withLabel && <span className="text-xl font-semibold">OpenDev</span>}
    </div>
  );
};
