'use client'
import React from "react";

function HomeComponent() {

    return (<div className="mb-32 flex text-center items-center justify-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
            href="/chat"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
        >
            <h2 className="mb-3 text-2xl font-semibold">
                Go to chat{" "}
                <span
                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
                Chat
            </p>
        </a>

    </div>)
}

export default function HomePage() {

    return (

        <div className="flex h-screen w-full items-center justify-center gap-4 bg-background">
            <HomeComponent/>
        </div>
    );
}