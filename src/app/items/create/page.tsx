import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 max-w-lg space-y-8">
      <h1 className="text-4xl  font-bold">Post an Item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4"
        action={createItemAction}
      >
        <Input
          required
          className="max-w-lg"
          type="name"
          name="bid"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          type="number"
          step="0.01"
          name="startingPrice"
          placeholder="What to start your auction at"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
