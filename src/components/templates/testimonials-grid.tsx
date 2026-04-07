"use client";

import { useState } from "react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  deleteTestimonialAction,
  toggleTestimonialActiveAction,
} from "@/actions/testimonial.action";
import { toast } from "sonner";
import {
  Heart,
  MessageCircle,
  ExternalLink,
  Pencil,
  Trash2,
  Quote,
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader } from "../ui/loader";

type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  content: string;
  photo: string | null;
  active: boolean;
  createdAt: Date;
  project: {
    id: string;
    title: string;
    slug: string;
  } | null;
};

type TestimonialsGridProps = {
  testimonials: Testimonial[];
};

const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}j`;
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

function TweetCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { execute: toggleActive, isPending: isToggling } = useAction(
    toggleTestimonialActiveAction,
    {
      onSuccess: () => {
        toast.success(
          testimonial.active ? "Témoignage désactivé" : "Témoignage activé"
        );
      },
      onError: ({ error }) => toast.error(error.serverError ?? "Erreur"),
    }
  );

  const { execute: deleteTestimonial } = useAction(deleteTestimonialAction, {
    onSuccess: () => {
      toast.success("Témoignage supprimé");
      setShowDeleteDialog(false);
    },
    onError: ({ error }) => {
      toast.error(error.serverError ?? "Erreur lors de la suppression");
      setIsDeleting(false);
    },
  });

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTestimonial({ id: testimonial.id });
  };

  const initials = testimonial.clientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const date = formatDate(testimonial.createdAt);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "group relative px-2 py-3 overflow-hidden bg-card transition-all duration-300",
            "border-border/50 hover:border-border hover:shadow-lg hover:shadow-black/5",
            "dark:hover:shadow-black/20",
            !testimonial.active && "opacity-60 grayscale"
          )}
        >
          <div className="py-0 px-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Avatar className="h-10 w-10 rounded-full shrink-0 ring-2 ring-background">
                  <AvatarImage src={testimonial.photo ?? undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-sm font-bold text-foreground truncate">
                      {testimonial.clientName}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground truncate">
                    {testimonial.clientRole} · {date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className={cn(
                    "h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-200",
                    isHovered && "opacity-100"
                  )}
                  asChild
                >
                  <Link href={`/testimonials/${testimonial.id}/edit`}>
                    <Pencil className="h-3 w-3" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className={cn(
                    "h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-200 text-destructive hover:text-destructive",
                    isHovered && "opacity-100"
                  )}
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {testimonial.content}
              </p>
            </div>

            {testimonial.project && (
              <Link
                href={`/projects/${testimonial.project.id}`}
                className={cn(
                  "mt-3 flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 transition-colors",
                  "hover:bg-muted/80 group/project"
                )}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <ExternalLink className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-medium text-foreground truncate">
                    {testimonial.project.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Voir le projet
                  </span>
                </div>
              </Link>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => !isToggling && toggleActive({ id: testimonial.id })}
                  disabled={isToggling}
                  className={cn(
                    "flex items-center gap-1.5 text-xs transition-colors",
                    testimonial.active
                      ? "text-emerald-600 hover:text-emerald-700"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {testimonial.active ? (
                    <CheckCircle2 className="h-4 w-4 fill-emerald-100" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">
                    {testimonial.active ? "Publié" : "Brouillon"}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3.5 w-3.5" />
                  {date}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer ce témoignage ?</DialogTitle>
            <DialogDescription>
              Le témoignage de{" "}
              <span className="font-medium text-foreground">
                {testimonial.clientName}
              </span>{" "}
              sera définitivement supprimé. Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose disabled={isDeleting}>Annuler</DialogClose>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
            >
              {isDeleting ? <><Loader /> Suppression...</> : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  if (testimonials.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 py-20 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Quote className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">Aucun témoignage</h3>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          Vos témoignages clients apparaîtront ici. Ajoutez votre premier pour
          commencer.
        </p>
        <Button asChild>
          <Link href="/testimonials/new">
            <Plus className="h-4 w-4" />
            Nouveau témoignage
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {testimonials.map((t, index) => (
        <TweetCard key={t.id} testimonial={t} index={index} />
      ))}
    </motion.div>
  );
}
