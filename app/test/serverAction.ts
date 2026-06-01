'use server'

import { supabase } from "@/libs/supabase";

export const uploadImage = async (file: File) => {
    const res = await supabase.storage.from('Images').upload(`feeds/${file.name}`, file)
    return res
}