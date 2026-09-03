import { siteConfig } from '../data/mockData.js'

export default function Hero() {
  return (
    <section className="relative flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden bg-navy-950 text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* dark overlay so the text stays readable over the footage */}
      <div className="absolute inset-0 bg-navy-950/55" />

      <div className="relative z-10 px-6 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">{siteConfig.heroTagline}</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-200">{siteConfig.heroSubtext}</p>
      </div>
    </section>
  )
}