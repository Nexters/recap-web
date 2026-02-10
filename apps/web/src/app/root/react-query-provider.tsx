"use client";

import React from "react";
import { ReactQueryProvider } from "@recap/react-query";

export default function ReactQueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
