'use client'

import { useImageCompressor } from "@/utils/Image/imageCompressorClientSide";
import { ImageLimitClient } from "@/utils/Image/imageSizeLimiterclient";
import { useState } from "react";
import { uploadImage } from "./serverAction";
import { supabase } from "@/libs/supabase";

export default function testPage() {
    const { compress, isCompressing, getMessage } = useImageCompressor()
    const [failedFile, setFailedFile] = useState<string[]>([]);

    const onUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFailedFile([]);
        const filesInput = Array.from(e.target.files || []);
        if (filesInput.length === 0) return
        const commpressed = await compress(filesInput)
        if (commpressed.length === 0) return
        const sanitized = await ImageLimitClient(commpressed)
        if (sanitized.failed.length > 0) {
            setFailedFile(sanitized.failed)
        }
        console.log(sanitized.sanitized[0])
        const files = await supabase.storage.from('Images').upload(`feeds/${sanitized.sanitized[0].name}`, sanitized.sanitized[0])
        console.log(files)
    };
    return (
        <>
            <input type="file" name="image" id="image" multiple accept="image/*" onChange={onUploaded} />
        </>
    )
}