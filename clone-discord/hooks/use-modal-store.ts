import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";
//10:modalstore
//12.2 to invite people when they click on the invite peopple
//14.1 :server settings : edit server
//15.1:mangae memebers :added members here 
//16.1:channel : adding create chnnel for the channel c reatin model
export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";
interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
/* defining the potentiol items we can send in the modal not 
only  setting the type but also data ,onopen has a type and dat
if we pass in the data  it will be store in the modal store like gonna open  the invite model
with some infirmation about  that server , we are going to send the server
inside the  data using  the onopen function*/