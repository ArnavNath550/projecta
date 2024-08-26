import Image from "next/image";
import Sidebar from "./components/sidebar";
import AppContent from "./components/app-content";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-row">
      <Sidebar />
      <AppContent />
    </div>
  );
}
