import React from "react";

export interface BackgroundDecorProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function BackgroundDecor({ className, ...props }: BackgroundDecorProps) {
  return (
    <svg
      width={336}
      height={336}
      viewBox="0 0 336 336"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      {...props}
    >
      <mask
        id="mask_bg_decor"
        style={{ maskType: "alpha" } as React.CSSProperties}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={336}
        height={336}
      >
        <rect width={336} height={336} fill="url(#radial_bg_decor)" />
      </mask>
      <g mask="url(#mask_bg_decor)">
        <circle cx={168} cy={168} r={48} stroke="var(--ui-background-decor)" />
        <circle cx={168} cy={168} r={72} stroke="var(--ui-background-decor)" />
        <circle cx={168} cy={168} r={96} stroke="var(--ui-background-decor)" />
        <circle cx={168} cy={168} r={120} stroke="var(--ui-background-decor)" />
        <circle cx={168} cy={168} r={144} stroke="var(--ui-background-decor)" />
        <circle cx={168} cy={168} r={168} stroke="var(--ui-background-decor)" />
      </g>
      <defs>
        <radialGradient
          id="radial_bg_decor"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(168 168) rotate(90) scale(168 168)"
        >
          <stop />
          <stop offset={1} stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default BackgroundDecor;
