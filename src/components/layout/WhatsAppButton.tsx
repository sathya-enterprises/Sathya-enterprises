import { contact, whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "@/components/layout/SocialIcon";

/**
 * Floating round WhatsApp icon button, bottom right. Opens a chat with the business number with a
 * first message ready to send. It arrives after the
 * opening curtain (.wa-in in globals.css) and sits under the cookie banner and the mobile menu.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp, ${contact.whatsapp.value}`}
      className="wa-in fixed bottom-4 right-4 z-105 grid h-14 w-14 place-items-center rounded-full bg-red text-ivory shadow-[0_16px_36px_-12px_rgb(158_16_38/0.7)] ring-4 ring-gold/60 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-red-deep active:scale-95 md:bottom-6 md:right-6 md:h-16 md:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
}
