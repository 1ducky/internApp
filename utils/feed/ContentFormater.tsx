export const renderFormattedDescription = (text: string) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
        }
        parts.push({ type: 'code', content: match[1] });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.map((part, pIdx) => {
        if (part.type === 'code') {
            return (
                <div key={`code-${pIdx}`} className="my-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-x-auto text-sm font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                    {part.content.trim()}
                </div>
            );
        }

        return part.content.split('\n\n').map((paragraph, index) => {
            if (!paragraph.trim()) return null;
            const key = `text-${pIdx}-${index}`;

            // Header detection (starts with ###)
            if (paragraph.trim().startsWith('### ')) {
                return (
                    <h3 key={key} className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100 mt-6 mb-3 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
                        {paragraph.trim().replace('### ', '')}
                    </h3>
                );
            }
            // Bullet points detection (starts with * or -)
            if (paragraph.includes('\n* ') || paragraph.trim().startsWith('* ') || paragraph.includes('\n- ') || paragraph.trim().startsWith('- ')) {
                const lines = paragraph.split('\n');
                return (
                    <ul key={key} className="space-y-2.5 my-4 pl-5 list-disc text-zinc-600 dark:text-zinc-300">
                        {lines.map((line, lIdx) => {
                            const cleanedLine = line.replace(/^[*-\s]+/, '');
                            if (!cleanedLine.trim()) return null;

                            // Highlight bold text inside bullet points
                            const parts = cleanedLine.split('**');
                            return (
                                <li key={`${key}-${lIdx}`} className="leading-relaxed text-sm sm:text-base">
                                    {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-zinc-950 dark:text-white">{p}</strong> : p)}
                                </li>
                            );
                        })}
                    </ul>
                );
            }

            // Plain paragraphs with bold formatting check
            const textParts = paragraph.split('**');
            return (
                <p key={key} className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base mb-4 whitespace-pre-line">
                    {textParts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-zinc-950 dark:text-white">{p}</strong> : p)}
                </p>
            );
        });
    });
};