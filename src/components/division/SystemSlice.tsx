import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { system } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/** The stages of the Money-Making System a division powers, shown in place within all six. */
export function SystemSlice({ stageIds, title, flush = false }: { stageIds: string[]; title: string; flush?: boolean }) {
  return (
    <section data-tone="technology" className="tone">
      <div className={`container-wide section-y ${flush ? "!pt-0" : ""}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="t-eyebrow text-gold">In the Money-Making System</p>
            <h2 className="t-h2 mt-4 max-w-[22ch]">{title}</h2>
          </div>
          <Link href="/money-making-system" className="group inline-flex items-center gap-1.5 text-sm font-bold text-gold">
            See the Full System
            <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <ol className="mt-10 grid gap-2 sm:grid-cols-2 sm:gap-3 lg:mt-12 lg:flex">
          {system.stages.map((s, i) => {
            const on = stageIds.includes(s.id);
            return (
              <Reveal
                as="li"
                key={s.id}
                delay={i * 0.06}
                y={14}
                className={`flex flex-col rounded-md border p-5 ${
                  on ? "min-h-[180px] border-gold bg-gold text-charcoal lg:min-h-[200px] lg:flex-[2_1_0%]" : "border-[color:var(--tone-line)] py-3.5 text-ivory/40 lg:min-h-[200px] lg:min-w-0 lg:flex-[1_1_0%] lg:py-5"
                }`}
              >
                <span className="font-mono text-[0.66rem] font-bold tracking-[0.16em]">
                  {String(i + 1).padStart(2, "0")} → {s.yields.toUpperCase()}
                </span>
                <span className={`font-display font-extrabold tracking-[-0.03em] ${on ? "mt-3 text-[1.6rem]" : "mt-1 text-[1.15rem] lg:mt-3 lg:text-[1.6rem]"}`}>{s.name}</span>
                {on && (
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {s.tools.map((t) =>
                      t.slug ? (
                        <li key={t.label}>
                          <Link href={`/${t.slug}`} className="inline-flex rounded-full bg-charcoal px-3 py-1.5 text-[0.8rem] font-bold text-ivory transition-colors duration-200 hover:bg-red">
                            {t.label}
                          </Link>
                        </li>
                      ) : (
                        <li key={t.label} className="rounded-full border border-charcoal/30 px-3 py-1.5 text-[0.8rem] font-bold">
                          {t.label}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
