import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Link href="projects">{">"} Projects</Link>
    </div>
  );
}
