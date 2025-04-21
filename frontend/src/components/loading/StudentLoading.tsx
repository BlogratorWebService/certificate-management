import { Skeleton } from '../ui/skeleton';
import {
  Card,
  CardHeader,
} from "@/components/ui/card";


function StudentLoading() {
   return (
     <div className="flex min-h-screen max-w-full flex-col bg-background">
       <header className="sticky top-0 z-10 flex h-14 items-center border-b bg-background px-6">
         <h1 className="text-lg font-medium text-foreground">
           Student Information
         </h1>
       </header>
       <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
         <div className="flex items-center">
           <Skeleton className="h-10 w-10 mr-2" />
           <Skeleton className="h-8 w-40" />
         </div>
         <Card>
           <CardHeader>
             <Skeleton className="h-5 w-36 mb-2" />
             <Skeleton className="h-4 w-56" />
           </CardHeader>
         </Card>
       </main>
     </div>
   );
 }

export default StudentLoading