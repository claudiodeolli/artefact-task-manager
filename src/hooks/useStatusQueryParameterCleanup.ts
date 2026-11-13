"use client";

import { useEffect } from "react";

export default function useStatusQueryParameterCleanup() {
    useEffect(() => {
        const currentUrl = new URL(window.location.href);

        if (!currentUrl.searchParams.has("status")) {
            return;
        }

        currentUrl.searchParams.delete("status");
        window.history.replaceState(null, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
    }, []);
}
