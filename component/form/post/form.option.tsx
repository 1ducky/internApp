import { postStatusOptions, postTypeOptions } from "@/services/post/post.option";
import { SubmitPostInput } from "@/services/post/post.schema";
import { useFormContext } from "react-hook-form";

export function FormInputSelect({ field }: { field: keyof SubmitPostInput }) {
    const { register } = useFormContext<SubmitPostInput>()
    const options = field === 'type' ? postTypeOptions : field === 'status' ? postStatusOptions : undefined
    return (
        <select
            {...register(field)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
        >
            {options?.map((item, id) => (
                <option key={id} value={item.value}>{item.label}</option>
            ))}
        </select>
    )
}