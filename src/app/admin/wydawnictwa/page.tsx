import Link from "next/link";
import { getAllPublishers } from "@/lib/publishers";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleActiveButton } from "./toggle-active-button";

export default async function AdminPublishersPage() {
  const publishers = await getAllPublishers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Wydawnictwa</h1>
        <Link
          href="/admin/wydawnictwa/nowe"
          className="inline-flex items-center h-8 rounded-lg bg-primary text-primary-foreground px-3 text-sm font-medium hover:bg-primary/80 transition-colors"
        >
          + Dodaj wydawnictwo
        </Link>
      </div>

      {publishers.length === 0 ? (
        <p className="text-muted-foreground text-sm">Brak wydawnictw. Dodaj pierwsze.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publishers.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.slug}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.email || "—"}</TableCell>
                <TableCell>
                  <Badge variant={p.isActive ? "default" : "secondary"}>
                    {p.isActive ? "Aktywne" : "Nieaktywne"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/wydawnictwa/${p.slug}/edytuj`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Edytuj
                    </Link>
                    <ToggleActiveButton id={p.id} isActive={p.isActive} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
