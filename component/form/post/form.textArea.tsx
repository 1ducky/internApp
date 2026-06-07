import { SubmitPostInput } from "@/services/post/post.schema";
import { useFormContext } from "react-hook-form";

export function FormTextArea({ field, label, placeholder }: { field: keyof SubmitPostInput, label: string, placeholder?: string }) {
    const { register, formState } = useFormContext<SubmitPostInput>();
    return (
        <>
            {/* FIELD: JUDUL */}
            <div>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
                {formState.errors[field] && <p className="text-red-500 text-sm">{formState.errors[field]?.message}</p>}
                <textarea
                    {...register(field)}
                    placeholder={placeholder}
                    className={`w-full min-h-40 px-4 py-2 border ${formState.errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 resize-y`}
                />
            </div>
        </>
    )
}