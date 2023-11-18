'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

export function AddGPTPopover() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");

  const createGPT = api.gpt.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setUrl("");
      setName("");
      setDescription("");
      setCreator("");
    },
  });

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button onClick={
          () => setIsOpen((prev) => !prev)
        } className="ml-auto">➕ Add a GPT</Button>
      </PopoverTrigger>
      <PopoverContent>
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
            onClick={() => setIsOpen(false)}
            type="submit"
            disabled={createGPT.isLoading}
          >
            {createGPT.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
