"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Contact, ContactStatus } from "@/types/contact";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  archiveContactAction,
  markContactAsUnreadAction,
  setContactAwaitingAction,
  deleteContactAction,
  markContactAsReadAction,
} from "@/actions";

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

function formatDate(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ContactDetailProps {
  contact: Contact;
  onStatusChange: (contactId: string, newStatus: ContactStatus) => void;
  onBack: () => void;
}

export function ContactDetail({ contact, onStatusChange, onBack }: ContactDetailProps) {
  const router = useRouter();
  const [replyText, setReplyText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleStatusChange = (action: () => Promise<{ serverError?: string }>, newStatus: ContactStatus) => {
    startTransition(async () => {
      await action();
      onStatusChange(contact.id, newStatus);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteContactAction({ id: contact.id });
      router.refresh();
      onBack();
    });
  };

  const handleMarkAsRead = () => {
    startTransition(async () => {
      await markContactAsReadAction({ id: contact.id });
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          title="Retour"
          onClick={onBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          title="Marquer comme non lu"
          disabled={isPending}
          onClick={() => handleStatusChange(() => markContactAsUnreadAction({ id: contact.id }), "UNREAD")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          title="Archiver"
          disabled={isPending}
          onClick={() => handleStatusChange(() => archiveContactAction({ id: contact.id }), "ARCHIVED")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-archive"
          >
            <rect width="20" height="5" x="2" y="3" rx="1" />
            <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
            <path d="M10 12h4" />
            <path d="M2 6h20" />
          </svg>
        </Button>

        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              title="Supprimer"
              className="text-destructive hover:text-destructive"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer le message</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer ce message de {contact.name}? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="icon"
          title="En attente"
          disabled={isPending}
          onClick={() => handleStatusChange(() => setContactAwaitingAction({ id: contact.id }), "AWAITING")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clock"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar size="lg" className="shrink-0">
            <AvatarFallback className={cn(getAvatarColor(contact.name), "font-medium text-lg")}>
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.email}</p>
            {contact.budget && (
              <p className="text-xs text-muted-foreground mt-1">
                Budget: {contact.budget}
              </p>
            )}
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-2">
          Reçu le {formatDate(contact.createdAt)}
        </div>

        <div className="p-4 bg-muted/30 rounded-lg whitespace-pre-wrap">
          {contact.message}
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Tapez votre réponse..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={4}
          />
          <div className="flex justify-end">
            <Button onClick={handleMarkAsRead} disabled={!replyText.trim()}>
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}