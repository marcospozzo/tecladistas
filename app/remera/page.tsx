"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RemerasPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/partituras/remera");
  }, []);
}
