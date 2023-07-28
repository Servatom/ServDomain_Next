import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-start justify-start p-4 flex-col gap-4">
      <Skeleton className="h-12 md:w-[300px] opacity-50 mb-12" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
      <Skeleton className="h-10 md:w-4/5 opacity-40" />1
      <Skeleton className="h-10 md:w-4/5 opacity-40" />
    </div>
  );
}
