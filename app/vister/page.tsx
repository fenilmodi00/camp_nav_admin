import React from "react";
import { InputForm } from "./inputFrom"; // Adjust the path according to your directory structure

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Page</h1>
      <InputForm />
    </div>
  );
}
