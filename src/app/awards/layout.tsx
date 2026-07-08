import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards & Achievements",
  description:
    "Awards and recognitions received by Cephas Medical Pvt. Ltd., the parent company of Cephas Safe Tech. Including international manufacturing partnerships, government recognition, and media features.",
  keywords: [
    "Cephas awards",
    "Cephas Medical achievements",
    "Hollister outstanding business partner",
    "ET MSME awards",
    "PPE manufacturer awards India",
    "chemical gloves manufacturer recognition",
  ],
};

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
