"use client";

import { cn } from "@/utils/cn";
import { appConfig } from "@/config";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  ArrowUpRight,
  ChevronRight,
  FolderPlusIcon,
  HouseIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import UserMenu from "@/components/auth/userMenu";
import SettingsModal from "@/components/settings/settingsModal";

import { SidebarLink, SidebarLinkStyle } from "@/components/layout/sidebarLink";

import GitHub from "@/ui/logos/github";
import { Skeleton } from "@/ui/skeleton";
import { Separator } from "@/ui/separator";
import { ExternalLink } from "@/ui/externalLink";
import { Button, buttonVariants } from "@/ui/button";

import ShowOrganizations from "@/components/organizations/showOrganizations";
import CreateOrganization from "@/components/organizations/createOrganization";

interface SidebarContentProps {
  isOpen: boolean;
}

const SidebarContent = ({ isOpen }: SidebarContentProps) => {
  const { user, isSignedIn, isLoaded } = useUser();
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full",
        "overflow-x-hidden overflow-y-auto",
        "bg-zinc-100 dark:bg-zinc-800/20",
        "border-r border-zinc-300 dark:border-zinc-800",
        "transition-transform duration-300 ease-in-out",
        "select-none",
        isOpen ? "w-60" : "w-0",
      )}
    >
      <nav className="flex h-full flex-col px-4 pt-6 pb-5">
        <div className="flex flex-1">
          <div className="flex w-full flex-col">
            <Link
              href="/"
              className={cn(
                "h-fit w-fit",
                "font-onest text-xl font-medium tracking-tight",
                "hover:text-zinc-700 dark:hover:text-zinc-300",
                "transition-colors duration-200 ease-in-out",
              )}
            >
              <span>Reminder</span>
            </Link>
            {/* Nav Links */}
            <nav className="mt-5 flex flex-col space-y-1">
              <SidebarLink href="/">
                <HouseIcon size={16} />
                <span>Home</span>
              </SidebarLink>
              {!isLoaded ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                isSignedIn &&
                user && (
                  <CreateOrganization>
                    <button className={cn(SidebarLinkStyle)}>
                      <FolderPlusIcon size={16} />
                      <span>Create Organization</span>
                    </button>
                  </CreateOrganization>
                )
              )}
              {!isLoaded ? (
                <>
                  <Skeleton className="mb-1 h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                isSignedIn &&
                user && (
                  <>
                    <Separator className="my-2" />
                    <p className="mt-2 mb-3 text-xs text-zinc-600 dark:text-zinc-400">
                      Organizations
                    </p>
                    <ShowOrganizations userId={user.id} />
                  </>
                )
              )}
            </nav>
          </div>
        </div>
        <section>
          <Separator className="mb-4" />
          <div className="flex flex-col space-y-2">
            {/* Footer Nav Links */}
            <SettingsModal>
              <Button variant="outline" className="justify-start shadow-none">
                <SettingsIcon size={16} />
                <span>Settings</span>
              </Button>
            </SettingsModal>
            <ExternalLink
              href={appConfig.repositoryUrl}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "justify-between text-sm shadow-none",
              )}
            >
              <div className="flex items-center space-x-2">
                <GitHub width={16} height={16} />
                <span>Repository</span>
              </div>
              <ArrowUpRight size={14} className="text-zinc-500" />
            </ExternalLink>
            <div
              className={cn(
                "rounded-md border border-zinc-200 dark:border-zinc-800",
                "overflow-hidden p-2.5",
              )}
            >
              {!isLoaded ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center gap-0.5">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                </div>
              ) : !isSignedIn ? (
                <>
                  <p className="mb-2 text-xs text-zinc-600 dark:text-zinc-400">
                    Login to your account to save your data and access your data
                    anywhere
                  </p>
                  <Link
                    href="/auth"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "sm",
                      }),
                      "w-full justify-between",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <UserIcon size={16} />
                      <span>Sign in</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-500" />
                  </Link>
                </>
              ) : (
                user && (
                  <UserMenu
                    fullName={user.fullName ?? user.username ?? ""}
                    emailAddresses={user.emailAddresses[0]?.emailAddress}
                  />
                )
              )}
            </div>
          </div>
        </section>
      </nav>
    </aside>
  );
};

export default SidebarContent;
