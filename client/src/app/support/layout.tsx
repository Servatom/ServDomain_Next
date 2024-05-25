import Footer from "@/components/common/Footer";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col h-full">
      {children}
      <Footer />
    </div>
  );
}
