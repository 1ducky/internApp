import heic2any from 'heic2any';

export const convertIfHeic = async (file: File): Promise<File> => {

    // cek apakah file type dari iphone
    const ext = file.name.split('.').pop()?.toLowerCase();
    const isHeic = file.type === 'image/heic' || 
                   file.type === 'image/heif' || 
                   ext === 'heic' || 
                   ext === 'heif';

    if (!isHeic) return file; //return original jika bukan type dari iphone
    
    // konversi file heic ke jpeg jika type image dari iphone
    const converted = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9,
    });

    // heic2any bisa return array atau single Blob
    const blob = Array.isArray(converted) ? converted[0] : converted;
    
    // return file valid untuk dikompress
    return new File(
        [blob],
        file.name.replace(/\.(heic|heif)$/i, '.jpg'),
        { type: 'image/jpeg' }
    );
};