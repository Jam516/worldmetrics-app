import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator";

function AboutBlock() {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-left">
                <h2 className="font-bold text-sm">What is Worldcoin?</h2>
                <p className="pb-4">Worldcoin is a decentralised identify and finance network.</p>
                <p className="pb-4">The WorldApp wallet allows users to make four types of transactions (CLAIM, CLAIM RESERVED, TRANSFER and SWAP)</p>
                <p >These wallet transactions are batched into bundle transactions that are executed on the Optimism L2.</p>
            </div>
            <div className="flex flex-col items-left">
                <h2 className="font-bold text-sm">What is Keymetrics.world?</h2>
                <p>Keymetrics.world unbundles onchain data to surface the latest patterns and trends in WorldApp usage.</p>
            </div>
        </div>
    )
}


export default function Loading() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 pt-6">
                    <AboutBlock />
                    <Separator className="bg-black" />
                    <div className="grid gap-4 grid-cols-3">
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">*ACTIVE WALLET = MADE A WALLET TRANSACTION</p>
                </div>
            </div>
            <div className="flex flex-col md:hidden">
                <div className="flex-1 space-y-4 pt-6">
                    <AboutBlock />
                    <Separator className="bg-black" />
                    <div className="grid gap-4 grid-cols-2">
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">*ACTIVE WALLET = MADE A WALLET TRANSACTION</p>
                </div>
            </div>
        </>

    );
}