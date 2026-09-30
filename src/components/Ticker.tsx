const tickerItems = [
  "🥗 FRESH SALADS",
  "WHOLESOME WRAPS",
  "DELICIOUS SMOOTHIES",
  "HIGH-PROTEIN MEALS",
  "NO BORING HEALTHY FOOD",
  "MADE FRESH DAILY 💚",
];

const TickerContent = () => (
  <div className="flex shrink-0 items-center">
    {tickerItems.map((item, index) => (
      <span
        key={index}
        className="flex items-center font-display text-sm md:text-base font-medium tracking-wide text-primary-foreground"
      >
        {item}
        <span className="mx-6 md:mx-8 h-1.5 w-1.5 rounded-full bg-primary-foreground/50" aria-hidden="true" />
      </span>
    ))}
  </div>
);

const Ticker = () => {
  return (
    <div
      className="relative w-full overflow-hidden py-2.5 md:py-3"
      style={{ background: "var(--gradient-vibrant)" }}
      role="marquee"
      aria-label="Announcements"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <TickerContent />
        <TickerContent />
      </div>

      {/* Edge fades so the loop feels seamless against the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[hsl(var(--vibrant-teal))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[hsl(var(--electric-purple))] to-transparent" />
    </div>
  );
};

export default Ticker;
