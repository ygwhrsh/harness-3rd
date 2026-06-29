/* V3 Icons — Lucide-style SVG アイコン（TypeScript版） */

import React, { SVGAttributes } from "react";

type IconProps = SVGAttributes<SVGSVGElement>;

const createIcon = (paths: string[], strokeWidth: number = 2) => (props: IconProps) =>
  React.createElement(
    "svg",
    Object.assign(
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        width: 18,
        height: 18,
      },
      props
    ),
    paths.map((d, i) => React.createElement("path", { key: i, d }))
  );

export const V3_ICONS: Record<string, React.FC<IconProps>> = {
  eye: createIcon(["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"]),
  eyeOff: createIcon([
    "M9.9 4.2A9 9 0 0 1 12 4c6.5 0 10 7 10 7a13 13 0 0 1-2.2 2.9M6.1 6.1C3.5 7.7 2 12 2 12s3.5 7 10 7a9 9 0 0 0 3.9-.9M3 3l18 18M9.5 9.5a3 3 0 0 0 4.2 4.2",
  ]),
  sparkle: createIcon(["M12 3l1.7 4.4L18 9l-4.3 1.6L12 15l-1.7-4.4L6 9l4.3-1.6L12 3Z"]),
  sprout: createIcon([
    "M12 20v-9",
    "M12 11c0-3 2-5 6-5 0 3-2 5-6 5Z",
    "M12 14c0-2.5-1.6-4-5-4 0 2.5 1.6 4 5 4Z",
  ]),
  shield: createIcon(["M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3Z"]),
  shieldCheck: createIcon([
    "M12 3l8 3v6c0 4.5-3.2 7.6-8 9-4.8-1.4-8-4.5-8-9V6l8-3Z",
    "m9 12 2.2 2.2L15.5 10",
  ]),
  arrows: createIcon([
    "M7 8h13",
    "M16.5 4.5 20 8l-3.5 3.5",
    "M17 16H4",
    "M7.5 12.5 4 16l3.5 3.5",
  ]),
  send: createIcon(["M3 12h15", "M13.5 7.5 18 12l-4.5 4.5", "M21 5v14"]),
  plus: createIcon(["M12 5v14M5 12h14"]),
  lock: createIcon(["M8 11V8a4 4 0 0 1 8 0v3"], 2),
  link: createIcon([
    "M9 12h6",
    "M9 7H7a5 5 0 0 0 0 10h2",
    "M15 7h2a5 5 0 0 1 0 10h-2",
  ]),
  receipt: createIcon(["M5 4h14v17l-3-2-2 2-2-2-2 2-3-2V4Z", "M9 9h6M9 13h4"]),
  download: createIcon(["M12 4v10", "M8 11l4 3 4-3", "M5 20h14"]),
  target: createIcon(["M12 3v18M3 12h18"], 2),
  grid: createIcon([
    "M3 12 12 7l9 5-9 5-9-5Z",
    "M3 12v4l9 5 9-5v-4",
  ]),
  chevron: createIcon(["M9 6l6 6-6 6"], 2.2),
  clock: createIcon(["M12 7v5l3 2"]),
};

export const LockIcon: React.FC<IconProps> = (props) =>
  React.createElement(
    "svg",
    Object.assign(
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        width: 13,
        height: 13,
      },
      props
    ),
    React.createElement("rect", { x: 5, y: 11, width: 14, height: 9, rx: 2 }),
    React.createElement("path", { d: "M8 11V8a4 4 0 0 1 8 0v3" })
  );

export const AriaMark: React.FC<IconProps> = (props) =>
  React.createElement(
    "svg",
    Object.assign({ viewBox: "0 0 32 18", width: 19, height: 19 }, props),
    React.createElement("path", {
      d: "M16 1 28 26h-5l-2.2-4.8h-7L9 26H4L16 1Zm0 9.6-2.5 5.4h5L16 10.6Z",
      fill: "#fff",
      transform: "translate(0 -4) scale(1 0.78)",
    })
  );
