"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useFileUpload, type FileWithPreview } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type FileUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  path?: string;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

export function FileUpload({
  value,
  onChange,
  bucket = "testimonials",
  path = "avatars",
  maxSizeMB = 2,
  className,
  disabled,
}: FileUploadProps) {
  const maxSize = maxSizeMB * 1024 * 1024;
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    value ? "success" : "idle",
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string>("");

  const supabase = createClient();

  const uploadToSupabase = useCallback(
    async (file: File): Promise<string | null> => {
      setUploadStatus("uploading");
      setUploadProgress(0);
      setUploadError("");

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        setUploadError(error.message);
        toast.error(error.message);
        setUploadStatus("error");
        return null;
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      if (!urlData.publicUrl) {
        setUploadError("Impossible d'obtenir l'URL du fichier");
        setUploadStatus("error");
        return null;
      }

      setUploadProgress(100);
      setUploadStatus("success");
      return urlData.publicUrl;
    },
    [bucket, path, supabase.storage],
  );

  const handleFilesAdded = useCallback(
    async (files: FileWithPreview[]) => {
      if (files.length === 0) return;

      const file = files[0].file;
      if (!(file instanceof File)) return;

      const publicUrl = await uploadToSupabase(file);
      if (publicUrl) {
        onChange(publicUrl);
      }
    },
    [onChange, uploadToSupabase],
  );

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
      clearFiles,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    onFilesAdded: handleFilesAdded,
  });

  const previewUrl = files[0]?.preview || value || null;

  const handleRemove = useCallback(async () => {
    if (value) {
      const filePath = value.split(`${bucket}/`)[1];
      if (filePath) {
        await supabase.storage.from(bucket).remove([filePath]);
      }
    }

    clearFiles();
    onChange("");
    setUploadStatus("idle");
    setUploadProgress(0);
    setUploadError("");
  }, [bucket, clearFiles, onChange, supabase.storage, value]);

  const displayError = uploadError || (errors.length > 0 ? errors[0] : "");

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="relative">
        <div
          className={cn(
            "relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50",
            isDragging ? "border-primary bg-accent/50" : "border-input",
            uploadStatus === "uploading" && "bg-accent/30",
            displayError && "border-destructive",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
            disabled={disabled || uploadStatus === "uploading"}
          />

          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {uploadStatus === "uploading" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
                  <div className="flex flex-col items-center gap-2">
                    <UploadIcon className="w-6 h-6 animate-pulse text-primary" />
                    <p className="text-sm font-medium">Upload en cours...</p>
                    <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <img
                alt={files[0]?.file?.name || "Uploaded image"}
                className={cn(
                  "mx-auto max-h-full rounded object-contain",
                  uploadStatus === "uploading" && "opacity-50",
                )}
                src={previewUrl}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 font-medium text-sm">
                Glissez votre image ici
              </p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG ou GIF (max. {maxSizeMB}MB)
              </p>
              <Button
                type="button"
                className="mt-4"
                onClick={openFileDialog}
                variant="outline"
                disabled={disabled || uploadStatus === "uploading"}
              >
                <UploadIcon
                  aria-hidden="true"
                  className="-ms-1 size-4 opacity-60"
                />
                Sélectionner une image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              aria-label="Remove image"
              size="icon"
              variant="destructive"
              onClick={handleRemove}
              disabled={disabled}
            >
              <XIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        )}
      </div>

      {displayError && (
        <div
          className="flex items-center gap-1 text-destructive text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {uploadStatus === "success" && (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <ImageIcon className="size-3" />
          Image uploadée avec succès
        </p>
      )}
    </div>
  );
}
