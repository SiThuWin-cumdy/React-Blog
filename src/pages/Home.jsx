import React, { useState } from "react";
import { AllPost } from "../components/index";

function Home() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <AllPost />
      </main>
    </>
  );
}

export default Home;
