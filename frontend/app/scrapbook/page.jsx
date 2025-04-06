"use client";

import { useState } from "react";
import ScrapbookComponent from "@/components/ScrapbookComponent";

export default function ScrapbookPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Travel Scrapbook</h1>
        <ScrapbookComponent />
      </div>
    </div>
  );
}
