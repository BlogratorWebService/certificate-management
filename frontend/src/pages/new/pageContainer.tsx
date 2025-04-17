"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Props {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    name: string;
    registrationNumber: string;
    courseName: string;
    startDate: string;
    endDate: string;
    certificateFile: File | null;
    marksheetFile: File | null;
  };
  loading: boolean;
  error: string;
  success: boolean;
}

function NewStudentContainer({
  handleSubmit,
  handleChange,
  formData,
  loading,
  error,
  success,
}: Props) {
    const navigate = useNavigate();

  return (
    <div className="w-full bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          New Student
        </h2>
        <p className="text-muted-foreground mt-2">Enter student information</p>

        <Dialog
          open={loading || success}
          onOpenChange={() => {
            if (success) {
              navigate("/");
            }
          }}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <DialogTitle>
                {loading ? "Files Uploading" : "Upload Successful"}
              </DialogTitle>
              <DialogDescription className="flex flex-col items-center gap-4 pt-4">
                {!success ? (
                  <>
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div className="text-center">
                      <p className="font-medium">
                        Please wait while your files are being uploaded
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Do not close this window or navigate away
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div className="text-center">
                      <p className="font-medium">
                        Your files have been uploaded!
                      </p>
                      <p className="text-muted-foreground mt-1">
                        You may now safely close this window.
                      </p>
                    </div>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Card className="shadow-md border-0 overflow-hidden bg-background">
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-6 mx-6 mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <CardContent className="pb-4 space-y-8 bg-background">
              <div>
                <h3 className="text-md font-semibold text-primary mb-4">
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-foreground font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter student's full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-input focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="registrationNumber"
                      className="text-foreground font-medium"
                    >
                      Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      placeholder="Enter registration Number"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                      className="border-input focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div>
                <h3 className="text-md font-semibold text-primary mb-4">
                  Course Details
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseName"
                      className="text-foreground font-medium"
                    >
                      Course Name
                    </Label>
                    <Input
                      id="courseName"
                      name="courseName"
                      placeholder="Enter complete course name"
                      value={formData.courseName}
                      onChange={handleChange}
                      required
                      className="border-input focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="startDate"
                        className="text-foreground font-medium"
                      >
                        Start Date
                      </Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="border-input focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="endDate"
                        className="text-foreground font-medium"
                      >
                        End Date
                      </Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="border-input focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div>
                <h3 className="text-md font-semibold text-primary mb-4">
                  Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="certificateFile"
                      className="text-foreground font-medium"
                    >
                      Certificate File
                    </Label>
                    <Input
                      id="certificateFile"
                      name="certificateFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange}
                      className="border-input focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Accept PDF, JPG or PNG (max 5MB)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="marksheetFile"
                      className="text-foreground font-medium"
                    >
                      Marksheet File
                    </Label>
                    <Input
                      id="marksheetFile"
                      name="marksheetFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleChange}
                      className="border-input focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Accept PDF, JPG or PNG (max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t px-6 py-4 flex justify-end">
              <div className="flex space-x-2">
                <Button type="submit" className="px-6">
                  {loading ? (
                    <>
                      Uploading Files...
                      <Loader2 className="animate-spin ml-2" />
                    </>
                  ) : (
                    "Create Certificate"
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default NewStudentContainer;
