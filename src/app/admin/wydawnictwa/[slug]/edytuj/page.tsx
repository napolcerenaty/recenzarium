import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublisherBySlug, getPublishersForSelect } from "@/lib/publishers";
import { editPublisher } from "@/actions/publishers";
import { PublisherForm } from "@/components/admin/publisher-form";

type Props = { params: Promise<{ slug: string }> };

export default async function EditPublisherPage({ params }: Props) {
  const { slug } = await params;
  const [publisher, allPublishers] = await Promise.all([
    getPublisherBySlug(slug),
    getPublishersForSelect(),
  ]);

  if (!publisher) notFound();

  // Bind publisher id to the action
  const action = editPublisher.bind(null, publisher.id);

  // Exclude self from parent options
  const parentOptions = allPublishers.filter((p) => p.id !== publisher.id);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/admin/wydawnictwa" className="hover:text-foreground">Wydawnictwa</Link>
        <span>/</span>
        <span>{publisher.name}</span>
        <span>/</span>
        <span>Edytuj</span>
      </div>
      <h1 className="text-xl font-semibold mb-6">Edytuj: {publisher.name}</h1>
      <PublisherForm
        action={action}
        publishers={parentOptions}
        defaultValues={publisher}
        cancelHref="/admin/wydawnictwa"
      />
    </div>
  );
}
