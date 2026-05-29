'use client'

import ImageProgressCompress from "@/component/objectStore/image.progressCompress";
import { useImageCompressor } from "@/utils/imageCompressorClientSide";
import { useState } from "react";

export default function TestPage() {
    const { compress, isCompressing, progress } = useImageCompressor()
    const [before, setBefore] = useState<File[]>([])
    const [after, setAfter] = useState<File[]>([])

    const onUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setBefore([])
        setAfter([])
        const files = Array.from(e.target.files || []);
        console.log("before compression")
        files.map((file: File) => {
            console.log((file.size / 1024).toFixed(1) + 'kb')
            console.log(file.type)
            console.log(file.lastModified)
            setBefore(prev => [...prev, file])

        })
        const compressed = await compress(files)
        console.log("after compression")
        compressed.map((file: File, i: number) => {
            console.log((file.size / 1024).toFixed(1) + 'kb')
            console.log(file.type)
            console.log(file.lastModified)
            console.log(((1 - file.size / files[i].size) * 100).toFixed(1) + "%")
            setAfter(prev => [...prev, file])
        })

    };
    return (
        <>
            <form >
                <input type="file" name="file" id="file" multiple onChange={onUploaded} />
            </form>
            <div className="flex flex-col">
                <ImageProgressCompress files={before} isCompressing={isCompressing} progress={progress} />
                {after.map((file, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={URL.createObjectURL(file)} alt="after" />
                ))}
            </div>
        </>
    )
}