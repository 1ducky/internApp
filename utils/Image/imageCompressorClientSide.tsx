'use client'

import { useState, useCallback, useMemo } from 'react';
import imageCompression from 'browser-image-compression';
import { convertIfHeic } from './iphoneTypeToImage';

export function useImageCompressor(opts = {}) {
    const [progress, setProgress] = useState<Record<number, number>>({});
    const [isCompressing, setIsCompressing] = useState(false);
    const [getMessage, setgetMessage] = useState<string | undefined>(undefined)

    const options = useMemo(() => ({
        maxSizeMB: 0.256,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp',
        initialQuality: 0.5,
        ...opts,
    }), [opts]);

    const compress = useCallback(async (files: File[]) => {
        const fileArray = Array.from(files);
        setIsCompressing(true);
        setProgress({});
        setgetMessage('Meng-Kompresi Gambar...')

        const results = await Promise.all(
            fileArray.map(async (file, i) => {
                if (!file.type.startsWith('image/')) return file;
                try {
                    const validImage = await convertIfHeic(file)
                    const compressed = await imageCompression(validImage, {
                        ...options,
                        onProgress: (p) =>
                            setProgress((prev) => ({ ...prev, [i]: p })),
                    });
                    return new File(
                        [compressed],
                        file.name.replace(/\.[^.]+$/, '.webp'),
                        { type: options.fileType }
                    );
                } catch {
                    return file;
                }
            })
        );

        setIsCompressing(false);
        setgetMessage(undefined)
        return results;
    }, [options]);

    return { compress, progress, isCompressing, getMessage };
}