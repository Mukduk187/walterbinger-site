import { motion } from "motion/react";
import { useState } from "react";
import { useUniverseStore } from "../state/universeStore";

const highlights = [
  {
    title: "Healthcare Services Group",
    role: "District Manager",
    body: "Grew the district from 5 to 8 skilled-nursing and rehab facilities in a year, managing 100+ employees. Led SOP resets and MealTracker adoption, and supported the district through roughly 32 state surveys over three years at a 90%+ deficiency-free rate.",
  },
  {
    title: "LiveWell",
    role: "Crisis Operations",
    body: "Took a crisis assignment across an 11-facility region and reversed a roughly $45K/month deficit in under six weeks.",
  },
  {
    title: "Island Nursing Home",
    role: "Continuity & Recovery",
    body: "Held crisis continuity through a regulatory shutdown and COVID response, including the relocation of about 70 residents, while keeping resident feedback loops running.",
  },
  {
    title: "Independent Hospitality",
    role: "Founder / Operator",
    body: "Empanadas, Son!, Circus RestoBar, and Nimbus — built and ran hospitality concepts across Brooklyn, the Lower East Side, and Buenos Aires: menus, buildout, staffing, POS workflows, vendors, and daily service.",
  },
] as const;

export function CvRoom() {
  const enterSky = useUniverseStore((state) => state.enterSky);
  const enterFieldBoard = useUniverseStore((state) => state.enterFieldBoard);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    if (!navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText("wbinger@gmail.com");
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1800);
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="hero">
        <button
          type="button"
          className="mark"
          onClick={enterSky}
          aria-label="Enter the living map"
          title="Enter"
        >
          <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
            <circle cx="6" cy="26" r="1.6" />
            <circle cx="17" cy="8" r="1.8" />
            <circle cx="28" cy="22" r="1.4" />
            <circle cx="21" cy="30" r="1.2" />
            <path d="M6 26 17 8 28 22 21 30" />
          </svg>
        </button>
        <h1>Walter Binger</h1>
        <p className="tagline">I build useful things in messy human systems.</p>
      </header>

      <main>
        <section className="bio">
          <p>
            15+ years walking into disrupted environments, earning trust
            quickly, and turning messy field reality into workflows people
            actually use — across skilled-nursing operations and independent
            hospitality ventures in the U.S. and Argentina. Spanish and French
            fluent.
          </p>
        </section>

        <section className="highlights">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="highlight">
              <h2>{highlight.title}</h2>
              <p className="role">{highlight.role}</p>
              <p>{highlight.body}</p>
            </article>
          ))}
        </section>

        <section className="contact">
          <h2>Get in touch</h2>
          <p className="contact-links">
            <a
              href="mailto:wbinger@gmail.com"
              onClick={(event) => {
                if (!navigator.clipboard) {
                  return;
                }
                event.preventDefault();
                void copyEmail();
              }}
            >
              {emailCopied ? "Copied — wbinger@gmail.com" : "wbinger@gmail.com"}
            </a>
            <span className="divider" aria-hidden="true">
              ·
            </span>
            <a
              href="https://linkedin.com/in/walter-binger"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/walter-binger
            </a>
          </p>
          <p className="tool-link">
            <button type="button" onClick={enterFieldBoard}>
              PREP / PERP Field Tools
            </button>
          </p>
        </section>
      </main>

      <footer>
        <button
          type="button"
          className="footer-star"
          onClick={enterSky}
          aria-label="Enter the living map"
        >
          <span aria-hidden="true">✦</span>
        </button>
      </footer>
    </motion.div>
  );
}
