import { cn } from "@/src/lib/utils";
import { Loader as MainLoader } from "lucide-react";
import { ComponentProps } from "react";

export const Loader = ({ ...props }: ComponentProps<"button">) => (
  <MainLoader
    className={cn("animate-spin", props)}
    style={{ animationDuration: "2s" }}
  />
);
