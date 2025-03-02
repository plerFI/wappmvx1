import Image from "next/image";

export default function ImagePage() {
  return (
    <main className="flex items-center justify-center h-screen bg-white">
      <Image src="/AOZ.png" alt="Logo" width={600} height={400} />
    </main>
  );
}