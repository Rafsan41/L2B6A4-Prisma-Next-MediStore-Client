import Link from "next/link";
import { Compass, Home, ArrowLeft, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div
            role="alert"
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16"
        >
            {/* Decorative blobs — matches CTA banner & error page styling */}
            <div className="pointer-events-none absolute -top-32 -right-32 size-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 size-80 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative w-full max-w-xl">
                <div className="flex flex-col items-center gap-6 rounded-3xl border bg-card/60 p-8 text-center shadow-xl backdrop-blur md:p-12">
                    {/* Giant 404 with gradient */}
                    <div className="relative">
                        <h1
                            aria-hidden="true"
                            className="select-none bg-gradient-to-b from-primary via-primary/70 to-primary/20 bg-clip-text text-[7rem] font-black leading-none tracking-tighter text-transparent md:text-[9rem]"
                        >
                            404
                        </h1>
                        {/* Floating compass icon over the 0 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex size-16 items-center justify-center rounded-full border border-primary/30 bg-background/80 shadow-lg backdrop-blur md:size-20">
                                <Compass className="size-8 text-primary md:size-10" />
                            </div>
                        </div>
                    </div>

                    {/* Status pill */}
                    <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                        <span className="size-2 animate-pulse rounded-full bg-primary" />
                        <span>Page not found</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            We couldn&apos;t find that page
                        </h2>
                        <p className="mx-auto max-w-md text-base text-muted-foreground">
                            The page you&apos;re looking for doesn&apos;t exist, has been
                            moved, or is temporarily unavailable. Let&apos;s get you back
                            on track.
                        </p>
                    </div>

                    {/* Primary actions */}
                    <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button asChild size="lg" className="gap-2">
                            <Link href="/">
                                <Home className="size-4" />
                                Back to Home
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="gap-2">
                            <Link href="/medicines">
                                <Pill className="size-4" />
                                Browse Medicines
                            </Link>
                        </Button>
                    </div>

                    {/* Tertiary action */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="size-3.5" />
                        Return to homepage
                    </Link>
                </div>

                {/* Support hint */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Still stuck? Contact{" "}
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
