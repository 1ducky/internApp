'use client'

export default function testPage(){
    const onUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        files.forEach((file) => {
            console.log(file.name);         // "foto.jpg"
            console.log(file.type);         // "image/jpeg"
            console.log(file.size);         // 204800
            console.log(file.lastModified); // 1716540000000

            // Konversi lastModified ke tanggal
            const date = new Date(file.lastModified);
            console.log(date.toLocaleDateString()); // "24/5/2026"
        });
    };
    return(
        <>
            <form >
                <input type="file" name="file" id="file" multiple onChange={onUploaded}/>
            </form>
        </>
    )
}