import React from "react";
import clsx from "clsx";
import { Tooltip } from "../Tooltip";

interface AvatarProps {
  name: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, className }) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <Tooltip content={name}>
        <div
          className={clsx(
            "flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold text-sm shadow-md",
            className
          )}
        >
          {initial}
        </div>
      </Tooltip>
    </div>
  );
};

export default Avatar;
