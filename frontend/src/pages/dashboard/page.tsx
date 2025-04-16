import {Link} from "react-router-dom";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock student data
const students = [
  { _id: 1, name: "Sree Gopal Saha", registrationNumber: "2023001" },
];

export default function Dashboard() {
  return (
    <div className="w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Manage your students and their information
            </p>
          </div>
          <Link to="/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Student
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                View and manage all registered students
              </CardDescription>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search students..."
                className="max-w-xs"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Registration Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow
                    key={student._id}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        to={`/student/${student.registrationNumber}`}
                        className="block w-full"
                      >
                        {student.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/student/${student.registrationNumber}`}
                        className="block w-full"
                      >
                        {student.registrationNumber}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
