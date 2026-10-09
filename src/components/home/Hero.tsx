"use client";

import { m } from "motion/react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF9E6]">
      {/* Background blobs for the Yellow/Red theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <m.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-red-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"
        />
        <m.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-yellow-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-ink leading-[0.9]">
              SATHYA <br />
              <span className="text-red-600">ENTERPRISES</span>
            </h1>
          </m.div>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-ink-soft max-w-xl leading-relaxed font-medium"
          >
            Sathya Enterprises operates across digital growth, technology, data, products, infrastructure and business services — built as one connected ecosystem rather than a collection of unrelated ventures.
          </m.p>
          
          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-md md:text-lg text-ink-soft max-w-xl leading-relaxed"
          >
            Every part of the business feeds the next: digital work creates attention, technology turns that attention into systems, and services and products deliver the real-world value customers came for.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold tracking-wide transition-colors uppercase text-sm shadow-xl shadow-red-600/20">
              Start a Conversation
            </button>
            <button className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-full font-bold tracking-wide transition-colors uppercase text-sm">
              Explore Ecosystem
            </button>
          </m.div>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full relative flex justify-center md:justify-end">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-red-500 opacity-20 z-10" />
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Sathya Enterprises Team"
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
