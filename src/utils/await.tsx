import { Fragment, Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type AwaitProps<T> =
  | {
      promise: Promise<T>;
      children: (data: T) => ReactNode;
      fallback?: ReactNode;
      errorComponent?: ReactNode | null;
    }
  | {
      promise?: undefined;
      children: ReactNode;
      fallback?: ReactNode;
      errorComponent?: ReactNode | null;
    };

export function Await<T>({
  promise,
  children,
  fallback = null,
  errorComponent,
}: AwaitProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const MaybeErrorBoundary = errorComponent ? ErrorBoundary : Fragment;

  return (
    <MaybeErrorBoundary fallback={<>{errorComponent}</>}>
      <Suspense fallback={<>{fallback}</>}>
        {promise ? (
          <AwaitResult promise={promise}>
            {(data) => children(data)}
          </AwaitResult>
        ) : (
          <>{children}</>
        )}
      </Suspense>
    </MaybeErrorBoundary>
  );
}

type AwaitResultProps<T> = {
  promise: Promise<T>;
  children: (data: T) => ReactNode;
};

async function AwaitResult<T>({ promise, children }: AwaitResultProps<T>) {
  const data = await promise;
  return <>{children(data)}</>;
}
