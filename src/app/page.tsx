import Logo from "@/ui/logos/logo";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";
import BackgroundGradient from "@/components/home/backgroundGradient";

import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import FooterNav from "@/components/footerNav";

const HomePage = () => {
  return (
    <main>
      {/* Background */}
      <BackgroundGradient />
      {/* Content */}
      <section className="relative flex min-h-[90vh] w-full items-center justify-center px-4 md:px-4 lg:px-8">
        <div className="w-full max-w-4xl items-center">
          <div className="flex flex-col items-center space-y-6 text-center">
            <Logo
              width={70}
              height={70}
              className="animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 delay-100 duration-500"
            />
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-white",
                "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 delay-200 duration-500",
              )}
            >
              Your things, organized.
            </h1>
            <p
              className={cn(
                "max-w-lg text-lg text-zinc-600 dark:text-zinc-400",
                "animate-in fill-mode-backwards fade-in slide-in-from-bottom-2 delay-500 duration-500",
              )}
            >
              A simple and powerful way to manage your tasks. Create
              organizations, collections and reminders to stay focused on your
              things.
            </p>
            {/* Buttons */}
            <div
              className={cn(
                "flex flex-wrap gap-2 pt-2",
                "animate-in fill-mode-backwards fade-in delay-700 duration-500",
              )}
            >
              <Link
                href="/app"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                  "py-6",
                )}
              >
                <span>Get Started</span>
                <ChevronRightIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FooterNav />
    </main>
  );
};

export default HomePage;
