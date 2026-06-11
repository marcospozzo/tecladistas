import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { cookieName } from "@/utils/utils";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/entrar");

  const cookieStore = await cookies();
  const cookie = cookieStore.get(cookieName);
  if (!cookie) redirect("/");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`, {
    headers: { cookie: `${cookie.name}=${cookie.value}` },
    cache: "no-store",
  });
  if (!res.ok) redirect("/");

  return <>{children}</>;
}
