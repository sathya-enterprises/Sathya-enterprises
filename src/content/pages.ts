/**
 * Copy for the inner pages (About, the four divisions, Contact), taken from the client's website
 * content doc (sathya.pdf, "Version A", Oct 2026). The home page keeps its own copy in site.ts.
 */
import type { DivisionId } from "@/content/site";

export type PageMeta = { title: string; description: string };

/** Meta titles and descriptions from the doc's SEO table: under 60 / 160 characters, Bengaluru on each. */
export const meta = {
  about: {
    title: "About Sathya Enterprises — One Connected Ecosystem",
    description:
      "Meet Sathya Enterprises, a Bengaluru business ecosystem built as one enterprise across digital, technology, products and services.",
  },
  digital: {
    title: "Digital Marketing, Web & SEO in Bengaluru — Sathya",
    description:
      "Digital marketing, logo design, websites, SEO, Google Ads, social media and lead generation in Bengaluru — run as one growth system.",
  },
  technology: {
    title: "SaaS, AI Automation & WhatsApp API — Sathya Enterprises",
    description:
      "Modular SaaS, AI automation, WhatsApp Business API and data dashboards that turn leads into customers. Based in Bengaluru.",
  },
  products: {
    title: "Business Data Products & Marketplace — Sathya",
    description:
      "Lawfully sourced business datasets, market research and a three-sided marketplace connecting customers, businesses and providers.",
  },
  services: {
    title: "Borewell, Pumps, CCTV, Interiors in Bengaluru — Sathya",
    description:
      "Water pumps, borewell drilling, CCTV installation, travels, interiors, architecture and startup consulting across Bengaluru.",
  },
  contact: {
    title: "Contact Sathya Enterprises — Bengaluru",
    description:
      "Talk to Sathya Enterprises about marketing, technology, products or on-ground services. We reply within one working day.",
  },
} satisfies Record<string, PageMeta>;

export type Cta = { heading: string; label: string };

/** Body line under every closing call (doc › Final CTA). */
export const ctaBody =
  "Whether you need more leads this month or a full growth system this year, it starts with one conversation.";

/* ── About ─────────────────────────────────────────────────────────────── */

export const aboutPage = {
  whoWeAre: [
    "Sathya Enterprises is a Bengaluru-based business ecosystem spanning digital, technology, products and services. We were built as one enterprise — not a loose collection of ventures — so the work we do in one division makes every other division stronger.",
  ],
  vision:
    "To be the connected engine behind ambitious, modern Indian businesses — one platform for growth across every channel that matters.",
  mission:
    "Build the systems, tools and services that let businesses attract attention, capture leads, convert customers and grow — with less manual effort and more clarity at every step.",
  approach:
    "Every part feeds the next. Digital creates attention. Technology turns that attention into systems. Products and services deliver the real-world value customers came for.",
  valuesLead:
    "Reliability, transparency and craftsmanship — every division held to the same standard, whether it's a website or a borewell installation.",
  values: [
    { title: "Reliability", body: "We do what we said, when we said. Timelines and scope are written down before work starts." },
    { title: "Transparency", body: "Clear pricing, honest reporting, and straight answers when something isn't working." },
    { title: "Craftsmanship", body: "Pixel or pipe, the finish matters. We build things to last, not just to launch." },
    { title: "Connection", body: "Every service is designed to plug into the next one." },
    { title: "Ownership", body: "One team owns the outcome — no passing the blame between vendors." },
  ],
  process: [
    { title: "Listen", body: "We start with where your business is today and where it needs to be." },
    { title: "Map", body: "We design the system — which channels, tools and services move you forward." },
    { title: "Build", body: "Our teams execute, online and on the ground." },
    { title: "Measure", body: "You see what's working through clear reports and dashboards." },
    { title: "Grow", body: "We refine, expand and connect new capabilities as you scale." },
  ],
  cta: { heading: "Work with one team that sees the whole picture.", label: "Start a Conversation" } as Cta,
};

/* ── Division pages ────────────────────────────────────────────────────── */

export type ServiceDetail = {
  /** Matches a business slug in site.ts. */
  slug: string;
  name: string;
  hook: string;
  overview: string;
  /** "What's included", or several audiences each with their own list (the marketplace). */
  included: { title?: string; items: string[] }[];
  audience?: string;
  steps: string[];
  /** A short assurance shown under the steps. */
  note?: string;
  cta: string;
};

export type DivisionContent = {
  /** The page's H1 — what it offers and where, for search. */
  h1: string;
  tagline: string;
  heading: [string, string];
  intro: string;
  services: ServiceDetail[];
  cta: Cta;
};

const included = (...items: string[]) => [{ items }];

export const divisionPages: Record<DivisionId, DivisionContent> = {
  digital: {
    h1: "Digital marketing, websites & SEO in Bengaluru",
    tagline: "Creates attention",
    heading: ["Every channel that", "creates attention."],
    intro:
      "Marketing, brand, websites, SEO, SEM, social media and lead generation — run as one growth system, not eight separate vendors. Everything is planned together, tracked together and reported in one place.",
    services: [
      {
        slug: "digital-marketing",
        name: "Digital Marketing",
        hook: "A connected digital growth system, not a bundle of disconnected campaigns.",
        overview:
          "We plan, run and report your marketing as one system. Strategy sets the direction, every channel pulls the same way, and you get one monthly report that shows what each rupee did.",
        included: included(
          "Growth strategy and channel plan",
          "Campaign planning and execution",
          "Creative and copy",
          "Search and social coordination",
          "Monthly performance reporting",
        ),
        audience: "Businesses spending on marketing without a clear picture of what's working.",
        steps: ["Audit", "Strategy", "Launch", "Monthly review and optimisation"],
        cta: "Build My Growth System",
      },
      {
        slug: "logo-design",
        name: "Logo Design",
        hook: "The smallest unit of a brand system built to last.",
        overview:
          "A logo has to work on a signboard, an Instagram avatar, a vehicle wrap and an invoice. We design identity systems that hold up everywhere — not just a mark that looks good once.",
        included: included(
          "Logo concepts and refinement",
          "Colour palette and typography",
          "Logo variations (horizontal, stacked, icon)",
          "Brand guidelines sheet",
          "Business card, letterhead and social kit",
        ),
        audience: "New businesses, and established ones whose brand has outgrown its look.",
        steps: ["Brand discovery", "Concepts", "Refinement", "Final files and guidelines"],
        cta: "Start My Brand Identity",
      },
      {
        slug: "web-development",
        name: "Web Development",
        hook: "Websites engineered to convert, not just to look good.",
        overview:
          "Fast, mobile-first websites built around how your customers actually buy. Every page has a job, every form is tracked, and the site is maintained after launch.",
        included: included(
          "Corporate websites",
          "Landing pages",
          "E-commerce stores",
          "Web applications",
          "Hosting, maintenance and updates",
          "SEO-ready build",
        ),
        audience: "Businesses whose website looks fine but doesn't bring in enquiries.",
        steps: ["Discovery", "Sitemap and design", "Build", "Launch", "Ongoing care"],
        cta: "Start My Website",
      },
      {
        slug: "seo",
        name: "SEO",
        hook: "Search visibility built on fundamentals.",
        overview:
          "We fix what search engines see, write what customers search for, and measure progress every month. No shortcuts, no ranking promises — just compounding visibility.",
        included: included(
          "Technical SEO audit and fixes",
          "On-page optimisation",
          "Local SEO and Google Business Profile",
          "Content planning and writing",
          "Monthly ranking and traffic reports",
        ),
        audience: "Businesses that want customers to find them on Google without paying for every click.",
        steps: ["Audit", "Fix", "Content", "Track and improve"],
        cta: "Improve My Rankings",
      },
      {
        slug: "sem",
        name: "SEM",
        hook: "Every rupee of ad spend tracked back to a result.",
        overview:
          "Google Ads campaigns built around leads and sales, not impressions. Each campaign is tied to conversion tracking, so you know exactly what you're paying for.",
        included: included(
          "Google Search campaigns",
          "Display campaigns",
          "Remarketing",
          "Keyword and audience research",
          "Conversion tracking setup",
          "Weekly optimisation",
        ),
        audience: "Businesses that need enquiries now, with spend they can see and control.",
        steps: ["Research", "Campaign build", "Launch", "Optimise weekly"],
        cta: "Launch My Campaign",
      },
      {
        slug: "social-media-management",
        name: "Social Media Management",
        hook: "Consistent, on-brand presence across platforms.",
        overview:
          "A monthly content calendar, designed creatives, scheduled publishing and active community management — handled by one team so your brand looks and sounds the same everywhere.",
        included: included(
          "Content planning",
          "Creative design",
          "Publishing and scheduling",
          "Community management",
          "Monthly insights report",
        ),
        audience: "Businesses that know social matters but don't have the time to show up every day.",
        steps: ["Brand brief", "Monthly calendar", "Create and publish", "Review"],
        cta: "Grow My Social Presence",
      },
      {
        slug: "instagram-marketing",
        name: "Instagram Marketing",
        hook: "A content engine for Instagram — strategy first, format second, consistency always.",
        overview:
          "Instagram rewards brands that post with purpose. We plan the strategy, produce Reels, posts and Stories, and use the numbers to sharpen what works.",
        included: included(
          "Instagram strategy",
          "Reels production",
          "Posts and carousels",
          "Stories",
          "Profile optimisation",
          "Growth and engagement tracking",
        ),
        audience: "Consumer brands, personal brands and local businesses selling through Instagram.",
        steps: ["Profile audit", "Content strategy", "Production", "Publish and refine"],
        cta: "Grow My Instagram",
      },
      {
        slug: "lead-generation",
        name: "Lead Generation",
        hook: "Traffic → Leads → Qualification → Follow-up → Conversion.",
        overview:
          "One predictable pipeline, not a one-off campaign. We bring in leads, filter out the time-wasters and hand your team enquiries ready to close.",
        included: included(
          "B2B lead generation",
          "Local lead generation",
          "Campaign-based leads",
          "Lead qualification",
          "CRM and WhatsApp follow-up setup",
        ),
        audience: "Sales teams and owners who need a steady flow of qualified enquiries every month.",
        steps: ["Define ideal customer", "Attract", "Qualify", "Hand off and follow up"],
        cta: "Build My Pipeline",
      },
    ],
    cta: { heading: "Ready to be seen by the right people?", label: "Start a Conversation" },
  },

  technology: {
    h1: "SaaS, AI automation & WhatsApp Business solutions",
    tagline: "Builds the systems",
    heading: ["Systems that turn", "attention into revenue."],
    intro:
      "SaaS, AI automation, WhatsApp Business and data solutions — the technology layer that captures every lead, follows up without fail and shows you the numbers that matter.",
    services: [
      {
        slug: "saas-products",
        name: "SaaS Products",
        hook: "A modular SaaS ecosystem — start with one module, add more as you grow.",
        overview:
          "Business software that fits Indian SMEs. Begin with what you need today — a CRM, bookings or billing — and switch on more modules without changing platforms.",
        included: included(
          "CRM and lead management",
          "Booking and appointment tools",
          "Billing and invoicing",
          "Inventory and order tracking",
          "Staff and task management",
          "Reports dashboard",
        ),
        audience: "Growing businesses still running on spreadsheets, notebooks and WhatsApp groups.",
        steps: ["Demo", "Pick modules", "Setup and data migration", "Training and support"],
        cta: "Request Demo",
      },
      {
        slug: "ai-automation",
        name: "AI Automation",
        hook: "What should never require a human to repeat it manually?",
        overview:
          "We find the repetitive work in your business — replying to enquiries, sending quotes, updating sheets, chasing payments — and automate it with AI and workflow tools.",
        included: included(
          "Process audit",
          "AI chatbots and assistants",
          "Workflow automation",
          "Automated follow-ups and reminders",
          "Document and data processing",
          "Integration with your existing tools",
        ),
        audience: "Teams losing hours every week to copy-paste work.",
        steps: ["Map the workflow", "Design the automation", "Build and test", "Go live and monitor"],
        cta: "Automate My Business",
      },
      {
        slug: "whatsapp-business-solutions",
        name: "WhatsApp Business Solutions",
        hook: "The channel your customers already use, turned into a sales and support system.",
        overview:
          "Official WhatsApp Business API setup with catalogues, auto-replies, broadcast campaigns and team inboxes — so no enquiry is missed and every customer gets a fast reply.",
        included: included(
          "WhatsApp Business API setup",
          "Green tick verification support",
          "Auto-replies and chatbots",
          "Broadcast campaigns",
          "Shared team inbox",
          "CRM integration",
        ),
        audience: "Businesses whose customers already message them — and whose replies are slow or scattered.",
        steps: ["Account setup", "Flows and templates", "Team onboarding", "Campaigns and optimisation"],
        cta: "Set Up WhatsApp Business",
      },
      {
        slug: "data-solutions",
        name: "Data Solutions",
        hook: "Data that gets looked at.",
        overview:
          "We clean, organise and connect the data spread across your sheets, tools and platforms, then surface it in a dashboard people actually open.",
        included: included(
          "Data cleaning and structuring",
          "Database setup",
          "Custom dashboards",
          "Sales and marketing analytics",
          "Automated reports",
          "Data integration across tools",
        ),
        audience: "Owners who make decisions on gut feel because the numbers are too hard to get.",
        steps: ["Data audit", "Clean and connect", "Dashboard build", "Ongoing reporting"],
        cta: "Understand My Data",
      },
    ],
    cta: { heading: "Stop doing it by hand.", label: "Request a Demo" },
  },

  products: {
    h1: "Business data products & a three-sided marketplace",
    tagline: "Packaged value",
    heading: ["Products built from", "what we know."],
    intro:
      "Years of work across industries, packaged into products businesses can use straight away — research-backed data and a marketplace that connects customers, businesses and service providers.",
    services: [
      {
        slug: "digital-data-products",
        name: "Digital Data Products",
        hook: "Datasets and research, packaged as products.",
        overview:
          "Ready-to-use business datasets, market research and industry reports — sourced lawfully, verified, and delivered in formats your team can work with on day one. Privacy-conscious practice sits at the core of every product.",
        included: included(
          "Industry and business directories",
          "Market research reports",
          "Sector-wise datasets",
          "Custom data research",
          "Regular updates and refreshes",
        ),
        audience: "Sales teams, marketers, researchers and founders who need reliable data without months of groundwork.",
        steps: ["Tell us what you need", "Sample review", "Delivery in Excel/CSV", "Updates on request"],
        note: "All data is sourced and handled in line with applicable Indian data protection law.",
        cta: "Explore Data Products",
      },
      {
        slug: "business-marketplace",
        name: "Business Marketplace",
        hook: "One platform, three sides.",
        overview:
          "Customers who need something, businesses who provide it, and the service providers who deliver it — all in one place. Customers find verified providers fast. Businesses get qualified demand. Service partners get steady work.",
        included: [
          {
            title: "For customers",
            items: ["Find verified businesses and services", "Compare and enquire in one place", "Track your requests"],
          },
          {
            title: "For businesses",
            items: ["List your products and services", "Receive qualified enquiries", "Build your reputation with reviews"],
          },
          {
            title: "For service providers",
            items: ["Get matched with jobs in your area", "Manage bookings", "Get paid on time"],
          },
        ],
        steps: ["Post a need", "Get matched", "Connect and complete", "Rate and review"],
        cta: "Explore the Marketplace",
      },
    ],
    cta: { heading: "Need data or demand? Start here.", label: "Start a Conversation" },
  },

  services: {
    h1: "Water, security, travel, interiors & startup services in Bengaluru",
    tagline: "Real-world value",
    heading: ["Services that deliver", "real-world value."],
    intro:
      "Water, security, travel, spaces and startups — the on-the-ground services businesses and homes depend on, delivered by teams that answer the phone and turn up on time.",
    services: [
      {
        slug: "water-pumps",
        name: "Water Pumps",
        hook: "Dependable water infrastructure — supplied, installed and maintained by one team.",
        overview:
          "The right pump, sized for your building, installed properly and serviced before it fails. For homes, apartments, farms and commercial sites across Bengaluru.",
        included: included(
          "Submersible, openwell and booster pumps",
          "Pressure pumps and control panels",
          "Installation and commissioning",
          "Repairs and rewinding",
          "Annual maintenance contracts",
        ),
        audience: "Homeowners, apartment associations, farms, builders and commercial properties.",
        steps: ["Site visit", "Pump recommendation", "Installation", "AMC and support"],
        cta: "Enquire About Water Pumps",
      },
      {
        slug: "borewell-services",
        name: "Borewell Services",
        hook: "From site assessment to long-term maintenance — handled end to end.",
        overview:
          "One team for every stage of your borewell: assessment, drilling, casing, pump fitting, flushing and yield revival. Clear quotes up front, no surprises on depth or cost.",
        included: included(
          "Groundwater site assessment",
          "Borewell drilling",
          "Casing and pump installation",
          "Borewell flushing and cleaning",
          "Yield revival and recharge",
          "Maintenance and repairs",
        ),
        audience: "Homes, layouts, farms and commercial sites needing a reliable water source.",
        steps: ["Site survey", "Quote", "Drilling and installation", "Ongoing maintenance"],
        cta: "Enquire About Borewells",
      },
      {
        slug: "cctv-security",
        name: "CCTV & Security",
        hook: "Surveillance designed around how a space is actually used.",
        overview:
          "We walk the site, find the blind spots, and design a camera layout that covers what matters. HD cameras, remote viewing on your phone, and maintenance that keeps it all recording.",
        included: included(
          "Site security survey",
          "HD and IP cameras",
          "DVR/NVR setup and storage",
          "Mobile remote viewing",
          "Video door phones and access control",
          "Maintenance and AMC",
        ),
        audience: "Homes, apartments, shops, offices, warehouses and schools.",
        steps: ["Free site survey", "Camera plan and quote", "Installation", "Training and AMC"],
        cta: "Secure My Property",
      },
      {
        slug: "travels",
        name: "Travels",
        hook: "Straightforward travel and transportation — enquire, book, go.",
        overview:
          "Cars, tempo travellers and buses for airport runs, outstation trips, corporate travel, weddings and tours. Clean vehicles, verified drivers and transparent fares.",
        included: included(
          "Airport pickup and drop",
          "Outstation and one-way trips",
          "Corporate employee transport",
          "Wedding and event transport",
          "Tour packages",
          "Sedans, SUVs, tempo travellers and buses",
        ),
        audience: "Families, corporates, event planners and travel groups.",
        steps: ["Enquire", "Get a quote", "Confirm booking", "Travel"],
        cta: "Enquire About Travel",
      },
      {
        slug: "interiors-architecture",
        name: "Interiors & Architecture",
        hook: "Two disciplines, one project team.",
        overview:
          "Architecture and interiors planned together from day one, so structure, space and finish all fit. One team, one timeline, one point of contact from first sketch to handover.",
        included: included(
          "Architectural design and planning",
          "Interior design",
          "Space planning",
          "3D visualisation",
          "Modular kitchens and wardrobes",
          "Turnkey execution and project management",
        ),
        audience: "Homeowners, offices, retail stores, restaurants and builders.",
        steps: ["Consultation", "Concept and 3D design", "Execution", "Handover"],
        cta: "Start My Project",
      },
      {
        slug: "startup-consulting",
        name: "Startup Management Consulting",
        hook: "End-to-end startup support — from incorporation to funding.",
        overview:
          "We help founders set up the right structure, stay compliant and get investment-ready, so they can spend their time building the business instead of chasing paperwork.",
        included: included(
          "Company registration (Pvt Ltd, LLP, OPC)",
          "GST, MSME and Startup India registration",
          "Ongoing compliance and filings",
          "Pitch deck and business plan",
          "Funding and investor readiness",
          "Legal advisory and agreements",
        ),
        audience: "First-time founders, early-stage startups and small businesses formalising their setup.",
        steps: ["Founder consultation", "Setup and registration", "Compliance calendar", "Growth and funding support"],
        cta: "Start My Startup Journey",
      },
    ],
    cta: { heading: "Need it done properly? We'll be there.", label: "Request a Site Visit" },
  },
};

/* ── Contact ───────────────────────────────────────────────────────────── */

export const contactPage = {
  intro: "Tell us where you are. We'll show you the next step — usually within one working day.",
  hours: "Monday–Saturday, 9:30 AM – 6:30 PM",
  faq: [
    { q: "How soon will you respond?", a: "Within one working day, Monday to Saturday." },
    {
      q: "Do you work outside Bengaluru?",
      a: "Digital, technology and product services are delivered across India. On-ground services cover Bengaluru and nearby areas.",
    },
    {
      q: "Can I combine services?",
      a: "Yes — that's how we work best. One team can handle your website, ads, WhatsApp and more.",
    },
    { q: "Is the first consultation free?", a: "Yes. Tell us what you need and we'll map the next step with you." },
  ],
};

/* ── Positioning ───────────────────────────────────────────────────────── */

/** The four divisions as one chain (doc › Division strip): each page shows where it sits in it. */
export const systemChain: { id: DivisionId; role: string; line: string }[] = [
  { id: "digital", role: "Creates attention", line: "Marketing, brand, websites, SEO, SEM, social and lead generation." },
  { id: "technology", role: "Builds the systems", line: "SaaS, AI automation, WhatsApp Business and data solutions." },
  { id: "products", role: "Packages the value", line: "Digital data products and a three-sided business marketplace." },
  { id: "services", role: "Delivers on the ground", line: "Water pumps, borewells, CCTV, travel, interiors and startup consulting." },
];

/** About: why one partner beats five vendors (doc › Why Sathya). */
export const onePartner = [
  { title: "One team, one brief", body: "No re-explaining your business to a new agency every quarter." },
  { title: "Connected by default", body: "Your website, ads, WhatsApp and CRM are built to talk to each other." },
  { title: "Measured end to end", body: "Every rupee is tracked from first click to closed sale." },
  { title: "Online and on the ground", body: "From Google Ads to borewell installs — the same standard of craft." },
];
