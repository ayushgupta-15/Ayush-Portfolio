import Experience from "@/components/Experience";
import Tilt from "@/components/Tilt";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Starfield from "@/components/Starfield";
import SiteNav from "@/components/SiteNav";
import Icon from "@/components/Icon";
import { profile, products, systems, data, skills, experience, type Row } from "@/lib/data";

function Links({ live, code, name }: { live?: string; code: string; name: string }) {
  return (
    <p className="links">
      {live && (
        <a href={live} target="_blank" rel="noreferrer" aria-label={`${name}, live demo`}>
          <Icon name="external" /> Live demo
        </a>
      )}
      <a href={code} target="_blank" rel="noreferrer" aria-label={`${name}, source code`}>
        <Icon name="github" /> Source
      </a>
    </p>
  );
}

function RowList({ rows }: { rows: Row[] }) {
  return (
    <ul className="rows">
      {rows.map((r, i) => (
        <Reveal as="li" kind="line" delay={(i % 3) * 70} key={r.name}>
          <div className="row-main">
            <h3>
              <a href={r.code} target="_blank" rel="noreferrer">
                {r.name}
              </a>
            </h3>
            <p>{r.summary}</p>
          </div>
          <p className="row-stack">{r.stack}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Starfield />
      <SiteNav />
      <Experience />

      <main>
        <section id="experience" className="wrap section">
          <Reveal kind="rgb" as="h2">Experience</Reveal>
          <p className="section-note">Hibiscustech and EcoXchange, 2025 to 2026</p>
          <ul className="exp">
            {experience.map((e, i) => (
              <Reveal as="li" kind="line" delay={i * 80} key={e.company} className="exp-item">
                <div className="exp-main">
                  <h3>{e.company}</h3>
                  <p className="exp-role">
                    <Icon name="briefcase" /> {e.role}
                  </p>
                  <ul className="exp-points">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
                <aside className="exp-side">
                  <p className="exp-when">{e.period}</p>
                  <p className="exp-place">{e.place}</p>
                  <p className="exp-label">Products</p>
                  <ul className="exp-products">
                    {e.products.map((pr) => (
                      <li key={pr.name}>
                        <b>{pr.name}</b>
                        {pr.links.length > 0 && (
                          <span className="exp-links">
                            {pr.links.map((l) => (
                              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" aria-label={`${pr.name}, ${l.label}`}>
                                <Icon name={l.icon} /> {l.label}
                              </a>
                            ))}
                          </span>
                        )}
                        {pr.note && <span className="exp-note">{pr.note}</span>}
                      </li>
                    ))}
                  </ul>
                </aside>
              </Reveal>
            ))}
          </ul>
        </section>

        <section id="work" className="wrap section">
          <Reveal kind="rgb" as="h2">Products</Reveal>
          <p className="section-note">Full-stack and AI applications</p>
          <div className="panels">
            {products.map((p, i) => (
              <Reveal key={p.name} kind="panel" delay={(i % 2) * 120} className={`panel-wrap ${p.size}`}>
                <Tilt className="panel">
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="stack">{p.stack}</p>
                  <Links live={p.live} code={p.code} name={p.name} />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap section">
          <Reveal kind="rgb" as="h2">Systems and silicon</Reveal>
          <p className="section-note">Kernels, compilers, processors and EDA tools</p>
          <RowList rows={systems} />
        </section>

        <section className="wrap section">
          <Reveal kind="rgb" as="h2">Data and machine learning</Reveal>
          <RowList rows={data} />
        </section>

        <section className="wrap section about" id="about">
          <Reveal kind="rgb" as="h2">About</Reveal>
          <div className="about-grid">
            <Reveal>
              <p>
                I'm a final-year Electronics and Communication student at Delhi Technological University. I started in
                hardware, writing assembly for a PIC microcontroller and Verilog for CPUs, then moved up the stack into
                backend and AI work. That path shows up in how I build: I like knowing what the layer below is doing.
              </p>
              <p>
                I'm looking for software engineering roles where I can ship real products and keep learning how the
                systems underneath them work.
              </p>
            </Reveal>
            <dl className="facts">
              <Reveal kind="line"><dt>Education</dt><dd>B.Tech, Electronics and Communication, DTU, 2027. CGPA 8.31.</dd></Reveal>
              <Reveal kind="line"><dt>Problem solving</dt><dd><CountUp to={495} /> LeetCode problems solved.</dd></Reveal>
              {skills.map((s) => (
                <Reveal kind="line" key={s.group}><dt>{s.group}</dt><dd>{s.items}</dd></Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section className="wrap section contact" id="contact">
          <Reveal kind="rgb" as="h2">Contact</Reveal>
          <p className="lede">The quickest way to reach me is email.</p>
          <div className="hero-links">
            <CopyEmail email={profile.email} />
            <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <ul className="elsewhere">
            <li><a className="chip-link" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a></li>
            <li><a className="chip-link" href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a></li>
            <li><a className="chip-link" href={profile.leetcode} target="_blank" rel="noreferrer"><Icon name="code" /> LeetCode</a></li>
            <li><a className="chip-link" href={`mailto:${profile.email}`}><Icon name="mail" /> Email</a></li>
          </ul>
        </section>
      </main>

      <footer className="wrap foot">
        <p>Ayush Gupta, 2026. Built with Next.js and three.js.</p>
      </footer>
    </>
  );
}
