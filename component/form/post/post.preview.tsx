import { SubmitPostInput } from "@/services/post/post.schema"
import { renderFormattedDescription } from "@/utils/feed/ContentFormater"
import { useFormContext, useWatch } from "react-hook-form"

export function ContentPreview({ field }: { field: keyof SubmitPostInput }) {
    const { control } = useFormContext<SubmitPostInput>()
    const preview = useWatch({
        control: control,
        name: field,
    }) as string
    return (
        <>
            {preview && preview.trim().length > 0 ? (
                <>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1 ">
                        Preview
                    </label>
                    <div className="bg-white dark:bg-zinc-900 py-10 px-5 rounded-2xl max-h-72 overflow-y-scroll scrollbar-none">
                        <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-3">
                            {renderFormattedDescription(preview || '')}
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}