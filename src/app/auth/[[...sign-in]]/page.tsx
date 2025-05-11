import { cn } from "@/utils/cn";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className={cn("flex h-screen items-center justify-center")}>
      <SignIn />
    </main>
  );
};

export default SignInPage;
