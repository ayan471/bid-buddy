import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { bids as bidsSchema, items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const allItems = await database.query.items.findMany();

  const session = await auth();

  if (!session) return null;
  const user = session.user;

  if (!user) return null;

  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}
      {session?.user?.name}

      <form
        action={async (formData) => {
          "use server";
          // const bid = formData.get("bid") as string;
          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input type="name" name="bid" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
        {allItems.map((item) => (
          <div key={item.id}>{item.id}</div>
        ))}
      </form>
    </main>
  );
}
