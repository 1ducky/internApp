export interface ImageSanitizerResult {
    sanitized: File[];
    failed: string[];
}

export const ImageLimitClient = async (
    files: File[],
    limitBytes: number = 256
): Promise<ImageSanitizerResult> => {
    const fileArray = Array.from(files);

    const result: ImageSanitizerResult = {
        sanitized: [],
        failed: [],
    };

    for (const file of fileArray) {
        if (file.size > limitBytes * 1024) {
            result.failed.push(file.name);
        } else {
            result.sanitized.push(file);
        }
    }

    return result;
};