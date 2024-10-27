import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WaterLoader from "@/components/ui/loading";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-700">
            Oops! Water You Looking For?
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-6">
            <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <WaterLoader size="lg" className="text-blue-500" />
            </div>
          </div>
          <p className="text-lg sm:text-xl mb-6 text-center text-blue-600">
            Looks like our water supply line got a little tangled!
          </p>
          <p className="text-base sm:text-lg mb-6 text-center text-blue-500">
            Don't worry, we've got gallons of great content just a click away!
          </p>
          <Button
            asChild
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            <Link href="/">Dive Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
