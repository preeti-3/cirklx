import Image from "next/image";
import styles from "./client-logo-strip.module.css";

// Widths account for the transparent padding in the original logo assets.
const logos = [
  { src: "/logo13.png", name: "Cod it", width: 310 },
  { src: "/logo16.png", name: "Mangal", width: 245 },
  { src: "/logo17.png", name: "ME PRO", width: 260 },
  { src: "/logo3.png", name: "Nagpal’s", width: 255 },
  { src: "/logo6.png", name: "Geeta Syrup", width: 260 },
  { src: "/logo14.png", name: "Command", width: 180 },
];

export function ClientLogoStrip() {
  return (
    <div className={styles.strip} role="region" aria-label="Our clients">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {logos.map(({ src, name, width }) => (
              <div key={src} className={styles.cell}>
                <Image
                  src={src}
                  alt={copy === 0 ? name : ""}
                  width={width}
                  height={Math.round(width * 500 / 1080)}
                  className={styles.logo}
                  style={{ width }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
