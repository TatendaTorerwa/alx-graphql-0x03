import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";
import ErrorBoundary from "@/components/ErrorBoundary"; // Import ErrorBoundary

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary> {/* Wrap the app in ErrorBoundary */}
        <Component {...pageProps} />
      </ErrorBoundary>
    </ApolloProvider>
  );
}
