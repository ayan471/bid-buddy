import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.query.bids.findMany();
  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await database.insert(bidsSchema).values({});
          revalidatePath("/");
        }}
      >
        <Input type="number" name="bid" placeholder="Bid" />
        <Button type="submit">Place Bid</Button>
        {bids.map((bid) => (
          <div key={bid.id}>{bid.id}</div>
        ))}
      </form>
    </main>
  );
}
