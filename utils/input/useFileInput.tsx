import { useState, useRef, useCallback } from 'react'

export function useFileInput({
    multiple = false,
    accept,
    maxSize,
    maxFiles,
    onError,
}: {
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    onError?: (errs: string[]) => void;
}) {
    const [files, setFiles] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    /** Validasi file sebelum ditambahkan */
    const validate = useCallback((fileList: File[]) => {
        const valid: File[] = [], errs: string[] = []

        for (const file of fileList) {
            if (accept) {
                const types = accept.split(',').map(t => t.trim())
                const ok = types.some(t =>
                    t.startsWith('.')
                        ? file.name.endsWith(t)
                        : file.type.match(t.replace('*', '.*'))
                )
                if (!ok) { errs.push(`${file.name}: tipe file tidak didukung`); continue }
            }
            if (maxSize && file.size > maxSize) {
                errs.push(`${file.name}: ukuran melebihi batas`); continue
            }
            valid.push(file)
        }
        return { valid, errs }
    }, [accept, maxSize])

    /** Tambahkan file baru ke state */
    const addFiles = useCallback((incoming: File[] | FileList) => {
        const arr = [...incoming]
        const { valid, errs } = validate(arr)

        if (errs.length) {
            setErrors(errs)
            onError?.(errs)
        } else { setErrors([]) }

        setFiles(prev => {
            const next = multiple ? [...prev, ...valid] : valid.slice(0, 1)
            if (maxFiles) return next.slice(0, maxFiles)
            return next
        })
    }, [multiple, maxFiles, validate, onError])

    /** Handler untuk <input type="file" /> */
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) addFiles(e.target.files)
        e.target.value = '' // reset agar file sama bisa dipilih ulang
    }, [addFiles])

    /** Drag & drop handlers */
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); setIsDragging(true)
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
            setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); setIsDragging(false)
        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
    }, [addFiles])

    /** Buka dialog file picker */
    const open = useCallback(() => {
        inputRef.current?.click()
    }, [])

    /** Hapus satu file berdasarkan index */
    const remove = useCallback((i: number) => {
        setFiles(prev => prev.filter((_, idx) => idx !== i))
    }, [])

    /** Hapus semua file */
    const clear = useCallback(() => {
        setFiles([]); setErrors([])
    }, [])

    return {
        files, isDragging, errors,
        inputRef, open, remove, clear,
        inputProps: {
            ref: inputRef,
            type: 'file',
            multiple,
            accept,
            onChange: handleChange,
            style: { display: 'none' },
        },
        dropZoneProps: {
            onDragEnter: handleDragEnter,
            onDragOver: handleDragOver,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
            onClick: open,
        },
    }
}