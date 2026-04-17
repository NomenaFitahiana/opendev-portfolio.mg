import { getContacts } from "@/lib/query/contact.query";
import { createMetadata } from "@/lib/metadata";
import { ContactsPageClient } from "./contacts-page-client";

export const metadata = createMetadata({ title: "Demandes de contact" });

export default async function ContactsPage() {
  const { contacts } = await getContacts();
  return <ContactsPageClient initialContacts={contacts} />;
}