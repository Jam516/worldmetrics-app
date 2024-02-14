import { unstable_noStore as noStore } from "next/cache";

interface OverviewDataParams {
    timeframe: string;
}

interface OverviewData {
    time: string,
    actives_24h: { ACTIVE_WALLETS: number }[],
    actives_growth_24h: { DAILY_GROWTH: number }[],
    actives_7d: { ACTIVE_WALLETS: number }[],
    actives_growth_7d: { WEEKLY_GROWTH: number }[],
    actives_1m: { ACTIVE_WALLETS: number }[],
    actives_growth_1m: { MONTHLY_GROWTH: number }[],
    active_accounts_chart: any[],
    transactions_chart: any[],
    transactions_type_chart: any[],
    account_deployments_chart: any[],
}

export async function getOverviewData({ timeframe }: OverviewDataParams): Promise<OverviewData> {
    noStore();
    const response = await fetch(`https://worldmetrics-api.onrender.com/overview?timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const overviewData: OverviewData = await response.json();
    // console.log('Time');
    // console.log(overviewData.time);

    return overviewData;
}