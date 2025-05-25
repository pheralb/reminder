import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import type { OutletContext } from "@/types/outletContext";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

// Styles:
import "@/styles/globals.css";
import { cn } from "@/utils/cn";

// Theme:
import {
  useTheme,
  ThemeProvider,
  PreventFlashOnWrongTheme,
  Theme,
} from "remix-themes";
import clsx from "clsx";
import { themeSessionResolver } from "@/sessions.server";

// Clerk:
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";

// Global SSR loader:
export const loader = async (args: Route.LoaderArgs) => {
  const { getTheme } = await themeSessionResolver(args.request);
  return rootAuthLoader(args, ({ request }) => {
    const { sessionId, userId } = request.auth;
    return {
      theme: getTheme(),
      userId: userId,
      sessionId: sessionId,
    };
  });
};

// Global app layout component:
function App({ children }: { children: ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html
      lang="en"
      className={clsx(theme)}
      style={{ colorScheme: clsx(theme) }}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      </head>
      <body
        className={cn(
          "bg-zinc-50 dark:bg-zinc-900",
          "text-zinc-900 dark:text-zinc-50",
          "selection:bg-zinc-300 selection:text-zinc-900",
          "transition-none",
          "font-sans antialiased",
        )}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// App with providers:
export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider
      specifiedTheme={data.theme}
      themeAction="/action/set-theme"
      disableTransitionOnThemeChange
    >
      <ClerkProvider
        loaderData={data}
        signUpFallbackRedirectUrl="/"
        signInFallbackRedirectUrl="/"
        appearance={{
          baseTheme: data.theme === Theme.DARK ? dark : undefined,
        }}
      >
        <App>
          <Outlet
            context={
              {
                userId: data.userId,
                sessionId: data.sessionId,
              } satisfies OutletContext
            }
          />
        </App>
      </ClerkProvider>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
