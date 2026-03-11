"use client";

import React, { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon as Copy, ComputerTerminal01Icon as Terminal, Tick01Icon as Check } from "@hugeicons/core-free-icons";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

type TerminalCardProps = {
    command: string;
    language?: string;
    className?: string;
};

const TerminalCard: React.FC<TerminalCardProps> = ({ command, language = "bash", className }) => {
    const [copied, setCopied] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (index < command.length) {
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + command.charAt(index));
                setIndex((prev) => prev + 1);
            }, 40);
        } else {
            setIsComplete(true);
            timeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
                setIsComplete(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [index, command]);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div
            className={cn(
                "border rounded-xl backdrop-blur-md min-w-[300px] max-w-full",
                className
            )}
            style={{
                background: "var(--terminal-card-bg)",
                borderColor: "var(--terminal-card-border)",
                color: "var(--foreground)",
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-4 py-2.5 rounded-t-xl text-sm font-semibold"
                style={{
                    background: "var(--terminal-header-bg)",
                    color: "var(--body-text)",
                    borderBottom: "1px solid var(--terminal-card-border)",
                }}
            >
                <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={Terminal} className="w-4 h-4" style={{ color: "var(--accent-text)" }} />
                    <span style={{ color: "var(--accent-text)" }}>Terminal</span>
                </div>
                <button
                    className="p-1.5 rounded-md transition-all"
                    style={{
                        border: "1px solid var(--border-subtle)",
                        color: "var(--body-text)",
                    }}
                    onClick={handleCopy}
                    aria-label="Copy to clipboard"
                >
                    {copied ? <HugeiconsIcon icon={Check} className="w-4 h-4" style={{ color: "var(--accent-text)" }} /> : <HugeiconsIcon icon={Copy} className="w-4 h-4" />}
                </button>
            </div>

            {/* Content */}
            <div
                className="rounded-b-xl text-sm font-mono p-4 max-h-[300px] overflow-auto"
                style={{
                    background: "var(--terminal-bg)",
                    color: "var(--terminal-text)",
                }}
            >
                {isComplete ? (
                    <pre className="whitespace-pre-wrap">
                        <span style={{ color: "var(--body-text-light)" }}>$ </span>{command}
                    </pre>
                ) : (
                    <motion.pre className="whitespace-pre-wrap">
                        <span style={{ color: "var(--body-text-light)" }}>$ </span>
                        {displayedText}
                        <motion.span
                            className="inline-block w-1.5 h-4 ml-0.5 align-text-bottom"
                            style={{ background: "var(--accent-text)" }}
                            animate={{ opacity: [0, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                        />
                    </motion.pre>
                )}
            </div>
        </div>
    );
};

export default TerminalCard;
