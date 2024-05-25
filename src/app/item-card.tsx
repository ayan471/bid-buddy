import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { getImageUrl } from "@/util/files";
import Image from "next/image";
import Link from "next/link";
import { formatToDollar } from "../util/currency";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div key={item.id} className="border p-8  space-y-2 rounded-xl">
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.fileKey}
        width={200}
        height={200}
      />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price: ${formatToDollar(item.startingPrice)}
      </p>
      <Button asChild>
        <Link href={`/items/${item.id}`}>Place Bid</Link>
      </Button>
    </div>
  );
}
