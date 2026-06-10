import BarChart from "./static.barChart";
import LineChart from "./static.lineChart";
import { ChartType } from "./static.data";
import { RecaptDto } from "@/services/recap/recap.dto";

export function StatView({ chartType, data, metricKey, backDay }: { chartType: ChartType, data: RecaptDto[], metricKey: string, backDay: number }) {
    return (
        <>
            <div className="h-52 w-full">
                {chartType === "line" ? (
                    <LineChart data={data} metricKey={metricKey} backDay={backDay} />
                ) : (
                    <BarChart data={data} metricKey={metricKey} backDay={backDay} />
                )}
            </div>
        </>
    )
}