import React from "react";

interface AvatarProps {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  color = "#19AAF8",
  size = "md",
  className = ""
}) => {
  const getInitials = (str: string) => {
    if (!str) return "P";
    const parts = str.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const sizeStyles = {
    sm: "w-7 h-7 text-xs font-semibold",
    md: "w-9 h-9 text-xs font-semibold",
    lg: "w-11 h-11 text-sm font-semibold",
    xl: "w-14 h-14 text-base font-bold"
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white shrink-0 shadow-xs select-none ${sizeStyles[size]} ${className}`}
      style={{ backgroundColor: color }}
      title={name}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
};
