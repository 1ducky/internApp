import { RecapType } from "@/generated/prisma/enums";
import { recapRepository } from "./recap.repository";

export type RecaptDto = {
    recapAt: Date
    type: RecapType;
    value: number
}

export type RawRecap = Awaited<ReturnType<typeof recapRepository.getRecap>>

export const toRecapDto = (rawRecap: RawRecap) => {

    const recap: RecaptDto[] = rawRecap.map((item) => {
        return {
            recapAt: item.recapAt,
            type: item.type,
            value: item.total
        }
    })
    return recap
}

