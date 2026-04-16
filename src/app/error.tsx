"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div
            role="alert"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16"
        >
            {/* Decorative blobs — matches CTA banner styling */}
            <div className="pointer-events-none absolute -top-32 -right-32 size-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-destructive/10 blur-3xl" />

            <div className="relative w-full max-w-xl">
                <div className="flex flex-col items-center gap-6 rounded-3xl border bg-card/60 p-8 text-center shadow-xl backdrop-blur md:p-12">
                    {/* Icon badge with pulse */}
                    <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-destructive/20" />
                        <div className="relative flex size-20 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10">
                            <AlertTriangle className="size-10 text-destructive" />
                        </div>
                    </div>

                    {/* Status pill — same pattern as CTA banner */}
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                        <span className="size-2 animate-pulse rounded-full bg-destructive" />
                        <span>Unexpected error</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            Something went wrong
                        </h1>
                        <p className="mx-auto max-w-md text-base text-muted-foreground">
                            We hit a snag while loading this page. It&apos;s not you —
                            it&apos;s us. Please try again in a moment.
                        </p>
                    </div>

                    {/* Error details */}
                    {error?.message && (
                        <div className="w-full rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-left">
                            <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
                                Error
                            </p>
                            <p className="mt-1 break-words font-mono text-sm text-foreground/80">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="mt-2 font-mono text-xs text-muted-foreground">
                                    ref: {error.digest}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Primary actions */}
                    <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button onClick={reset} size="lg" className="gap-2">
                            <RotateCcw className="size-4" />
                            Try again
                        </Button>
                        <Button asChild size="lg" variant="outline" className="gap-2">
                            <Link href="/">
                                <Home className="size-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>

                    {/* Tertiary action */}
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-3.5" />
                        Go to previous page
                    </button>
                </div>

                {/* Support hint */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Need help? Contact{" "}
                    <a
                        href="mailto:support@medistore.com"
                        className="font-medium text-primary hover:underline"
                    >
                        support@medistore.com
                    </a>
                </p>
            </div>
        </div>
    );
}
