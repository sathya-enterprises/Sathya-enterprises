import { PageTransition } from "@/components/layout/PageTransition";

/** Templates remount on every navigation, giving each page a fresh enter/exit pair. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
