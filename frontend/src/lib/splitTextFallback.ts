/* ─────────────────────────────────────────────────────────────────────────
   SplitText fallback
   ──────────────────
   A minimal drop-in that covers what we use: `.chars`, `.words`, `.lines`
   arrays of HTMLElements, and `.revert()` to restore original DOM.

   Differences from the paid GSAP plugin:
     • Lines are computed by measuring word offsetTop after wrapping — close
       enough for headlines, not for paragraph-perfect line breaking.
     • No `mask` option.
     • No resize observer — call `.revert()` then re-instantiate on resize
       if needed (we use it for hero headlines, which don't reflow much).
   ──────────────────────────────────────────────────────────────────────── */

type SplitType = "chars" | "words" | "lines";

interface SplitTextOptions {
  type?: string; // e.g. "chars,words" or "words,lines"
  charsClass?: string;
  wordsClass?: string;
  linesClass?: string;
}

export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];

  private el: HTMLElement;
  private originalHTML: string;

  constructor(target: HTMLElement | string, options: SplitTextOptions = {}) {
    const node =
      typeof target === "string"
        ? (document.querySelector(target) as HTMLElement)
        : target;
    if (!node) throw new Error("SplitText: target not found");

    this.el = node;
    this.originalHTML = node.innerHTML;

    const types = (options.type || "chars,words")
      .split(",")
      .map((t) => t.trim()) as SplitType[];

    this.split(types, options);
  }

  private split(types: SplitType[], opts: SplitTextOptions) {
    const text = this.el.textContent || "";
    const wantWords = types.includes("words") || types.includes("chars") || types.includes("lines");
    const wantChars = types.includes("chars");
    const wantLines = types.includes("lines");

    // Tokenize on spaces, preserving them.
    const tokens = text.split(/(\s+)/);
    this.el.innerHTML = "";

    tokens.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        // Preserve whitespace as a text node so layout isn't squashed.
        this.el.appendChild(document.createTextNode(tok));
        return;
      }
      if (wantWords) {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";
        if (opts.wordsClass) wordSpan.className = opts.wordsClass;
        wordSpan.setAttribute("data-split-word", "");

        if (wantChars) {
          tok.split("").forEach((ch) => {
            const cs = document.createElement("span");
            cs.style.display = "inline-block";
            cs.textContent = ch;
            if (opts.charsClass) cs.className = opts.charsClass;
            cs.setAttribute("data-split-char", "");
            wordSpan.appendChild(cs);
            this.chars.push(cs);
          });
        } else {
          wordSpan.textContent = tok;
        }
        this.el.appendChild(wordSpan);
        this.words.push(wordSpan);
      } else {
        this.el.appendChild(document.createTextNode(tok));
      }
    });

    if (wantLines && this.words.length) {
      // Group words by offsetTop to fake line detection.
      const lineMap = new Map<number, HTMLElement[]>();
      this.words.forEach((w) => {
        const top = w.offsetTop;
        if (!lineMap.has(top)) lineMap.set(top, []);
        lineMap.get(top)!.push(w);
      });
      // Wrap each line group in a line container.
      // Read keys in DOM order:
      const orderedTops = Array.from(lineMap.keys()).sort((a, b) => a - b);
      orderedTops.forEach((top) => {
        const wordsInLine = lineMap.get(top)!;
        const lineSpan = document.createElement("span");
        lineSpan.style.display = "block";
        lineSpan.style.overflow = "hidden";
        if (opts.linesClass) lineSpan.className = opts.linesClass;
        lineSpan.setAttribute("data-split-line", "");
        const first = wordsInLine[0];
        first.parentNode?.insertBefore(lineSpan, first);
        wordsInLine.forEach((w) => {
          // Move word (and any sibling whitespace text node directly after it
          // that belongs on this line) into the line span.
          const next = w.nextSibling;
          lineSpan.appendChild(w);
          if (
            next &&
            next.nodeType === Node.TEXT_NODE &&
            /^\s+$/.test(next.textContent || "")
          ) {
            lineSpan.appendChild(next);
          }
        });
        this.lines.push(lineSpan);
      });
    }
  }

  revert() {
    this.el.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}
