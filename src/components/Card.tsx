import React, { ReactNode } from "react";
import { Card as SCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <SCard className="flex flex-col py-4 rounded-lg bg-gray-800">
      <CardHeader>
        <CardTitle><h2 className="text-lg font-semibold">{title}</h2></CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </SCard>
  );
}
