import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  Building
} from "lucide-react";

const Sidebar = () => {
  return (
    <Command className="bg-secondary">
      <CommandInput className="text-base" placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty className="text-base">No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-5 w-5"/>
            <Link href="/" className="text-base">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Building className="mr-2 h-5 w-5"/>
            <Link href="/facility" className="text-base">Facility Management</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-5 w-5"/>
            <Link href="/notice" className="text-base">Notices Management</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem className="text-base">Profile</CommandItem>
          <CommandItem className="text-base">Billing</CommandItem>
          <CommandItem className="text-base">Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
