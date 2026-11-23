"use client";

import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";

export type FeaturedReel = { id: number; video: string; poster: string; handle: string; followers: string };
const instagramProfiles: Record<string, string> = {
  "@logicgpt": "https://www.instagram.com/logicgpt/",
  "@mr_techog": "https://www.instagram.com/mr_techog/",
  "@uditgpt": "https://www.instagram.com/uditgpt/",
  "@dr.himanshu_grover_": "https://www.instagram.com/dr.himanshu_grover_/",
  "@fit.niya": "https://www.instagram.com/fit.niya/",
  "@houseofbinti": "https://www.instagram.com/houseofbinti/",
};
const homeReels: FeaturedReel[] = [
  { id: 1, video: "/video1-opt.mp4", poster: "/thumb1.png", handle: "@logicgpt", followers: "403k followers" },
  { id: 2, video: "/video2-opt.mp4", poster: "/thumb3.png", handle: "@mr_techog", followers: "215k followers" },
  { id: 3, video: "/video3-opt.mp4", poster: "/thumb4.png", handle: "@logicgpt", followers: "403k followers" },
  { id: 4, video: "/video4-opt.mp4", poster: "/thumb2.png", handle: "@mr_techog", followers: "215k followers" },
  { id: 5, video: "/video5-opt.mp4", poster: "/thumb3.png", handle: "@uditgpt", followers: "732k followers" },
  { id: 6, video: "/video6-opt.mp4", poster: "/thumb6.png", handle: "@dr.himanshu_grover_", followers: "657k followers" },
  { id: 7, video: "/video7-opt.mp4", poster: "/thumb7.png", handle: "@fit.niya", followers: "73.1k followers" },
  { id: 8, video: "/video8-opt.mp4", poster: "/thumb5.png", handle: "@dr.himanshu_grover_", followers: "657k followers" },
  { id: 9, video: "/video9-opt.mp4", poster: "/thumb9.png", handle: "@houseofbinti", followers: "23.6k followers" },
  { id: 10, video: "/video10-opt.mp4", poster: "/thumb8.png", handle: "@fit.niya", followers: "73.1k followers" },
];

function ReelCard({ reel, rail = false, onPlaybackChange }: { reel: FeaturedReel; rail?: boolean; onPlaybackChange?: (playing: boolean) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const playOnHover = () => {
    const video = videoRef.current;
    if (video?.paused) void video.play().catch(() => undefined);
  };

  const pauseOnLeave = () => videoRef.current?.pause();

  return <article onMouseEnter={playOnHover} onMouseLeave={pauseOnLeave} className={`group relative aspect-[9/16] w-[220px] min-w-[220px] overflow-hidden rounded-[20px] bg-black sm:w-[280px] sm:min-w-[280px] ${rail ? "lg:w-[346.5px] lg:min-w-[346.5px]" : "lg:w-auto lg:min-w-0"}`}>
    <Image src={reel.poster} alt={`${reel.handle} featured reel`} fill sizes="(max-width: 640px) 45vw, 280px" className={`object-cover transition-opacity ${playing ? "opacity-0" : "opacity-100"}`} />
    <video ref={videoRef} src={reel.video} poster={reel.poster} preload="metadata" loop muted playsInline onPlay={() => { setPlaying(true); onPlaybackChange?.(true); }} onPause={() => { setPlaying(false); onPlaybackChange?.(false); }} className="absolute inset-0 h-full w-full object-cover" aria-label={`${reel.handle} featured video`} />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
    <button type="button" onClick={togglePlay} aria-label={playing ? "Pause featured reel" : "Play featured reel"} className={`absolute left-1/2 top-1/2 z-10 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#9b7868]/85 text-white transition hover:scale-105 md:size-14 ${playing ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" : "opacity-100"}`}>
      {playing ? <Pause size={20} fill="currentColor" /> : <Play className="translate-x-px" size={20} fill="currentColor" />}
    </button>
    {playing && <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute featured reel" : "Mute featured reel"} className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/45 text-white">{muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}</button>}
    <a href={instagramProfiles[reel.handle]} target="_blank" rel="noreferrer" aria-label={`Open ${reel.handle} on Instagram`} className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 rounded-lg text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
      <span className="grid size-7 shrink-0 place-items-center rounded-[7px] bg-gradient-to-br from-[#ffd267] via-[#eb3d83] to-[#6848d7]"><FaInstagram size={17}/></span>
      <span className="min-w-0 leading-tight"><strong className="block truncate text-xs">{reel.handle}</strong><span className="block text-[10px] text-white/65">{reel.followers}</span></span>
    </a>
  </article>;
}

export function FeaturedReels({ items = homeReels }: { items?: FeaturedReel[] }) {
  const isHomeRail = items === homeReels;
  const [playingCount, setPlayingCount] = useState(0);
  const [filter, setFilter] = useState("All Reels");
  const handlePlaybackChange = (isPlaying: boolean) => setPlayingCount(count => Math.max(0, count + (isPlaying ? 1 : -1)));

  if (!isHomeRail) return <div className="rail flex gap-3 overflow-x-auto px-5 pb-2 md:gap-5 md:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
    {items.map(reel => <ReelCard key={reel.id} reel={reel} />)}
  </div>;

  return <>
    <div className="rail mx-auto mb-[50px] flex max-w-max gap-3 overflow-x-auto px-5">
      {["All Reels", "School Reels", "Wedding Reels", "Office Reels"].map(label => <button key={label} type="button" onClick={() => setFilter(label)} className={`h-[45px] shrink-0 rounded-full border px-[23px] text-base font-semibold shadow-[0_0_26px_rgba(214,255,1,.08)] transition ${filter === label ? "border-[#15140f] bg-[#d6ff01] text-[#15140f]" : "border-[#15140f]/10 text-[#15140f]/70 hover:border-[#15140f]/30"}`}>{label}</button>)}
    </div>
    <div className={`continuous-slider ${playingCount ? "is-paused" : ""}`}>
      <div className="continuous-track continuous-track--reels">
        {[0, 1].map(copy => <div className="continuous-group gap-[21px] pr-[21px]" key={copy}>
          {items.map(reel => <ReelCard key={`${copy}-${reel.id}`} reel={reel} rail onPlaybackChange={handlePlaybackChange} />)}
        </div>)}
      </div>
    </div>
  </>;
}
