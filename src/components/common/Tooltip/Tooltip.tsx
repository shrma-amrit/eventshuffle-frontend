import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowSize = 6;

  const calculatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setPosition({
        top: triggerRect.bottom + arrowSize,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      });
    }
  };

  useEffect(() => {
    if (visible) {
      calculatePosition();
    }
  }, [visible]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      {children}
      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(
              "absolute z-10 p-2 bg-black text-white text-sm rounded shadow-lg",
              className
            )}
            style={{ top: position.top, left: position.left }}
          >
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0"
              style={{
                borderLeft: `${arrowSize}px solid transparent`,
                borderRight: `${arrowSize}px solid transparent`,
                borderBottom: `${arrowSize}px solid black`,
              }}
            />
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
