import Link from "next/link";
import { getPublishersForSelect } from "@/lib/publishers";
import { NewPublisherForm } from "./form";

export default async function NewPublisherPage() {
  const publishers = await getPublishersForSelect();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/admin/wydawnictwa" className="hover:text-foreground">Wydawnictwa</Link>
        <span>/</span>
        <span>Nowe</span>
      </div>
      <h1 className="text-xl font-semibold mb-6">Dodaj wydawnictwo</h1>
      <NewPublisherForm publishers={publishers} />
    </div>
  );
}
