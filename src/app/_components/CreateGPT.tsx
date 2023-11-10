"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function CreateGPT() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");

  const createGPT = api.gpt.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createGPT.mutate({
          url,
          name,
          description,
          creator,
        });
      }}
      className="flex flex-col gap-2"
    >
      <Input
        type="text"
        placeholder="URL to your GPT"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Name your GPT"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Add a short description about what this GPT does"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Name of the creator"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
      />
      <Button
        type="submit"
        disabled={createGPT.isLoading}
      >
        {createGPT.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
