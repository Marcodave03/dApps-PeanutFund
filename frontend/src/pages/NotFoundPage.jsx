import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-4 p-6 text-center">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="text-lg text-muted-foreground">
        Oops! The page you were looking for doesn&apos;t exist.
      </p>
      <Link to="/">
        <Button variant="outline">Go to Home</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
