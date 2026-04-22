import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel admina</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/wydawnictwa">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Wydawnictwa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Zarządzaj listą wydawnictw i ich danymi.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
