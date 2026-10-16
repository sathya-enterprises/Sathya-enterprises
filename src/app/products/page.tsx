import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { meta } from "@/content/pages";
import { DivisionPage } from "@/components/division/DivisionPage";

export const metadata: Metadata = pageMeta({ ...meta.products, path: "/products", absoluteTitle: true });

export default function ProductsPage() {
  return <DivisionPage id="products" />;
}
