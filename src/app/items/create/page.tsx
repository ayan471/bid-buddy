"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction, createUploadUrlAction } from "./actions";
import { useState } from "react";
import { pageTitleStyles } from "@/styles";

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Post an Item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!date) {
            return;
          }

          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
          });

          const name = formData.get("name") as string;
          const startingPrice = parseInt(
            formData.get("startingPrice") as string
          );
          const startingPriceInCents = Math.floor(startingPrice * 100);

          await createItemAction({
            name,
            startingPrice: startingPriceInCents,
            fileName: file.name,
            endDate: date,
          });
        }}
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
        <Input type="file" name="fille"></Input>
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
