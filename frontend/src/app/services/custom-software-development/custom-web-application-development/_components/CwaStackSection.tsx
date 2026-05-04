"use client";

import { useState } from "react";
import { STACK } from "../_lib/cwa-data";

export function CwaStackSection() {
  const [activeStack, setActiveStack] = useState(0);

  return (
    <section className="cwa-stack-section" aria-labelledby="cwa-stack-title">
      <div className="cwa-stack-inner">
        <div className="cwa-sh cwa-section-head">
          <h2 id="cwa-stack-title" className="cwa-h2">
            Tooling we <span className="cwa-italic-mute">trust.</span>
          </h2>
          <p className="cwa-h2-lead">
            Mature, production-ready stacks — picked for your problem, not because they&apos;re new.
          </p>
        </div>

        <div className="cwa-stack-window" role="tabpanel">
          <div className="cwa-stack-window-chrome">
            <div className="cwa-stack-window-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="cwa-stack-window-title">stack.config.ts</div>
            <div className="cwa-stack-window-meta">— typescript</div>
          </div>

          <div className="cwa-stack-window-body">
            <div className="cwa-stack-tabs" role="tablist" aria-label="Stack categories">
              {STACK.map((g, i) => (
                <button
                  key={g.group}
                  type="button"
                  role="tab"
                  aria-selected={activeStack === i}
                  className="cwa-stack-tab"
                  data-active={activeStack === i ? "true" : "false"}
                  onClick={() => setActiveStack(i)}
                >
                  <span className="cwa-stack-tab-bin">{String(i + 1).padStart(2, "0")}</span>
                  <span>{g.group}</span>
                </button>
              ))}
            </div>

            <div className="cwa-stack-code">
              <div className="cwa-stack-line cwa-stack-line-pre">
                <span className="cwa-stack-ln">1</span>
                <span>
                  <span className="cwa-syn-key">export const</span> <span className="cwa-syn-var">stack</span> = {"{"}
                </span>
              </div>
              <div className="cwa-stack-line cwa-stack-line-pre">
                <span className="cwa-stack-ln">2</span>
                <span>
                  {" "}
                  <span className="cwa-syn-prop">{STACK[activeStack].group.toLowerCase()}</span>: [
                </span>
              </div>

              {STACK[activeStack].items.map((it, i) => (
                <div key={`${activeStack}-${it.name}`} className="cwa-stack-line cwa-stack-line-item">
                  <span className="cwa-stack-ln">{i + 3}</span>
                  <span className="cwa-stack-line-content">
                    <span className="cwa-stack-line-indent">    </span>
                    <span className="cwa-syn-brace">{"{"}</span>
                    <span className="cwa-syn-prop"> name</span>
                    <span className="cwa-syn-punct">: </span>
                    <span className="cwa-syn-str">&quot;{it.name}&quot;</span>
                    <span className="cwa-syn-punct">, </span>
                    <span className="cwa-syn-prop">v</span>
                    <span className="cwa-syn-punct">: </span>
                    <span className="cwa-syn-str">&quot;{it.v}&quot;</span>
                    <span className="cwa-syn-punct">, </span>
                    <span className="cwa-syn-prop">role</span>
                    <span className="cwa-syn-punct">: </span>
                    <span className="cwa-syn-str">&quot;{it.role}&quot;</span>
                    <span className="cwa-syn-brace"> {"}"}</span>
                    <span className="cwa-syn-punct">,</span>
                  </span>
                </div>
              ))}

              <div className="cwa-stack-line cwa-stack-line-pre">
                <span className="cwa-stack-ln">{STACK[activeStack].items.length + 3}</span>
                <span> ],</span>
              </div>
              <div className="cwa-stack-line cwa-stack-line-pre">
                <span className="cwa-stack-ln">{STACK[activeStack].items.length + 4}</span>
                <span>
                  {"}"} <span className="cwa-syn-punct">as const</span>
                  <span className="cwa-syn-cursor" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
