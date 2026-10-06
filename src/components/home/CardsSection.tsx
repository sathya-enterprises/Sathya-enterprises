"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

const CARDS_DATA = [
  {
    id: 1,
    title: "DIGITAL",
    description: "Marketing, websites, SEO, SEM, social media and lead generation to drive your growth.",
    linkText: "Explore Digital",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "TECHNOLOGY",
    description: "SaaS, AI automation, WhatsApp solutions and data platforms built for scale.",
    linkText: "Explore Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "PRODUCTS",
    description: "SaaS products, digital data products, marketplace platforms and physical products.",
    linkText: "View Products",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "SERVICES",
    description: "Water pumps, borewell, CCTV, travel, interiors, architecture and startup support.",
    linkText: "Discover Services",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  }
];

export function CardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax horizontal scroll based on vertical scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[250vh] bg-[#F4F4F5]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-[60vw] h-[60vw] bg-red-500 rounded-full mix-blend-multiply opacity-10 filter blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] bg-yellow-400 rounded-full mix-blend-multiply opacity-20 filter blur-[120px]"></div>
          <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-orange-300 rounded-full mix-blend-multiply opacity-20 filter blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 mb-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900">
            OUR BUSINESS <br/><span className="text-red-600">ECOSYSTEM</span>
          </h2>
        </div>

        <div className="relative z-10 w-full">
          <m.div 
            style={{ x }} 
            className="flex gap-8 px-6 md:px-12 w-[200vw] md:w-[150vw]"
          >
            {CARDS_DATA.map((card) => (
              <div 
                key={card.id} 
                className="w-[85vw] md:w-[400px] flex-shrink-0 bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] flex flex-col h-[550px] border border-gray-100"
              >
                {/* Image Area */}
                <div className="w-full h-[250px] rounded-2xl overflow-hidden mb-8 relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {card.description}
                  </p>

                  <a 
                    href="#" 
                    className="mt-auto flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-800 transition-colors group uppercase tracking-wider"
                  >
                    {card.linkText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
