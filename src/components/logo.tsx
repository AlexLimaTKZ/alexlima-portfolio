
import React from "react";

const SVGComponent = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />

        <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="26" fontWeight="bold">TKZ</text>
    </svg>
);

export default SVGComponent;
