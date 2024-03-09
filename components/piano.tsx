'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Toggle } from './ui/toggle';

const items = [
  { id: '1', label: 'C' },
  { id: '2', label: 'C#' },
  { id: '3', label: 'D' },
  { id: '4', label: 'D#' },
  { id: '5', label: 'E' },
  { id: '6', label: 'F' },
  { id: '7', label: 'F#' },
  { id: '8', label: 'G' },
  { id: '9', label: 'G#' },
  { id: '10', label: 'A' },
  { id: '11', label: 'A#' },
  { id: '12', label: 'B' }
];

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.'
  })
});

export function Piano() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
    // defaultValues: {
    //   items: ['recents', 'home']
    // }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="flex gap-4 items-center">
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Toggle
                            className="h-12 w-12"
                            onClick={() => {
                              return field.value?.includes(item.id)
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          >
                            <FormLabel className="cursor-pointer text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </Toggle>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
