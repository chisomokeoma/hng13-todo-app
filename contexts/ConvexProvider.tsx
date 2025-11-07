import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "";

let convex: ConvexReactClient | null = null;

if (convexUrl) {
  convex = new ConvexReactClient(convexUrl);
}

export function ConvexProviderWrapper({ children }: { children: ReactNode }) {
  if (!convex) {
    console.warn(
      "Convex URL not configured. Please set EXPO_PUBLIC_CONVEX_URL in your environment variables."
    );
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
