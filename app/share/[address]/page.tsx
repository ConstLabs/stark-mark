'use client';
import { title } from "@/components/primitives";
import { Marks } from "../../marks/components/common";
import { useParams } from "next/navigation";
import { shortenAddress } from "@/utils/common";
import { cn } from "@nextui-org/react";

export default function BlogPage() {
  const { address } = useParams<{ address: string }>();
  return (
    <div>
      <h1 className={cn(title({ color: "pink" }), 'lg:text-3xl')}>Marks from {shortenAddress(address)}</h1>
      <div>
        <Marks address={address} share />
      </div>
    </div>
  );
}
