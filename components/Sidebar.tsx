import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
  Building
} from "lucide-react";

const Sidebar = () => {
  return (
    <Command className="bg-secondary">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4"/>
            <Link href="/">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Building className="mr-2 h-4 w-4"/>
            <Link href="/facility">Facility Management</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4"/>
            <Link href="/Notices">Notices Management</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
