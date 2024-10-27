import React from "react";
import { cn } from "@/lib/utils";

interface WaterLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const WaterLoader: React.FC<WaterLoaderProps> = ({
  size = "md",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative inline-block",
        {
          "w-8 h-8": size === "sm",
          "w-12 h-12": size === "md",
          "w-16 h-16": size === "lg",
        },
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 border-4 border-blue-500 rounded-full",
          "animate-[wave_2s_linear_infinite]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 border-4 border-transparent border-t-blue-300 rounded-full",
          "animate-[spin_1s_linear_infinite]"
        )}
      />
    </div>
  );
};

export default WaterLoader;
