import type { StaticImageData } from "next/image";
import digitalPhoto from "@/assets/photos/digital.webp";
import technologyPhoto from "@/assets/photos/technology.webp";
import productsPhoto from "@/assets/photos/products.webp";
import servicesPhoto from "@/assets/photos/services.webp";
import meetingPhoto from "@/assets/photos/meeting.webp";

/** A heading and its paragraphs; a post body is a run of these. */
export type BlogSection = { heading?: string; paragraphs: string[]; points?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, newest first in `posts`. */
  date: string;
  readMinutes: number;
  category: "Digital" | "Technology" | "Products" | "Services" | "Growth";
  image: StaticImageData;
  body: BlogSection[];
};

/**
 * Blog posts, newest first. Starter articles written for the launch — edit, replace or add to them;
 * the blog index, each post page, the home teaser and the sitemap all read from this list.
 */
export const posts: BlogPost[] = [
  {
    slug: "one-partner-vs-five-vendors",
    title: "Why one growth partner beats five separate vendors",
    excerpt:
      "An agency, a web developer, an ads freelancer and a contractor — each good on their own, and still the business stalls. Here's why the handoffs cost more than the work.",
    date: "2026-10-10",
    readMinutes: 5,
    category: "Growth",
    image: meetingPhoto,
    body: [
      {
        paragraphs: [
          "Most growing businesses end up with a patchwork: one agency for social media, a freelancer for ads, someone else for the website and a different team again for operations. Each vendor reports their own numbers, and nobody owns the result.",
        ],
      },
      {
        heading: "The cost hides in the handoffs",
        paragraphs: [
          "When the ads team sends traffic to a landing page the web team built last year, and the leads land in a sheet nobody follows up, every vendor can say they did their job — and the business still loses the customer.",
        ],
        points: [
          "Briefs repeated to every vendor, every quarter",
          "Reports that can't be compared, so spend is guessed rather than steered",
          "Leads that fall between marketing and sales with no one accountable",
        ],
      },
      {
        heading: "What one connected team changes",
        paragraphs: [
          "A single partner plans attention, conversion and delivery together. The same team that runs the campaign builds the page, wires the follow-up on WhatsApp and reads the numbers end to end — so fixes happen where the leak actually is.",
          "That's the idea behind Sathya Enterprises: digital growth, technology, products and services under one roof, so you brief once and grow from there.",
        ],
      },
    ],
  },
  {
    slug: "whatsapp-business-api-lead-follow-up",
    title: "Using the WhatsApp Business API to stop losing leads",
    excerpt:
      "Most enquiries go cold within an hour. Automated, personal follow-up on the app your customers already use can change that — here's how to set it up well.",
    date: "2026-09-26",
    readMinutes: 6,
    category: "Technology",
    image: technologyPhoto,
    body: [
      {
        paragraphs: [
          "In India, your customers already live on WhatsApp. Yet many businesses still answer enquiries by email or a missed-call callback hours later — long after the customer has messaged a competitor.",
        ],
      },
      {
        heading: "What the API adds over the regular app",
        paragraphs: ["The WhatsApp Business API connects WhatsApp to your systems, so conversations can be routed, automated and measured."],
        points: [
          "Instant replies to every enquiry, day or night",
          "Approved templates for reminders, confirmations and offers",
          "Shared inbox so your whole team can respond from one number",
          "Lead details flowing straight into your CRM or dashboard",
        ],
      },
      {
        heading: "Keep it personal",
        paragraphs: [
          "Automation should answer fast, not sound like a robot. Use the first message to acknowledge the enquiry and ask one useful question, then hand over to a person with the context already captured.",
          "Done well, the API turns WhatsApp from a busy personal inbox into a reliable sales channel.",
        ],
      },
    ],
  },
  {
    slug: "local-seo-checklist-bengaluru",
    title: "A local SEO checklist for Bengaluru businesses",
    excerpt:
      "Showing up when someone nearby searches for what you sell is the cheapest growth there is. Ten practical steps to get your business found on Google.",
    date: "2026-09-12",
    readMinutes: 7,
    category: "Digital",
    image: digitalPhoto,
    body: [
      {
        paragraphs: [
          "When someone searches \"near me\", Google decides in a fraction of a second which three local businesses to show. Being one of them rarely needs a big budget — it needs consistency.",
        ],
      },
      {
        heading: "Get the basics right",
        paragraphs: ["Start with your Google Business Profile, then make sure the rest of the web agrees with it."],
        points: [
          "Claim and verify your Google Business Profile",
          "Use the same name, address and phone number everywhere",
          "Pick the most specific primary category you can",
          "Add real photos of your premises, team and work",
          "Write service pages that name the areas you serve",
        ],
      },
      {
        heading: "Keep it alive",
        paragraphs: [
          "Ask every happy customer for a review and reply to all of them, good or bad. Post updates and offers on your profile. Track calls, direction requests and website visits each month, and keep improving what moves those numbers.",
        ],
      },
    ],
  },
  {
    slug: "startup-compliance-first-year",
    title: "Startup compliance in your first year, made simple",
    excerpt:
      "Incorporation is only the beginning. The filings, registrations and deadlines that trip up first-time founders — and a calendar to stay ahead of them.",
    date: "2026-08-28",
    readMinutes: 6,
    category: "Services",
    image: servicesPhoto,
    body: [
      {
        paragraphs: [
          "Most founders expect the paperwork to end once the company is registered. In reality the first year brings a steady stream of filings — and missed deadlines bring penalties that hurt a young business.",
        ],
      },
      {
        heading: "The first-year essentials",
        paragraphs: ["Exact requirements depend on your structure and turnover, but most new businesses will need to plan for:"],
        points: [
          "GST registration and regular returns, once you cross the threshold or sell interstate",
          "Professional tax and shop & establishment registration where applicable",
          "Statutory auditor appointment and annual filings with the registrar",
          "TDS deductions and returns once you pay salaries or vendors",
        ],
      },
      {
        heading: "Build a compliance calendar",
        paragraphs: [
          "Put every due date in one shared calendar with reminders a week ahead, and keep invoices and bank statements organised monthly rather than in a year-end rush. It's simple, and it keeps you investment-ready.",
          "This is general guidance, not legal or tax advice — talk to us or your chartered accountant about your specific case.",
        ],
      },
    ],
  },
  {
    slug: "using-business-data-to-find-customers",
    title: "Using business data to find your next customers",
    excerpt:
      "Cold outreach works when the list is right. How lawfully sourced business data and a little research can point your sales team at the people most likely to buy.",
    date: "2026-08-14",
    readMinutes: 5,
    category: "Products",
    image: productsPhoto,
    body: [
      {
        paragraphs: [
          "Sales teams waste most of their time on prospects who were never going to buy. Good data doesn't replace a good pitch — it makes sure the pitch reaches the right desk.",
        ],
      },
      {
        heading: "Start from your best customers",
        paragraphs: [
          "Look at the customers who pay well and stay longest. What industry are they in, how big are they, where are they based? That profile is your filter.",
        ],
      },
      {
        heading: "Choose data you can trust",
        paragraphs: ["A smaller, accurate list beats a large, stale one every time."],
        points: [
          "Lawfully sourced, with a clear record of where it came from",
          "Recently verified contact details",
          "Fields that match your filter: industry, size, location",
          "Respect opt-outs and local data-protection rules",
        ],
      },
    ],
  },
];

export const postHref = (p: BlogPost) => `/blogs/${p.slug}`;

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** "12 Oct 2026" — fixed locale and time zone so server and browser agree. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
