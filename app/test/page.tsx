'use client'
export default function testPage() {
    const onAddComment = async (content: string) => {
        const res = await fetch('/api/comment/cmpqxfoft0000w0na8w8coace', { method: "POST", body: JSON.stringify({ content }) })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            alert('comment added')
        } else {
            const data = await res.json()
            console.log(data)
            alert('failed to add comment')
        }
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <button className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer" onClick={() => onAddComment("test")}>add comment</button>
        </div>
    )
}