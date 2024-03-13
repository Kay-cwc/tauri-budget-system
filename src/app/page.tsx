'use client';

import AppBreadcrumb from "@/components/AppBreadcrumb";
import BaseContainer from "@/layout/BaseContainer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.replace('/clients');
    }
  }, [router])

  return (
    <BaseContainer>
      <div>
        <AppBreadcrumb />
      </div>
    </BaseContainer>
  )
}
