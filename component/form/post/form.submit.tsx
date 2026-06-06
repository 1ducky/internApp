export function FormSubmitButton({ isDisable = false, busyText }: { isDisable?: boolean, busyText?: string }) {
    return (
        <>
            <input disabled={isDisable} type="submit" className={`w-full sm:w-auto px-5 py-2 text-white rounded-lg text-sm font-medium transition ${isDisable ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} value={busyText ? busyText : "Save Changes"} />
        </>
    )
}