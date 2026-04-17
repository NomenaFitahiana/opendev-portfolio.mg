"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Contact, ContactStatus } from "@/types/contact";

const CATEGORY_COLORS = [
  "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  "bg-green-500/20 text-green-700 dark:text-green-300",
  "bg-purple-500/20 text-purple-700 dark:text-purple-300",
  "bg-orange-500/20 text-orange-700 dark:text-orange-300",
  "bg-zinc-500/20 text-zinc-700 dark:text-zinc-300",
];

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  const firstLetter = name[0].toUpperCase();
  const charCode = firstLetter.charCodeAt(0) - 65;
  return CATEGORY_COLORS[charCode % CATEGORY_COLORS.length];
}

function truncateMessage(message: string, maxLength: number = 60): string {
  if (message.length <= maxLength) return message;
  return message.slice(0, maxLength) + "...";
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Aujourd'hui";
  } else if (diffDays === 1) {
    return "Hier";
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jours`;
  } else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  }
}

interface ContactListItemProps {
  contact: Contact;
  onClick?: () => void;
  isSelected?: boolean;
}

export function ContactListItem({ contact, onClick, isSelected }: ContactListItemProps) {
  const isUnread = contact.status === "UNREAD";

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
        isUnread && "bg-muted/30",
        isSelected && "bg-muted"
      )}
    >
      {isUnread && (
        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
      )}

      <Avatar size="default" className="shrink-0">
        <AvatarFallback className={cn(getAvatarColor(contact.name), "font-medium")}>
          {getInitials(contact.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className={cn("font-medium truncate", isUnread && "font-semibold")}>
            {contact.name}
          </p>
          <span className="text-xs text-muted-foreground shrink-0">
            {formatDate(contact.createdAt)}
          </span>
        </div>
        <p className={cn("text-sm text-muted-foreground truncate", isUnread && "text-foreground")}>
          {truncateMessage(contact.message)}
        </p>
      </div>
    </div>
  );
}
