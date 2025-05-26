import Link from "next/link";
import React, { memo, useId, useRef, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ActionButton, ExportToCsvButton } from "./table";
import htmlTableToCsv from "html-table-to-csv";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyIcon } from "lucide-react";
import { Button } from "../ui/button";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
    const components: Partial<Components> = {
        // @ts-expect-error
        code: ({ node, inline, className, children, ref, ...rest }) => {
            const match = /language-(\w+)/.exec(className || "");
            const content = String(children).replace(/\n$/, "");
            const theme = atomOneLight;

            return match ? (
                <div
                    className="border rounded-md overflow-hidden"
                    style={{ background: theme.hljs.background }}
                >
                    <div className="p-2 flex justify-between items-center border-b">
                        <span className="text-sm text-gray-500 font-bold">
                            {match[1]}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                navigator.clipboard.writeText(content);
                            }}
                        >
                            <CopyIcon className="w-4 h-4" />
                        </Button>
                    </div>
                    <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={content}
                        style={theme}
                        language={match[1]}
                        className={className}
                        customStyle={{ padding: "calc(var(--spacing) * 4)" }}
                    />
                </div>
            ) : (
                <code className="bg-muted rounded-sm py-[.15rem] px-[.3rem]" {...rest} >
                    {children}
                </code>
            );
        },
        ol: ({ node, children, ...props }) => {
            return (
                <ol className="list-decimal list-outside ml-4" {...props}>
                    {children}
                </ol>
            );
        },
        li: ({ node, children, ...props }) => {
            return (
                <li className="py-1" {...props}>
                    {children}
                </li>
            );
        },
        ul: ({ node, children, ...props }) => {
            return (
                <ul className="list-decimal list-outside ml-4" {...props}>
                    {children}
                </ul>
            );
        },
        strong: ({ node, children, ...props }) => {
            return (
                <span className="font-semibold" {...props}>
                    {children}
                </span>
            );
        },
        a: ({ node, children, ...props }) => {
            return (
                // @ts-expect-error
                <Link
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                >
                    {children}
                </Link>
            );
        },
        h1: ({ node, children, ...props }) => {
            return (
                <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
                    {children}
                </h1>
            );
        },
        h2: ({ node, children, ...props }) => {
            return (
                <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
                    {children}
                </h2>
            );
        },
        h3: ({ node, children, ...props }) => {
            return (
                <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
                    {children}
                </h3>
            );
        },
        h4: ({ node, children, ...props }) => {
            return (
                <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
                    {children}
                </h4>
            );
        },
        h5: ({ node, children, ...props }) => {
            return (
                <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
                    {children}
                </h5>
            );
        },
        h6: ({ node, children, ...props }) => {
            return (
                <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
                    {children}
                </h6>
            );
        },
        table: ({ node, children, ...props }) => {
            const tableId = useId();

            return (
                <div className="relative group">
                    <ExportToCsvButton
                        className="absolute top-0 -right-10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => htmlTableToCsv(tableId, "table")}
                    />
                    <table id={tableId} {...props}>
                        {children}
                    </table>
                </div>
            );
        },
    };

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children}
        </ReactMarkdown>
    );
};

export const Markdown = memo(
    NonMemoizedMarkdown,
    (prevProps, nextProps) => prevProps.children === nextProps.children
);
