const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950">
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15] dark:opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(153,246,228,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(253,224,71,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(250,204,21,0.08),transparent_40%)]" />
    </div>
  );
};

export default BackgroundGradient;
