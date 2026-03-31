"use client";

import {
  MultiStepModal,
  MultiStepModalContent,
  MultiStepModalSteps,
} from "@/components/ui/multi-step-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { deleteProjectAction } from "@/actions/project.action";
import { toast } from "sonner";
import { Loader } from "../ui/loader";
import { AlertCircle, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type DeleteProjectModalProps = {
  id: string;
  title: string;
  withLabel?: boolean;
};

export const DeleteProjectModal = ({
  id,
  title,
  withLabel = false,
}: DeleteProjectModalProps) => {
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { execute, isPending } = useAction(deleteProjectAction, {
    onSuccess: () => {
      setOpen(false);
      toast.success("Projet supprimé.");
    },
    onError: () => toast.error("Erreur."),
  });

  const steps: MultiStepModalSteps[] = [
    {
      title: <h5 className="flex items-center gap-2 font-medium text-base text-primary-foreground">
        <AlertCircle size={18} color="orange" /> Attention
      </h5>,
      description:
        "Cette action est irréversible. Toutes les données seront supprimées.",
    },
    {
      title: "Conséquences",
      description:
        "Images, technologies et toutes les informations seront perdues.",
    },
    {
      title: "Confirmation",
      description: (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Tapez <span className="font-medium">{title}</span> pour confirmer
          </p>
          <input
            className="border rounded px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="destructive"
            disabled={input !== title || isPending}
            onClick={() => execute({ id })}
          >
            {isPending ? (
              <>
                <Loader /> Suppression...
              </>
            ) : (
              "Supprimer définitivement"
            )}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {!withLabel && <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="flex items-center gap-2"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash2 size={18} /> {withLabel && "Supprimer"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Supprimer
        </TooltipContent>
      </Tooltip>}
      {withLabel && <Button
        className="flex items-center gap-2"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={18} /> Supprimer
      </Button>}
      <MultiStepModal open={open} onOpenChange={setOpen}>
        <MultiStepModalContent steps={steps} />
      </MultiStepModal>
    </>
  );
};
