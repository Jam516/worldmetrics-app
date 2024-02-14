import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { TimeSelect } from "@/components/time-select";
import { Separator } from "@/components/ui/separator";
import { getOverviewData } from "@/app/actions/getOverviewData";
import MSABarChart from "@/components/marketshare-chart-actions";
import LChart from "@/components/line-chart";
import { ChevronUp, ChevronsUp, ChevronDown, ChevronsDown } from 'lucide-react';

export const metadata: Metadata = {
    title: "Keymetrics.World",
    description: "Worldcoin usage data",
};

export const maxDuration = 60;

function AboutBlock() {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-left">
                <h2 className="font-bold text-sm">What is Worldcoin?</h2>
                <p className="pb-4">Worldcoin is a decentralised identity and finance network.</p>
                <p className="pb-4">The WorldApp wallet allows users to make four types of transactions (CLAIM, CLAIM RESERVED, TRANSFER and SWAP)</p>
                <p >These wallet transactions are batched into bundle transactions that are executed on the Optimism L2.</p>
            </div>
            <div className="flex flex-col items-left">
                <h2 className="font-bold text-sm">What is Keymetrics.world?</h2>
                <p>Keymetrics.world analyzes onchain data to surface the latest patterns and trends in WorldApp usage.</p>
            </div>
        </div>
    )
}

export default async function UsersPage({ params }: { params: { slug: string } }) {

    let timeframe = params.slug[0];
    if (timeframe === undefined) {
        timeframe = "week"
    };

    let titleparam: string = "Weekly";
    if (timeframe === 'week') {
        titleparam = 'Weekly';
    } else if (timeframe === 'day') {
        titleparam = 'Daily';
    } else if (timeframe === 'month') {
        titleparam = 'Monthly';
    }

    const data = await getOverviewData({ timeframe });

    interface GrowthIconProps {
        growthValue: number;
    }

    function GrowthIcon({ growthValue }: GrowthIconProps) {
        if (growthValue > 50) {
            return <ChevronsUp className="pl-1" />;
        } else if (growthValue > 0) {
            return <ChevronUp className="pl-1" />;
        } else if (growthValue < 0) {
            return <ChevronDown className="pl-1" />;
        } else {
            return <ChevronsDown className="pl-1" />;
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 pt-6">
                    <AboutBlock />
                    <Separator className="bg-black" />
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        {/* First and Fourth cards (24h stats)*/}
                        <StatCard
                            title="PAST DAY ACTIVE WALLETS"
                            className="border-black shadow md:order-1"
                            content={data.actives_24h[0].ACTIVE_WALLETS.toLocaleString()}
                        />
                        <StatCard
                            title="PAST DAY ACTIVE WALLET GROWTH"
                            className="border-black shadow md:order-4"
                            content={
                                <>
                                    <div className="flex flex-row items-center">
                                        {`${data.actives_growth_24h[0].DAILY_GROWTH.toLocaleString()}%`}
                                        <GrowthIcon growthValue={data.actives_growth_24h[0].DAILY_GROWTH} />
                                    </div>
                                </>
                            }
                        />

                        {/* Second and Fifth cards (7d stats) - order adjusted for md screens */}
                        <StatCard
                            title="PAST WEEK ACTIVE WALLETS"
                            className="border-black shadow md:order-2"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                        />
                        <StatCard
                            title="PAST WEEK ACTIVE WALLET GROWTH"
                            className="border-black shadow md:order-5"
                            content={
                                <>
                                    <div className="flex flex-row items-center">
                                        {`${data.actives_growth_7d[0].WEEKLY_GROWTH.toLocaleString()}%`}
                                        <GrowthIcon growthValue={data.actives_growth_7d[0].WEEKLY_GROWTH} />
                                    </div>
                                </>
                            }
                        />

                        {/* Third and Sixth cards (1m stats) - order adjusted for md screens */}
                        <StatCard
                            title="PAST MONTH ACTIVE WALLETS"
                            className="border-black shadow md:order-3"
                            content={data.actives_1m[0].ACTIVE_WALLETS.toLocaleString()}
                        />
                        <StatCard
                            title="PAST MONTH ACTIVE WALLET GROWTH"
                            className="border-black shadow md:order-6"
                            content={
                                <>
                                    <div className="flex flex-row items-center">
                                        {`${data.actives_growth_1m[0].MONTHLY_GROWTH.toLocaleString()}%`}
                                        <GrowthIcon growthValue={data.actives_growth_1m[0].MONTHLY_GROWTH} />
                                    </div>
                                </>
                            }
                        />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">*ACTIVE WALLET = MADE A WALLET TRANSACTION</p>
                    <Separator className="bg-black" />
                    <TimeSelect />
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Wallet Transactions"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.transactions_chart} yaxis={'TRANSACTIONS'} usd={false} fill={"#2a9d8f"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Active Accounts"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.active_accounts_chart} yaxis={'ACTIVE_WALLETS'} usd={false} fill={"#3454D1"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{"Share of " + titleparam + " Wallet Transactions by Type"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <MSABarChart data={data.transactions_type_chart} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};