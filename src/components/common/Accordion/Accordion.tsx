import React, { useState } from "react";
import clsx from "clsx";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  onOpen,
  onClose,
  defaultOpen = false,
  className,
  titleClassName,
  contentClassName,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleIsOpen = () => {
    setIsOpen((prev) => {
      if (!prev && onOpen) onOpen();
      if (prev && onClose) onClose();
      return !prev;
    });
  };

  return (
    <div className={clsx("w-full border rounded-lg", className)}>
      <div
        onClick={toggleIsOpen}
        className={clsx(
          "cursor-pointer flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg",
          titleClassName
        )}
      >
        <h3 className="font-medium text-lg">{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div
          className={clsx(
            "p-4 bg-white border-t rounded-b-lg",
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
