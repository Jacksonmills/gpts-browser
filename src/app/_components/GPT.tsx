import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { type api } from '@/trpc/server';
import { Button } from './ui/button';

type GPT = Awaited<ReturnType<typeof api.gpt.getOne.query>>;

export function GPT({
  gpt
}:
  {
    gpt: GPT;
  }) {
  if (!gpt) return <p>Loading...</p>;

  if (!(
    gpt.name &&
    gpt.description &&
    gpt.creator &&
    gpt.url
  )) return <p>Invalid GPT.</p>;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-4xl font-bold">{gpt.name}</h2>
        <p className='font-thin'>By: {gpt.creator}</p>
      </CardHeader>
      <CardContent>
        <p>{gpt.description}</p>
      </CardContent>
      <CardFooter className='border-t pt-6'>
        <a href={gpt.url} target="_blank">
          <Button variant={'outline'}>
            💬 Chat w/ GPT
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
