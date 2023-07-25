import { create } from "zustand";

interface UserSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUserSidebar = create<UserSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUserSidebar;
