"use client";
//19...... edit Channel Modal:
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import qs from "query-string";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import { ChannelType } from "@prisma/client";
import { useEffect } from "react";

{/** formschema is preventing the user from keeping the nme of the chnnel as general
 */}
 const formSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required."
  }).refine(
   name=>name!=="general",
   {
    message:"Channel name can not be general"
   }

  ),
  type: z.nativeEnum(ChannelType)
 
});
//19....to add the chnnel type get the dat from use modl
export const EditChannelModal = () => {
  const { isOpen,onClose,type,data}=useModal();
  const {channelType,channel,server}=data;
  const router = useRouter();
  const params=useParams();
  const isModalOpen=isOpen && type== "editChannel"
  //we were getting the error down below "onSubmit " after  giving defalut value of type  as the text error ws gone
  //we were getting the error in the useeffect if condtion when passed channeltype.text only
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:ChannelType.TEXT || channel?.type,
    }
  });
//19..... so the  when we click on the audio channl is clicked , the audio channel is already selected by default 

useEffect(()=>{
 if(channel){
  form.setValue("type",channel.type);
form.setValue("name",channel.name)
 }

},[form,channel]);
  const isLoading = form.formState.isSubmitting;
{/* the const url will append the server id query so we will know where to create the chnnelw */}
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const url = qs.stringifyUrl({
      url: `/api/channels/${channel?.id}`,
      query: {
        //serverId: params?.serverId
        //instead of using params we can use server frorm our data 
        serverId:server?.id
      }
    });
    await axios.patch(url, values);

    form.reset();
    router.refresh();
    onClose();
  } catch (error) {
    console.log(error);
  }
}
  const handleClose=()=>{
    form.reset();
    onClose();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit your Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}

              />
              <FormField 
              control={form.control}
              name="type"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Channel Type</FormLabel>
                  <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                   >
                    <FormControl>
                      <SelectTrigger
                      className="bg-zinc-300/50 border-0 focus:ring-0
                      text-black ring-offset-0 focus:ring-offset-0 capitalize
                      outline-none"
                      
                      >
                      <SelectValue 
                      placeholder="Select a channel Type"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
  </SelectItem>
                      )
                      )}
                    </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}