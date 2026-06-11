import { RecapType } from "@/generated/prisma/enums";
import { recapRepository } from "./recap.repository";

export type RecaptDto = {
    recapAt: Date
    type: RecapType;
    value: number
}

export type Metrickey = "POST" | "USER"
export type GrupedRecap = Partial<Record<Metrickey, RecaptDto[]>>
export type RawRecap = Awaited<ReturnType<typeof recapRepository.getRecap>>

export const toRecapDto = (rawRecap: RawRecap): GrupedRecap => {

    const recap: RecaptDto[] = rawRecap.map((item) => {
        return {
            recapAt: item.recapAt,
            type: item.type,
            value: item.total
        }
    })

    const grupedRecap = recap.reduce((acc, item) => {
        acc[item.type] = [...(acc[item.type] ?? []), item];
        return acc;
    }, {} as GrupedRecap)
    return grupedRecap
}

