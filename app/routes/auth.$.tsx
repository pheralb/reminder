import { cn } from "@/utils/cn";
import Logo from "@/ui/logos/logo";
import FooterNav from "@/components/layout/footerNav";
import { SignIn } from "@clerk/react-router";

const AuthPage = () => {
  return (
    <>
      <main className={cn("flex h-screen items-center justify-center")}>
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-3 rounded-xl border border-zinc-200 px-3 py-4 dark:border-zinc-800",
            "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 delay-500 duration-500",
          )}
        >
          <Logo width={45} height={45} />
          <SignIn />
        </div>
      </main>
      <FooterNav />
    </>
  );
};

export default AuthPage;
