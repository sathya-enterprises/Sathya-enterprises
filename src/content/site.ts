/**
 * Single source of truth for all site copy.
 * Every string here is taken from the existing Sathya Enterprises website
 * (sathyaenterprises-nine.vercel.app). Do not add claims, clients, figures or
 * testimonials that are not on that site. Placeholders are flagged with `placeholder: true`.
 */

export type DivisionId = "digital" | "technology" | "products" | "services";

export type Division = {
  id: DivisionId;
  index: string;
  name: string;
  /** One-line summary from the live ecosystem page. */
  summary: string;
  /** Role in the connected story (from the live About › Our Approach copy). */
  role: string;
  href: `/${DivisionId}`;
};

export type Business = {
  slug: string;
  name: string;
  /** Short label used in diagrams and the footer. */
  short: string;
  division: DivisionId;
  /** Other divisions this business also belongs to on the live site. */
  also?: DivisionId[];
  index: string;
  headline: string;
  intro: string;
  cta: string;
  flow?: { steps: string[]; vertical?: boolean };
  groups: { title: string; items: { label: string; detail?: string }[] }[];
  note?: { title: string; body: string };
  related: string[];
};

export const brand = {
  name: "Sathya Enterprises",
  first: "SATHYA",
  second: "ENTERPRISES",
  positioning: "One Enterprise. Multiple Businesses. One Connected Ecosystem.",
  verbs: ["BUILD.", "MARKET.", "AUTOMATE.", "GROW."] as const,
  tagline: "BUILD. MARKET. AUTOMATE. GROW.",
  summary:
    "Sathya Enterprises operates across digital growth, technology, data, products, infrastructure and business services — one connected ecosystem built to grow.",
  whoWeAre:
    "Sathya Enterprises operates across digital growth, technology, data, products, infrastructure and business services — built as one connected ecosystem rather than a collection of unrelated ventures. Every part of the business feeds the next: digital work creates attention, technology turns that attention into systems, and services and products deliver the real-world value customers came for.",
  opportunities: "10+ BUSINESS OPPORTUNITIES. ONE VISION.",
};

export const contact = {
  phone: { value: "+91 00000 00000", placeholder: true },
  email: { value: "hello@sathyaenterprises.com", placeholder: false },
  location: "Bengaluru, Karnataka, India",
  heading: "LET'S BUILD WHAT'S NEXT.",
  intro: "Tell us what you're building and which part of the ecosystem you need — we'll take it from there.",
  requirements: [
    "Digital Marketing",
    "Logo Design",
    "Web Development",
    "SEO",
    "SEM",
    "Social Media",
    "Instagram Marketing",
    "Lead Generation",
    "SaaS",
    "AI Automation",
    "WhatsApp Solutions",
    "Data Solutions",
    "Water Pumps",
    "Borewell",
    "CCTV",
    "Travels",
    "Interiors",
    "Architecture",
    "Startup Consulting",
    "Other",
  ],
};

export const divisions: Division[] = [
  {
    id: "digital",
    index: "01",
    name: "DIGITAL",
    summary: "Marketing, websites, SEO, SEM, social media and lead generation.",
    role: "Digital creates attention.",
    href: "/digital",
  },
  {
    id: "technology",
    index: "02",
    name: "TECHNOLOGY",
    summary: "SaaS, AI automation, WhatsApp solutions and data.",
    role: "Technology creates systems.",
    href: "/technology",
  },
  {
    id: "products",
    index: "03",
    name: "PRODUCTS",
    summary: "SaaS products, digital data products, marketplace and physical products.",
    role: "Data creates intelligence.",
    href: "/products",
  },
  {
    id: "services",
    index: "04",
    name: "SERVICES",
    summary: "Water pumps, borewell, CCTV, travel, interiors, architecture and startup support.",
    role: "Services deliver real-world value.",
    href: "/services",
  },
];

export const businesses: Business[] = [
  // ── DIGITAL ───────────────────────────────────────────────
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "Marketing",
    division: "digital",
    index: "04",
    headline: "DIGITAL GROWTH. BUILT AROUND RESULTS.",
    intro:
      "A connected digital growth system, not a bundle of disconnected campaigns — strategy, execution and reporting under one roof.",
    cta: "Build My Growth System",
    groups: [
      {
        title: "What we do",
        items: [
          "Digital strategy",
          "Campaign management",
          "Search marketing",
          "Social media",
          "Instagram marketing",
          "Content",
          "Lead generation",
          "Performance tracking",
        ].map((label) => ({ label })),
      },
    ],
    related: ["seo", "sem", "social-media-management", "instagram-marketing", "lead-generation"],
  },
  {
    slug: "logo-design",
    name: "Logo Design",
    short: "Logo",
    division: "digital",
    index: "05",
    headline: "MAKE YOUR BRAND RECOGNIZABLE.",
    intro: "A logo is the smallest unit of a brand system built to last across every surface it touches.",
    cta: "Start My Brand Identity",
    groups: [
      {
        title: "What we do",
        items: ["Logo design", "Brand identity", "Visual identity", "Brand assets", "Scalable logo systems"].map(
          (label) => ({ label }),
        ),
      },
    ],
    related: ["web-development", "digital-marketing", "social-media-management"],
  },
  {
    slug: "web-development",
    name: "Web Development",
    short: "Websites",
    division: "digital",
    index: "06",
    headline: "WEBSITES THAT WORK FOR BUSINESS.",
    intro:
      "Websites engineered to convert, not just to look good — fast, maintained, and built around your funnel.",
    cta: "Start My Website",
    groups: [
      {
        title: "What we do",
        items: [
          "Corporate websites",
          "Landing pages",
          "E-commerce",
          "Web applications",
          "Custom development",
          "Website maintenance",
        ].map((label) => ({ label })),
      },
    ],
    related: ["logo-design", "seo", "saas-products"],
  },
  {
    slug: "seo",
    name: "SEO",
    short: "SEO",
    division: "digital",
    index: "07",
    headline: "GET FOUND. GET TRAFFIC. GET BUSINESS.",
    intro: "Search visibility built on fundamentals — technical health, content and consistent measurement.",
    cta: "Improve My Rankings",
    groups: [
      {
        title: "What we do",
        items: [
          "Technical SEO",
          "On-page SEO",
          "Local SEO",
          "Content",
          "Keyword strategy",
          "Performance tracking",
        ].map((label) => ({ label })),
      },
    ],
    related: ["digital-marketing", "web-development", "sem"],
  },
  {
    slug: "sem",
    name: "SEM",
    short: "SEM",
    division: "digital",
    index: "08",
    headline: "TURN AD SPEND INTO OPPORTUNITY.",
    intro:
      "Every rupee of ad spend tracked back to a lead, a conversion, or a clear reason it did not convert.",
    cta: "Launch My Campaign",
    groups: [
      {
        title: "What we do",
        items: [
          "Google Ads",
          "Search campaigns",
          "Display campaigns",
          "Remarketing",
          "Conversion tracking",
          "Performance optimization",
        ].map((label) => ({ label })),
      },
    ],
    related: ["seo", "lead-generation", "digital-marketing"],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    short: "Social Media",
    division: "digital",
    index: "09",
    headline: "BUILD ATTENTION. BUILD COMMUNITY. BUILD DEMAND.",
    intro: "Consistent, on-brand presence across platforms — planned, published and measured as one system.",
    cta: "Grow My Social Presence",
    groups: [
      {
        title: "What we do",
        items: [
          "Content planning",
          "Creative design",
          "Publishing",
          "Community management",
          "Analytics",
          "Social strategy",
        ].map((label) => ({ label })),
      },
    ],
    related: ["instagram-marketing", "digital-marketing", "logo-design"],
  },
  {
    slug: "instagram-marketing",
    name: "Instagram Marketing",
    short: "Instagram",
    division: "digital",
    index: "10",
    headline: "MAKE YOUR BRAND IMPOSSIBLE TO IGNORE.",
    intro: "A content engine for Instagram — strategy first, format second, consistency always.",
    cta: "Grow My Instagram",
    groups: [
      {
        title: "What we do",
        items: [
          "Instagram strategy",
          "Reels",
          "Posts",
          "Stories",
          "Content planning",
          "Paid campaigns",
          "Growth strategy",
        ].map((label) => ({ label })),
      },
    ],
    related: ["social-media-management", "digital-marketing", "lead-generation"],
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    short: "Lead Generation",
    division: "digital",
    index: "11",
    headline: "BUILD A PREDICTABLE LEAD PIPELINE.",
    intro:
      "Traffic → Leads → Qualification → Follow-up → Conversion — one predictable pipeline, not a one-off campaign.",
    cta: "Build My Pipeline",
    flow: { steps: ["Traffic", "Leads", "Qualification", "Follow-up", "Conversion"] },
    groups: [
      {
        title: "What we do",
        items: [
          "B2B lead generation",
          "Local lead generation",
          "Campaign-based leads",
          "Lead qualification",
          "Lead management",
        ].map((label) => ({ label })),
      },
    ],
    related: ["digital-marketing", "sem", "ai-automation"],
  },

  // ── TECHNOLOGY ────────────────────────────────────────────
  {
    slug: "saas-products",
    name: "SaaS Products",
    short: "SaaS",
    division: "technology",
    also: ["products"],
    index: "13",
    headline: "SOFTWARE BUILT FOR BUSINESS.",
    intro: "A modular SaaS ecosystem — start with one module, add more as the business grows.",
    cta: "Request Demo",
    groups: [
      {
        title: "The SaaS ecosystem",
        items: [
          "CRM",
          "Lead Management",
          "Sales Management",
          "Business Dashboard",
          "Automation",
          "Analytics",
          "Future SaaS products",
        ].map((label) => ({ label })),
      },
    ],
    related: ["ai-automation", "data-solutions", "whatsapp-business-solutions"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    short: "AI Automation",
    division: "technology",
    index: "14",
    headline: "LESS MANUAL WORK. MORE BUSINESS.",
    intro:
      "Automation designed around a single question: what should never require a human to repeat it manually?",
    cta: "Automate My Business",
    flow: { steps: ["Input", "AI", "Action", "Result"] },
    groups: [
      {
        title: "What we automate",
        items: [
          "AI customer support",
          "AI lead qualification",
          "WhatsApp automation",
          "Follow-up automation",
          "Sales automation",
          "Workflow automation",
        ].map((label) => ({ label })),
      },
    ],
    related: ["whatsapp-business-solutions", "saas-products", "data-solutions"],
  },
  {
    slug: "whatsapp-business-solutions",
    name: "WhatsApp Business Solutions",
    short: "WhatsApp",
    division: "technology",
    index: "15",
    headline: "TURN WHATSAPP INTO A BUSINESS ENGINE.",
    intro:
      "The channel your customers already use, turned into a structured part of your sales and support system.",
    cta: "Set Up WhatsApp Business",
    groups: [
      {
        title: "What we do",
        items: [
          "WhatsApp marketing",
          "Automated replies",
          "Customer communication",
          "Lead follow-up",
          "Campaign management",
          "CRM integration",
        ].map((label) => ({ label })),
      },
    ],
    related: ["ai-automation", "saas-products", "lead-generation"],
  },
  {
    slug: "data-solutions",
    name: "Data Solutions",
    short: "Data",
    division: "technology",
    index: "16",
    headline: "TURN DATA INTO DECISIONS.",
    intro: "Data that gets looked at — clean, organized, and surfaced in a dashboard people actually open.",
    cta: "Understand My Data",
    groups: [
      {
        title: "What we do",
        items: [
          "Business data",
          "Data management",
          "Analytics",
          "Dashboards",
          "Business intelligence",
          "Reporting",
        ].map((label) => ({ label })),
      },
    ],
    related: ["ai-automation", "saas-products", "digital-data-products"],
  },

  // ── PRODUCTS ──────────────────────────────────────────────
  {
    slug: "digital-data-products",
    name: "Digital Data Products",
    short: "Data Products",
    division: "products",
    index: "17",
    headline: "BUSINESS DATA. DELIVERED AS PRODUCTS.",
    intro:
      "Datasets and research packaged as products — sourced and delivered with lawful, privacy-conscious practice at the core.",
    cta: "Explore Data Products",
    groups: [
      {
        title: "What we offer",
        items: [
          "Business datasets",
          "Industry data",
          "Research",
          "Data intelligence",
          "Digital information products",
        ].map((label) => ({ label })),
      },
    ],
    note: {
      title: "Responsible by design",
      body: "Every dataset and product is handled under lawful, privacy-conscious data practices — responsible use is a requirement, not an afterthought.",
    },
    related: ["data-solutions", "business-marketplace", "saas-products"],
  },
  {
    slug: "business-marketplace",
    name: "Business Marketplace",
    short: "Marketplace",
    division: "products",
    index: "18",
    headline: "BUSINESSES. CUSTOMERS. SERVICE PROVIDERS.",
    intro:
      "One platform, three sides — customers who need something, businesses who provide it, and the service providers who deliver it.",
    cta: "Learn More",
    flow: { steps: ["Customers", "Businesses", "Service Providers"], vertical: true },
    groups: [],
    note: {
      title: "How it connects",
      body: "The marketplace links customers, businesses and service providers so demand and supply can find each other inside one connected platform.",
    },
    related: ["digital-data-products", "saas-products", "startup-consulting"],
  },

  // ── SERVICES ──────────────────────────────────────────────
  {
    slug: "water-pumps",
    name: "Water Pumps",
    short: "Water Pumps",
    division: "services",
    also: ["products"],
    index: "19",
    headline: "RELIABLE WATER SOLUTIONS.",
    intro: "Dependable water infrastructure — supplied, installed and maintained by one team.",
    cta: "Enquire About Water Pumps",
    groups: [
      {
        title: "What we offer",
        items: ["Water pumps", "Pump systems", "Installation", "Maintenance", "Water-related solutions"].map(
          (label) => ({ label }),
        ),
      },
    ],
    related: ["borewell-services", "cctv-security", "startup-consulting"],
  },
  {
    slug: "borewell-services",
    name: "Borewell Services",
    short: "Borewell",
    division: "services",
    index: "20",
    headline: "COMPLETE BOREWELL SOLUTIONS.",
    intro: "From site assessment to long-term maintenance — borewell services handled end to end.",
    cta: "Enquire About Borewells",
    flow: { steps: ["Assessment", "Drilling", "Equipment", "Installation", "Maintenance"] },
    groups: [
      {
        title: "What we do",
        items: ["Borewell services", "Drilling", "Equipment", "Installation", "Support", "Maintenance"].map(
          (label) => ({ label }),
        ),
      },
    ],
    related: ["water-pumps", "cctv-security", "interiors-architecture"],
  },
  {
    slug: "cctv-security",
    name: "CCTV & Security",
    short: "CCTV",
    division: "services",
    index: "21",
    headline: "SECURITY YOU CAN SEE.",
    intro: "Surveillance systems specified, installed and maintained around how a space is actually used.",
    cta: "Secure My Property",
    groups: [
      {
        title: "What we offer",
        items: [
          "CCTV systems",
          "Installation",
          "Surveillance",
          "Monitoring",
          "Maintenance",
          "Security solutions",
        ].map((label) => ({ label })),
      },
    ],
    related: ["water-pumps", "borewell-services", "interiors-architecture"],
  },
  {
    slug: "travels",
    name: "Travels",
    short: "Travels",
    division: "services",
    index: "22",
    headline: "TRAVEL & TRANSPORTATION SOLUTIONS.",
    intro: "Straightforward travel and transportation support — enquire, book, go.",
    cta: "Enquire About Travel",
    groups: [
      {
        title: "What we offer",
        items: ["Travel services", "Transportation", "Vehicle solutions", "Booking / enquiry"].map((label) => ({
          label,
        })),
      },
    ],
    related: ["interiors-architecture", "startup-consulting", "business-marketplace"],
  },
  {
    slug: "interiors-architecture",
    name: "Interiors & Architecture",
    short: "Interiors",
    division: "services",
    index: "23",
    headline: "DESIGN. PLAN. BUILD.",
    intro: "Two disciplines, one project team — interiors and architecture planned and executed together.",
    cta: "Start My Project",
    groups: [
      {
        title: "Interiors",
        items: ["Interior design", "Space planning", "Execution", "Project support"].map((label) => ({ label })),
      },
      {
        title: "Architecture",
        items: ["Architecture", "Planning", "Design", "Project support"].map((label) => ({ label })),
      },
    ],
    related: ["water-pumps", "borewell-services", "startup-consulting"],
  },
  {
    slug: "startup-consulting",
    name: "Startup Management Consulting",
    short: "Startup Consulting",
    division: "services",
    index: "24",
    headline: "FROM IDEA TO SCALE.",
    intro:
      "End-to-End Startup Support — helping founders set up, comply and scale confidently, from incorporation to funding.",
    cta: "Start My Startup Journey",
    flow: { steps: ["Idea", "Setup", "Comply", "Fund", "Grow"] },
    groups: [
      {
        title: "What we do",
        items: [
          { label: "Company Setup", detail: "Pvt Ltd, LLP, OPC incorporation" },
          { label: "Compliance", detail: "Legal & regulatory support" },
          { label: "Funding Support", detail: "Investor readiness & pitch preparation" },
          { label: "Legal Advisory", detail: "Contracts & agreements" },
        ],
      },
    ],
    related: ["business-marketplace", "saas-products", "digital-marketing"],
  },
];

export const businessBySlug = Object.fromEntries(businesses.map((b) => [b.slug, b])) as Record<
  string,
  Business
>;

export const divisionById = Object.fromEntries(divisions.map((d) => [d.id, d])) as Record<DivisionId, Division>;

export function businessesIn(id: DivisionId, { includeAlso = true } = {}) {
  return businesses.filter((b) => b.division === id || (includeAlso && b.also?.includes(id)));
}

/** Contact form requirement option for each business (options as published on the live contact form). */
export const requirementFor: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "logo-design": "Logo Design",
  "web-development": "Web Development",
  seo: "SEO",
  sem: "SEM",
  "social-media-management": "Social Media",
  "instagram-marketing": "Instagram Marketing",
  "lead-generation": "Lead Generation",
  "saas-products": "SaaS",
  "ai-automation": "AI Automation",
  "whatsapp-business-solutions": "WhatsApp Solutions",
  "data-solutions": "Data Solutions",
  "digital-data-products": "Other",
  "business-marketplace": "Other",
  "water-pumps": "Water Pumps",
  "borewell-services": "Borewell",
  "cctv-security": "CCTV",
  travels: "Travels",
  "interiors-architecture": "Interiors",
  "startup-consulting": "Startup Consulting",
};

/** Businesses no longer have their own pages — each one lives as an anchor on its division page. */
export function businessHref(b: Business) {
  return `${divisionById[b.division].href}#${b.slug}`;
}

/** BUILD. MARKET. AUTOMATE. GROW. — each verb mapped to the businesses that deliver it (lines from published headlines). */
export const growthSteps = [
  { verb: "BUILD.", line: "Websites, brands and software built for business.", slugs: ["web-development", "logo-design", "saas-products"] },
  {
    verb: "MARKET.",
    line: "Get found. Get traffic. Get business.",
    slugs: ["digital-marketing", "seo", "sem", "social-media-management", "instagram-marketing"],
  },
  { verb: "AUTOMATE.", line: "Less manual work. More business.", slugs: ["ai-automation", "whatsapp-business-solutions", "lead-generation"] },
  { verb: "GROW.", line: "Turn data into decisions — from idea to scale.", slugs: ["data-solutions", "startup-consulting", "business-marketplace"] },
];

/**
 * Social profiles. Paste a full profile URL to show its icon in the footer; empty entries are
 * hidden, so the site never links anywhere that doesn't exist yet.
 */
export const socials: { id: "instagram" | "facebook" | "linkedin" | "youtube" | "x" | "whatsapp"; label: string; url: string }[] = [
  { id: "instagram", label: "Instagram", url: "" },
  { id: "facebook", label: "Facebook", url: "" },
  { id: "linkedin", label: "LinkedIn", url: "" },
  { id: "youtube", label: "YouTube", url: "" },
  { id: "x", label: "X (Twitter)", url: "" },
  { id: "whatsapp", label: "WhatsApp", url: "" },
];
