
import { Newspaper } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <Newspaper className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-headline text-muted-foreground">Loading News...</p>
      </div>
    </div>
  );
}
