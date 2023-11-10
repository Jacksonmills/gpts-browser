import React from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CreateGPT } from './CreateGPT';

export function AddGPTPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto">➕ Add a GPT</Button>
      </PopoverTrigger>
      <PopoverContent>
        <CreateGPT />
      </PopoverContent>
    </Popover>
  );
}
