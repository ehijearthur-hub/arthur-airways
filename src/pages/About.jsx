import { aboutCreator, siteConfig } from '../data/mockData';

export default function About() {
    return (
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <div className="flex flex-col items-center text-center">
                <img src={aboutCreator.photo} alt={aboutCreator.name} className="h-32 w-32 rounded-full object-cover shadow-lg" />
                <h1 className="mt-6 text-3xl font-bold text-navy-900">{aboutCreator.name}</h1>
                <p className="mt-1 text-sm font-medium text-gold-500">{aboutCreator.role}</p>
                <p className="mt-1 text-sm text-slate-500">{aboutCreator.location}</p>

                <p className="mt-8 max-w-xl text-slate-600">{aboutCreator.bio}</p>
                
                <div className="mt-8 flex gap-1 lg:gap-4">
                    <a href={aboutCreator.socials.linkedin} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-slate-50">LinkedIn</a>
                    <a href={aboutCreator.socials.github} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-slate-50">Github</a>
                    <a href={aboutCreator.socials.twitter} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-slate-50">Twitter</a>
                    <a href={aboutCreator.socials.facebook} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-navy-900 hover:bg-slate-50">Facebook</a>
                </div>

                <p className="mt-10 text-sm text-slate-400 ">
                    Built as a frontend project for {siteConfig.airlineName}.
                </p>
            </div>
        </section>
    )
} 