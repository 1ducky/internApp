'use client'

import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

export function useImageCompressor(opts = {}) {
    const [progress, setProgress] = useState<Record<number, number>>({});
    const [isCompressing, setIsCompressing] = useState(false);

    const options = {
        maxSizeMB: 0.256,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp',
        initialQuality: 0.5,
        ...opts,
    };

    const compress = useCallback(async (files: File[]) => {
        const fileArray = Array.from(files);
        setIsCompressing(true);
        setProgress({});

        const results = await Promise.all(
            fileArray.map(async (file, i) => {
                if (!file.type.startsWith('image/')) return file;
                try {
                    const compressed = await imageCompression(file, {
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
        return results;
    }, []);

    return { compress, progress, isCompressing };
}