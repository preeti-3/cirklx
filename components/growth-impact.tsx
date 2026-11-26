const before = [["67", "Profile Clicks"], ["0", "Followers"], ["5K", "Likes"]] as const;
const after = [["1.9K", "Profile Clicks"], ["40K+", "Views"], ["30K", "Likes"]] as const;

// Recovered from the previous site's Work particle field. Keep this deterministic
// so server markup and hydration use the same scattered positions.
const particles = Array.from({ length: 180 }, (_, index) => {
  const angle = ((index * 137.5) % 360) * Math.PI / 180;
  const radius = 16 + ((index * 53) % 100) / 100 * 84;
  const jitter = (index * 19) % 10 - 5;
  return {
    left: `${50 + Math.cos(angle) * radius / 3 + jitter * 0.2}%`,
    top: `${50 + Math.sin(angle) * radius / 3 + jitter * 0.2}%`,
    width: 1.4 + ((index * 7) % 3) * 0.55,
    height: 1.4 + ((index * 7) % 3) * 0.55,
    opacity: 0.22 + ((index * 31) % 60) / 100,
  };
});

export function GrowthImpact() {
  return <section className="growth-impact bg-[#15140f] text-white">
    <div className="relative mx-auto hidden h-[410px] max-w-[1440px] lg:block">
      <p className="absolute left-[17%] top-[101px] text-[11px] uppercase text-white/30">Before</p>
      <p className="absolute right-[17%] top-[101px] text-[11px] uppercase text-white/30">After</p>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 410" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <NeonPath d="M245 147H405Q431 147 431 173V206Q431 232 457 232H595" />
        <NeonPath d="M245 232H595" delay={-1} />
        <NeonPath d="M245 315H405Q431 315 431 289V258Q431 232 457 232H595" delay={-2} />
        <NeonPath d="M845 232H983Q1009 232 1009 206V173Q1009 147 1035 147H1195" />
        <NeonPath d="M845 232H1195" delay={-1} />
        <NeonPath d="M845 232H983Q1009 232 1009 258V289Q1009 315 1035 315H1195" delay={-2} />
      </svg>
      <DesktopPill className="left-[8.4%] top-[131px]">67 Profile Clicks</DesktopPill>
      <DesktopPill className="left-[11.4%] top-[216px]">0 Followers</DesktopPill>
      <DesktopPill className="left-[14.4%] top-[299px]">5K Likes</DesktopPill>
      <DesktopPill lime className="left-[24.6%] top-[216px]">1K+ Followers</DesktopPill>
      <DesktopPill className="right-[5.8%] top-[131px]">1.9K Profile Clicks</DesktopPill>
      <DesktopPill className="right-[10.8%] top-[216px]">40K+ Views</DesktopPill>
      <DesktopPill className="right-[11.8%] top-[299px]">30K Likes</DesktopPill>
      <DesktopPill lime className="right-[24.2%] top-[216px]">2K+ Followers</DesktopPill>
      <div className="absolute left-1/2 top-[192px] -translate-x-1/2 text-center">
        <BrandCore />
        <p className="mt-12 text-[26px] font-semibold">CirklX</p>
      </div>
    </div>
    <div className="relative mx-auto h-[660px] max-w-[390px] px-[17px] lg:hidden">
      <svg className="absolute left-0 top-0 h-[320px] w-full" viewBox="0 0 390 320" fill="none" aria-hidden="true">
        <NeonPath d="M88 280V165Q88 147 104 147H195" />
        <NeonPath d="M195 147H254Q270 147 270 165V280" delay={-1.5} />
      </svg>
      <div className="absolute left-1/2 top-[107px] -translate-x-1/2 text-center">
        <BrandCore />
        <p className="mt-12 text-[26px] font-semibold">CirklX</p>
      </div>
      <div className="absolute inset-x-[17px] top-[280px] grid grid-cols-2 gap-[21px]">
        <MobileStats title="Before" items={before} />
        <MobileStats title="After" items={after} accent />
      </div>
    </div>
  </section>;
}

function NeonPath({ d, delay = 0 }: { d: string; delay?: number }) {
  return <>
    <path d={d} stroke="#4a4942" />
    <path className="growth-neon" d={d} pathLength={1} stroke="#d6ff01" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.2 0.8" style={{ animationDelay: `${delay}s` }} />
  </>;
}

function BrandCore() {
  return <div className="growth-core relative grid size-20 place-items-center" aria-hidden="true">
    <div className="growth-particle-field">
      <div className="growth-particle-rotation">
        {particles.map((style, index) => <span key={index} style={style} />)}
      </div>
    </div>
    <div className="relative z-10 grid size-20 place-items-center rounded-full border border-white/20 bg-[#535349] shadow-[0_0_26px_rgba(214,255,1,.12)]">
      <span className="block size-[42px] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/white.png')" }} />
    </div>
  </div>;
}

function DesktopPill({children,className,lime=false}:{children:React.ReactNode;className:string;lime?:boolean}) {
  return <span className={`absolute z-10 rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase leading-none tracking-[.12em] ${lime ? "border-[#d6ff01]/20 bg-[#20250d] text-[#d6ff01]" : "border-white/10 bg-[#302f2a] text-white/65"} ${className}`}>{children}</span>;
}

function MobileStats({title,items,accent=false}:{title:string;items:readonly (readonly [string,string])[];accent?:boolean}) {
  return <div className={`rounded-[18px] border px-[19px] py-[20px] ${accent ? "border-[#d6ff01]/15 bg-[linear-gradient(145deg,#25280f,#1a1c0b)]" : "border-white/10 bg-[linear-gradient(145deg,#25241f,#1b1a17)]"}`}>
    <p className="border-b border-white/10 pb-3 text-[12px] font-semibold uppercase text-white/30">{title}</p>
    {items.map(([value,label]) => <div key={label} className="border-b border-white/10 py-[15px] last:border-0 last:pb-0">
      <strong className="serif block text-[31px] leading-none text-white">{value}</strong>
      <span className="mt-2 block text-[12px] text-white/55">{label}</span>
    </div>)}
  </div>;
}
