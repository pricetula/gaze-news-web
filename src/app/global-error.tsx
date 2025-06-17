"use client";

import NextError from "next/error";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    return (
        <html>
            <body>
                {error.message}
                <NextError statusCode={500} />
            </body>
        </html>
    );
}