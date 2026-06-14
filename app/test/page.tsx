// 'use client'
// import { useFileInput } from "@/utils/input/useFileInput"

// export default function UploadForm() {
//     const {
//         files, isDragging, errors,
//         inputProps, dropZoneProps,
//         remove, clear,
//     } = useFileInput({
//         multiple: true,
//         accept: 'image/*,.pdf',
//         maxSize: 5 * 1024 * 1024,  // 5 MB
//         maxFiles: 5,
//         onError: (errs: string[]) => console.warn(errs),
//     })

//     return (
//         <div>
//             {"/* Area klik + drag & drop */"}
//             <div
//                 {...dropZoneProps}
//                 style={{
//                     border: `2px dashed ${isDragging ? '#7F77DD' : '#ccc'}`,
//                     padding: '2rem', textAlign: 'center', cursor: 'pointer',
//                     background: isDragging ? '#EEEDFE' : 'white',
//                 }}
//             >
//                 Klik atau seret file ke sini
//             </div>

//             {/* Hidden input — di-trigger oleh hook */}
//             <input {...inputProps} />

//             {/* Error messages */}
//             {errors.map((e, i) => (
//                 <p key={i} style={{ color: 'red' }}>{e}</p>
//             ))}

//             {/* Daftar file terpilih */}
//             {files.map((file, i) => (
//                 <div key={i}>
//                     {file.name} ({(file.size / 1024).toFixed(1)} KB)
//                     <button onClick={() => remove(i)}>✕</button>
//                 </div>
//             ))}

//             {files.length > 0 && (
//                 <button onClick={clear}>Hapus semua</button>
//             )}
//         </div>
//     )
// }

export default function TestPage() {
    return (
        <div>
            <h1>Test Page</h1>
        </div>
    )
}