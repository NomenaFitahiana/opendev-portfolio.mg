import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type LogoProps = {
  labelClassName?: string,
  withLabel: boolean
} & ComponentPropsWithoutRef<"img">

export const Logo = ({
  withLabel,
  labelClassName,
  ...props
}: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={"/logo_opendev.webp"}
        alt="logo"
        className={cn("w-14 h-14 rounded-lg", props.className)}
        {...props}
      />
      {withLabel && <span className={cn("text-xl font-semibold", labelClassName)}>OpenDev</span>}
    </div>
  );
};
