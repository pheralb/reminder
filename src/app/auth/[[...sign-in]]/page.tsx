import FooterNav from "@/components/footerNav";
import Logo from "@/ui/logos/logo";
import { cn } from "@/utils/cn";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <>
      <main className={cn("flex h-screen items-center justify-center")}>
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-3 rounded-xl border border-zinc-200 p-3 shadow-md dark:border-zinc-800",
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

export default SignInPage;
