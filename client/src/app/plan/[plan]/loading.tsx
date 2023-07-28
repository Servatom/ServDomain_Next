import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full pt-20 flex items-start justify-between p-4 flex-row gap-4 opacity-50 ">
      <Skeleton className="h-10 w-[300px]" />
      <div className="flex flex-row gap-6 mt-2">
        <Skeleton className="h-8 w-36 " />
        <Skeleton className="h-8 w-36 " />
        <Skeleton className="h-8 w-36 " />
      </div>
    </div>
  );
}
