import type { CSSProperties } from "react";
import type { CelestialNode } from "../domain/cosmology";

interface BodyGlyphProps {
  node: CelestialNode;
  active: boolean;
  selected: boolean;
  color: string;
}

const sharedStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function PlaceholderGlyph({ glyphKey }: { glyphKey?: string }) {
  switch (glyphKey) {
    case "archive":
      return (
        <>
          <path {...sharedStroke} d="M-20-22h30l12 12v34h-42Z" />
          <path {...sharedStroke} d="M10-22v13h12M-12-2h24M-12 7h20M-12 16H6" />
        </>
      );
    case "bridge":
      return (
        <>
          <path {...sharedStroke} d="M-31 20V-8M31 20V-8M-37 20h74" />
          <path {...sharedStroke} d="M-31-8C-20 15 20 15 31-8M-31-8h62M-22-8v22M22-8v22" />
          <path {...sharedStroke} d="M-31-8-22-20-13-8M31-8 22-20 13-8" />
        </>
      );
    case "pine":
      return (
        <>
          <path {...sharedStroke} d="M2 28C0 10-1-10 5-29" />
          <path {...sharedStroke} d="M4-22-13-8M5-15 22-4M2-8-23 4M3 0 25 10M1 7-18 20M2 15 16 25" />
          <path {...sharedStroke} d="M8-34 9-30M6-32h6" />
        </>
      );
    case "sun-of-may":
      return (
        <>
          <circle {...sharedStroke} r="18" />
          {Array.from({ length: 16 }, (_, index) => {
            const angle = (index / 16) * Math.PI * 2;
            const inner = 22;
            const outer = index % 2 === 0 ? 35 : 30;
            return (
              <path
                key={index}
                {...sharedStroke}
                d={`M${Math.cos(angle) * inner} ${Math.sin(angle) * inner}L${Math.cos(angle) * outer} ${Math.sin(angle) * outer}`}
              />
            );
          })}
          <path {...sharedStroke} d="M-10-4q5-5 10 0M3-4q5-5 10 0M-7 8q7 7 14 0" />
        </>
      );
    case "doorway":
      return (
        <>
          <path {...sharedStroke} d="M-25 27V-25h50v52M-14 27V-14h28v41" />
          <path {...sharedStroke} d="M-30 28h60M-6 7q6 8 12 0M0-3v18" />
        </>
      );
    case "balance":
      return (
        <>
          <path {...sharedStroke} d="M0-30v55M-24 25h48M-19-17h38M0-24l-7 7 7 7 7-7Z" />
          <path {...sharedStroke} d="m-19-17-11 25h22Zm38 0L8 8h22Z" />
        </>
      );
    case "torus":
      return (
        <>
          <ellipse {...sharedStroke} rx="34" ry="16" />
          <ellipse {...sharedStroke} rx="15" ry="33" transform="rotate(28)" />
          <path {...sharedStroke} d="M-30-11C-5 10 9 12 30 11M-30 11C-5-10 9-12 30-11" />
        </>
      );
    case "book":
      return (
        <>
          <path {...sharedStroke} d="M0-20C-9-26-21-25-30-18v39c10-6 21-6 30 1Z" />
          <path {...sharedStroke} d="M0-20C9-26 21-25 30-18v39c-10-6-21-6-30 1Z" />
          <path {...sharedStroke} d="M-23-10h15M8-10h15M-23-2h15M8-2h15" />
        </>
      );
    case "wave":
      return (
        <>
          <path {...sharedStroke} d="M-34 0c8-22 16 22 24 0S6-22 14 0s16 22 24 0" />
          <path {...sharedStroke} d="M-28-14c10-10 17-10 27 0M1 14c10 10 17 10 27 0" />
        </>
      );
    case "aperture":
      return (
        <>
          <circle {...sharedStroke} r="31" />
          <circle {...sharedStroke} r="9" />
          <path {...sharedStroke} d="M0-31 10-8M27-15 9-5M27 15 0 9M0 31-10 8M-27 15-9 5M-27-15 0-9" />
        </>
      );
    case "play":
      return (
        <>
          <path {...sharedStroke} d="M-31 18C-16-6-1-7 13-20M-16 18h22M13-20l-4 12 12-4" />
          <circle {...sharedStroke} cx="-23" cy="-11" r="7" />
          <path {...sharedStroke} d="M-23-4v19M-23 4-33 10M-23 5-13 9" />
        </>
      );
    case "field-tools":
      return (
        <>
          <path {...sharedStroke} d="M-29-21h58v42h-58Z" />
          <path {...sharedStroke} d="M-20-11h12M-20-2H3M-20 7h18" />
          <circle {...sharedStroke} cx="17" cy="-9" r="5" />
          <path {...sharedStroke} d="M12 7h10M17 2v10M-8 27h16M0 21v6" />
        </>
      );
    default:
      return (
        <>
          <path {...sharedStroke} d="M-25 5c10-31 18 25 29-5S20 24 27-12" />
          <path {...sharedStroke} d="M-19-17c12 4 22-7 31 2M-9 21c9-8 19-6 27-14" />
        </>
      );
  }
}

export function BodyGlyph({
  node,
  active,
  selected,
  color,
}: BodyGlyphProps) {
  const style = {
    "--body-color": color,
  } as CSSProperties;

  if (node.glyphKey === "empanadas-sun") {
    return (
      <g
        className={`body-glyph body-glyph--image${active ? " is-spectral" : ""}${selected ? " is-selected" : ""}`}
        style={style}
      >
        <image
          href={`${import.meta.env.BASE_URL}assets/source/empanadas-son/store-sun.png`}
          x="-43"
          y="-39"
          width="86"
          height="78"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    );
  }

  return (
    <g
      className={`body-glyph${active ? " is-spectral" : ""}${selected ? " is-selected" : ""}`}
      style={style}
    >
      <PlaceholderGlyph glyphKey={node.glyphKey} />
    </g>
  );
}

export function EmergingGlyph({ index }: { index: number }) {
  const phase = (index % 5) * 4;
  return (
    <g className="emerging-glyph" aria-hidden="true">
      <path
        d={`M-8 ${phase - 8}C-2-14 5-9 6-2S14 8 5 11-10 7-7-2 0-10 8-8`}
      />
      <path d="M-2-10 1-16M8 2l7-2M-4 10l-2 7" />
    </g>
  );
}

export function AmbientStarGlyph({ variant }: { variant: number }) {
  const points = 4 + (variant % 3) * 2;
  const outer = 4.6 + (variant % 5) * 0.7;
  const inner = 1.2 + (variant % 3) * 0.35;
  const coords = Array.from({ length: points * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = (index / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    return `${Math.cos(angle) * radius},${Math.sin(angle) * radius}`;
  }).join(" ");
  return <polygon className="ambient-star-glyph" points={coords} />;
}
