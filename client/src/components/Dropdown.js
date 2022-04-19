import { forwardRef } from "react";

export const Dropdown = forwardRef(({ isActive, children, className }, ref) => {
  return (
    isActive && (
      <div className={`absolute ${className}`}>
        <div ref={ref} className="dropdownMenu">
          <ul>
            {children.map((child, index) => (
              <li className="dropdownItem" key={`dropdownItem-${index}`}>
                {child}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
});
