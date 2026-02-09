"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { createQueryClient, type CreateQueryClientOptions } from "./client";

type ReactQueryProviderProps = {
  children: React.ReactNode;
  options?: CreateQueryClientOptions;
};

export function ReactQueryProvider({
  children,
  options,
}: ReactQueryProviderProps) {
  const [client] = React.useState(() => createQueryClient(options));

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
