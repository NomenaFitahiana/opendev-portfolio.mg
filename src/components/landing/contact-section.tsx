"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "../ui/tanstack-form";
import { Loader } from "../ui/loader";
import { contactSchema } from "@/schemas";
import { requestQuoteAction } from "@/actions";
import { toast } from "sonner";

const BUDGET_OPTIONS = [
  { value: "less_1k", label: "< 1 000 €" },
  { value: "1k_5k", label: "1 000 € - 5 000 €" },
  { value: "5k_10k", label: "5 000 € - 10 000 €" },
  { value: "10k_plus", label: "> 10 000 €" },
  { value: "undefined", label: "Non défini" },
];

const CONTACT_INFO = [
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: "contact@opendev.mg",
    href: "mailto:contact@opendev.mg",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Téléphone",
    value: "+261 34 22 037 90",
    href: "tel:+261342203790",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Localisation",
    value: "Antananarivo, Madagascar",
    href: null,
  },
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm({
    schema: contactSchema,
    defaultValues: {
      name: "",
      email: "",
      projectDescription: "",
      budget: "",
    },
    onSubmit: async (values) => {
      setStatus("loading");
      const { serverError } = await requestQuoteAction({ ...values });
      if (serverError) {
        toast.error(serverError ?? "Une erreur inattendue est survenue. Veuillez reessayer plus tard");
        return;
      }
      setStatus("success");
      form.reset();
    }
  });

  return (
    <section id="contact" className="py-24 bg-muted/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 text-xs tracking-widest uppercase px-3 py-1"
          >
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Discutons de votre projet
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Décrivez-nous votre besoin. Nous constituons une équipe dédiée et
            vous répondons sous 24h.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-5 py-20 text-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-green-500" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      Message envoyé !
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Merci pour votre demande. Un email de confirmation vous a
                      été envoyé. Nous vous répondrons dans les 24h.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                  >
                    Envoyer une autre demande
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} className="flex flex-col gap-3">
                    <form.AppField name="name">
                      {(field) => (
                        <field.Field>
                          <field.Label>Nom complet</field.Label>
                          <field.Content>
                            <field.Input type="text" placeholder="Andriamananana Jean" />
                            <field.Message />
                          </field.Content>
                        </field.Field>
                      )}
                    </form.AppField>

                    <form.AppField name="email">
                      {(field) => (
                        <field.Field>
                          <field.Label>Email</field.Label>
                          <field.Content>
                            <field.Input type="email" placeholder="andriamananana@gmail.com" />
                            <field.Message />
                          </field.Content>
                        </field.Field>
                      )}
                    </form.AppField>

                    <form.AppField name="projectDescription">
                      {(field) => (
                        <field.Field>
                          <field.Label>Description</field.Label>
                          <field.Content>
                            <field.Textarea
                              placeholder="Décrivez votre projet, vos besoins techniques, vos délais souhaités..."
                              rows={5}
                              className="resize-none"
                            />
                            <field.Message />
                          </field.Content>
                        </field.Field>
                      )}
                    </form.AppField>

                    <form.AppField name="budget">
                      {(field) => (
                        <field.Field>
                          <field.Label>Estimation de votre budget</field.Label>
                          <field.Content>
                            <Select
                              onValueChange={(value) => { field.setValue(value) }}
                              defaultValue={field.state.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionnez une fourchette" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUDGET_OPTIONS.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <field.Message />
                          </field.Content>
                        </field.Field>
                      )}
                    </form.AppField>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "loading"}
                      className="w-full  sm:w-auto gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader />
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer la demande
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Autres moyens de nous joindre
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Préférez-vous échanger directement ? Contactez-nous via l&apos;un
                de ces canaux.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-muted text-foreground shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/60 border border-border">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              <p className="text-xs text-muted-foreground">
                Temps de réponse moyen :{" "}
                <span className="font-medium text-foreground">
                  moins de 24h
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
