import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glove Selection Guide",
  description:
    "Find the right safety glove for your industry and hazard profile. Interactive selection wizard by Cephas Safe Tech.",
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
