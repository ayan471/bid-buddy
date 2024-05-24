import { database } from "@/db/database";
export default async function Home() {
  const allItems = await database.query.items.findMany();
  return (
    <main className="container mx-auto py-12 max-w-lg space-y-8">
      <h1 className="text-4xl  font-bold">Items For Sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <div key={item.id} className="border p-8 rounded-xl">
            {item.name}
            starting price: ${item.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}
