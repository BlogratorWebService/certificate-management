import { Skeleton } from '../ui/skeleton';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";


function StudentLoading() {
   return (
     <div className="flex min-h-screen w-full flex-col bg-background">
       <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="text-lg font-medium text-foreground">
           Student Information
         </h1>
       </header>
       <main className="flex flex-1 flex-col gap-6 p-6">
         <div className="flex items-center">
           <Skeleton className="h-10 w-10 mr-2" />
           <Skeleton className="h-8 w-40" />
         </div>
         <Card>
           <CardHeader>
             <Skeleton className="h-5 w-36 mb-2" />
             <Skeleton className="h-4 w-56" />
           </CardHeader>
           <CardContent>
             <div className="grid gap-6 sm:grid-cols-2">
               <div className="space-y-1">
                 <Skeleton className="h-4 w-16 mb-1" />
                 <Skeleton className="h-5 w-32" />
               </div>
               <div className="space-y-1">
                 <Skeleton className="h-4 w-24 mb-1" />
                 <Skeleton className="h-5 w-40" />
               </div>
               <div className="space-y-1">
                 <Skeleton className="h-4 w-20 mb-1" />
                 <Skeleton className="h-5 w-28" />
               </div>
               <div className="space-y-1">
                 <Skeleton className="h-4 w-18 mb-1" />
                 <Skeleton className="h-5 w-28" />
               </div>
             </div>
             <div className="mt-6 flex gap-4">
               <Skeleton className="h-9 w-40" />
               <Skeleton className="h-9 w-40" />
             </div>
           </CardContent>
         </Card>
       </main>
     </div>
   );
 }

export default StudentLoading