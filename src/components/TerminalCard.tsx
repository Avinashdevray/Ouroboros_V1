"use client";

import React, { useEffect, useState } from "react";
import { Copy, Terminal, Check } from "lucide-react";
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
                "bg-black/60 border-emerald-500/30 text-white",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/80 rounded-t-xl text-sm font-semibold text-gray-400 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Terminal</span>
                </div>
                <button
                    className="p-1.5 border border-gray-600 rounded-md transition-all hover:border-emerald-400 text-gray-400 hover:text-emerald-400"
                    onClick={handleCopy}
                    aria-label="Copy to clipboard"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Content */}
            <div className="rounded-b-xl text-sm font-mono p-4 bg-black/90 text-emerald-300 max-h-[300px] overflow-auto">
                {isComplete ? (
                    <pre className="whitespace-pre-wrap">
                        <span className="text-gray-500">$ </span>{command}
                    </pre>
                ) : (
                    <motion.pre className="whitespace-pre-wrap">
                        <span className="text-gray-500">$ </span>
                        {displayedText}
                        <motion.span
                            className="inline-block w-1.5 h-4 bg-emerald-400 ml-0.5 align-text-bottom"
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
