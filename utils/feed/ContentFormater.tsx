export const renderFormattedDescription = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
        // Header detection (starts with ###)
        if (paragraph.startsWith('### ')) {
            return (
                <h3 key={index} className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-100 mt-6 mb-3 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
                    {paragraph.replace('### ', '')}
                </h3>
            );
        }
        // Bullet points detection (starts with * or -)
        if (paragraph.includes('\n* ') || paragraph.startsWith('* ') || paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
            const lines = paragraph.split('\n');
            return (
                <ul key={index} className="space-y-2.5 my-4 pl-5 list-disc text-zinc-600 dark:text-zinc-300">
                    {lines.map((line, lIdx) => {
                        const cleanedLine = line.replace(/^[*-\s]+/, '');
                        if (!cleanedLine.trim()) return null;

                        // Highlight bold text inside bullet points
                        const parts = cleanedLine.split('**');
                        return (
                            <li key={lIdx} className="leading-relaxed text-sm sm:text-base">
                                {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-zinc-950 dark:text-white">{part}</strong> : part)}
                            </li>
                        );
                    })}
                </ul>
            );
        }

        // Plain paragraphs with bold formatting check
        const parts = paragraph.split('**');
        return (
            <p key={index} className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base mb-4 whitespace-pre-line">
                {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-zinc-950 dark:text-white">{part}</strong> : part)}
            </p>
        );
    });
};