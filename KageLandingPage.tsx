import React, { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";

export interface KageLandingPageProps {
  /** Font family for headings (e.g. 'onest', 'sans-serif') */
  headingFont?: string;
  /** Font family for body copy (e.g. 'onest', 'sans-serif') */
  bodyFont?: string;
  /** Font weight for headings (e.g. 400 or '400') */
  headingWeight?: string | number;
  /** Font weight for body copy (e.g. 300 or '300') */
  bodyWeight?: string | number;
  /** Primary accent color (vermilion red, default: '#e0231c') */
  primaryColor?: string;
  /** Font size for hero heading in px (default: 46) */
  headingSize?: number;
  /** Font size for body copy in px (default: 17) */
  bodySize?: number;
  /** Heading letter spacing in em (default: -0.012) */
  headingLetterSpacing?: number;
  /** Custom CSS class name for container */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
  /** Base path to index.html if hosted separately (defaults to './index.html' or '/index.html') */
  src?: string;
}

/**
 * KageLandingPage
 * 
 * An interactive, cinematic WebGL Kyoto mountain temple night walk experience
 * with procedural architecture, lantern light, fog, rain, drifting leaves,
 * and a vermilion moon.
 */
export function KageLandingPage({
  headingFont = "onest",
  bodyFont = "onest",
  headingWeight = "400",
  bodyWeight = "300",
  primaryColor = "#e0231c",
  headingSize = 46,
  bodySize = 17,
  headingLetterSpacing = -0.012,
  className = "",
  style,
  src,
}: KageLandingPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Build query string for initial load
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (primaryColor) params.set("primaryColor", primaryColor);
    if (headingFont) params.set("headingFont", headingFont);
    if (bodyFont) params.set("bodyFont", bodyFont);
    if (headingWeight) params.set("headingWeight", String(headingWeight));
    if (bodyWeight) params.set("bodyWeight", String(bodyWeight));
    if (headingSize !== undefined) params.set("headingSize", String(headingSize));
    if (bodySize !== undefined) params.set("bodySize", String(bodySize));
    if (headingLetterSpacing !== undefined)
      params.set("headingLetterSpacing", String(headingLetterSpacing));
    return params.toString();
  }, [
    primaryColor,
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    headingSize,
    bodySize,
    headingLetterSpacing,
  ]);

  const targetSrc = useMemo(() => {
    const base = src || "index.html";
    return queryParams ? `${base}?${queryParams}` : base;
  }, [src, queryParams]);

  // Synchronize live updates via postMessage for instant reactivity without reloading iframe
  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    try {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "UPDATE_THREEUI_PROPS",
          props: {
            primaryColor,
            headingFont,
            bodyFont,
            headingWeight: String(headingWeight),
            bodyWeight: String(bodyWeight),
            headingSize,
            bodySize,
            headingLetterSpacing,
          },
        },
        "*"
      );
    } catch {
      // Ignore cross-origin warnings if any
    }
  }, [
    primaryColor,
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    headingSize,
    bodySize,
    headingLetterSpacing,
  ]);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#05070a",
    overflow: "hidden",
    ["--vermilion" as any]: primaryColor,
    ["--font-heading" as any]: headingFont,
    ["--font-body" as any]: bodyFont,
    ["--heading-weight" as any]: headingWeight,
    ["--body-weight" as any]: bodyWeight,
    ["--heading-size" as any]: `${headingSize}px`,
    ["--body-size" as any]: `${bodySize}px`,
    ["--heading-letter-spacing" as any]: `${headingLetterSpacing}em`,
    ...style,
  };

  return (
    <div
      className={`kage-landing-page-container ${className}`}
      style={containerStyle}
    >
      <iframe
        ref={iframeRef}
        src={targetSrc}
        title="Kage — Where stillness reveals the unseen"
        className="kage-viewport-iframe"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          border: "none",
          display: "block",
          opacity: isLoaded ? 1 : 0.95,
          transition: "opacity 0.5s ease",
        }}
        onLoad={() => setIsLoaded(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

export default KageLandingPage;
