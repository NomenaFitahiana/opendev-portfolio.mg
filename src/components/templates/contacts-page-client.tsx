"use client";

import { useState } from "react";
import { ContactMock, ContactStatus } from "@/mocks/contacts";
import { ContactListItem } from "./contact-list-item";
import { ContactDetail } from "@/components/templates/contact-detail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TabType = "inbox" | "awaiting" | "archived";

const tabs: { id: TabType; label: string; status: ContactStatus[] }[] = [
  { id: "inbox", label: "Inbox", status: ["UNREAD", "READ"] },
  { id: "awaiting", label: "Awaiting approval", status: ["AWAITING"] },
  { id: "archived", label: "Archived", status: ["ARCHIVED"] },
];

function getContactsByStatus(contacts: ContactMock[], status: ContactStatus[]): ContactMock[] {
  return contacts.filter((contact) => status.includes(contact.status));
}

function getUnreadCount(contacts: ContactMock[]): number {
  return contacts.filter((c) => c.status === "UNREAD").length;
}

function getAwaitingCount(contacts: ContactMock[]): number {
  return contacts.filter((c) => c.status === "AWAITING").length;
}

function getArchivedCount(contacts: ContactMock[]): number {
  return contacts.filter((c) => c.status === "ARCHIVED").length;
}

export function ContactsPageClient({ initialContacts }: { initialContacts: ContactMock[] }) {
  const [activeTab, setActiveTab] = useState<TabType>("inbox");
  const [selectedContact, setSelectedContact] = useState<ContactMock | null>(null);
  const [contacts, setContacts] = useState(initialContacts);

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const filteredContacts = getContactsByStatus(contacts, currentTab.status);

  const handleStatusChange = (contactId: string, newStatus: ContactStatus) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, status: newStatus } : c))
    );
    setSelectedContact((prev) => (prev?.id === contactId ? { ...prev, status: newStatus } : prev));
  };

  const handleSelectContact = (contact: ContactMock) => {
    setSelectedContact(contact);
    if (contact.status === "UNREAD") {
      handleStatusChange(contact.id, "READ");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Demandes de contact</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Gérez vos demandes de contact et devis.
        </p>
      </div>

      <div className="flex gap-1 border-b">
        <button
          onClick={() => {
            setActiveTab("inbox");
            setSelectedContact(null);
          }}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === "inbox"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Inbox
          <span className="ml-2 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs px-1.5 py-0.5 rounded-full">
            {getUnreadCount(contacts)}
          </span>
          {activeTab === "inbox" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("awaiting");
            setSelectedContact(null);
          }}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === "awaiting"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Awaiting approval
          <span className="ml-2 bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs px-1.5 py-0.5 rounded-full">
            {getAwaitingCount(contacts)}
          </span>
          {activeTab === "awaiting" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("archived");
            setSelectedContact(null);
          }}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === "archived"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Archived
          <span className="ml-2 bg-zinc-500/20 text-zinc-700 dark:text-zinc-300 text-xs px-1.5 py-0.5 rounded-full">
            {getArchivedCount(contacts)}
          </span>
          {activeTab === "archived" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
          )}
        </button>
      </div>

      {selectedContact ? (
        <Card className="flex-1">
          <CardContent className="p-0 h-full">
            <ContactDetail
              contact={selectedContact}
              onStatusChange={handleStatusChange}
              onBack={() => setSelectedContact(null)}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {currentTab.label}
              <span className="ml-2 text-muted-foreground font-normal">
                ({filteredContacts.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredContacts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                Aucun message dans cette catégorie.
              </div>
            ) : (
              <div className="divide-y">
                {filteredContacts.map((contact) => (
                  <ContactListItem
                    key={contact.id}
                    contact={contact}
                    onClick={() => handleSelectContact(contact)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}