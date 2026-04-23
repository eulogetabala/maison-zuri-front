'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

import { ApolloProvider } from '@apollo/client/react';
import client from '@/lib/apollo-client';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ApolloProvider>
  );
}
