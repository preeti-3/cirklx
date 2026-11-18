import Image from "next/image";

const logos = ["/logo13.png","/logo16.png","/logo17.png","/logo3.png","/logo6.png","/logo14.png"];

export function ClientLogoStrip() {
  return <div className="overflow-x-auto border-y border-black/10 bg-[#f4f2ed] [scrollbar-width:none]"><div className="mx-auto flex min-w-[850px] max-w-[1440px]">
    {logos.map((src,index)=><div key={src} className="relative flex h-[148px] min-w-0 flex-1 items-center justify-center border-r border-black/10 px-6 last:border-r-0"><Image src={src} alt={`CirklX client logo ${index+1}`} width={190} height={88} className="max-h-[88px] max-w-[190px] w-auto object-contain" /></div>)}
  </div></div>;
}
