import type { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        id="«r9»"
        width="512"
        height="512"
        x="0"
        y="0"
        fill="url(#«ra»)"
        stroke="#FFF"
        strokeOpacity="100%"
        strokeWidth="0"
        paintOrder="stroke"
        rx="128"
      ></rect>
      <defs>
        <radialGradient
          id="«ra»"
          cx="50%"
          cy="50%"
          r="100%"
          fx="50%"
          fy="0%"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#18181b"></stop>
          <stop offset="1"></stop>
        </radialGradient>
      </defs>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="352"
        height="352"
        x="80"
        y="80"
        alignmentBaseline="middle"
        color="#FAFAFA"
        viewBox="0 0 24 24"
      >
        <g stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
          <path strokeLinejoin="round" d="m8.5 12.5 2 2 5-5"></path>
          <path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"></path>
        </g>
      </svg>
    </svg>
  );
};

export default Logo;
