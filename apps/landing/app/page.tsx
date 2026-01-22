import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Landing Page</h1>
      <Button appName="Landing">Get Started</Button>
    </main>
  );
}
