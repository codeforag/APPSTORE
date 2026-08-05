"use client";

import { AppDetailsPage, sampleAppDetails } from "@/components/app-details-page";
import { useRouter } from "next/navigation";

export default function AppDetailsRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  // In a real app, you would fetch app data based on params.id
  // For now, we use sample data
  const app = {
    ...sampleAppDetails,
    id: "vidmate-demo",
  };

  const handleDownload = (version?: string) => {
    console.log(`Downloading ${app.name} version ${version || app.version}`);
    // In a real implementation, this would trigger actual file download
    // or redirect to download URL
    alert(`📥 Download initiated!\n\nApp: ${app.name}\nVersion: ${version || app.version}\nSize: ${app.size}\n\nYour download will start shortly...`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen">
      <AppDetailsPage 
        app={app} 
        onDownload={handleDownload}
        onBack={handleBack}
      />
    </main>
  );
}
