"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

type EventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

type Event =
  | "project_viewed"
  | "project_deleted"
  | "testimonial_created"
  | "contact_request_viewed"
  | "contact_request_archived"
  | "form_submitted"
  | "form_error"
  | "dashboard_visited"
  | "insights_visited";

export function useAnalytics() {
  const posthog = usePostHog();

  const track = useCallback(
    (event: Event, properties?: EventProperties) => {
      if (!posthog) return;
      posthog.capture(event, properties);
    },
    [posthog],
  );

  const trackForm = useCallback(
    (formName: string, success: boolean, properties?: EventProperties) => {
      if (!posthog) return;
      posthog.capture("form_submitted", {
        form_name: formName,
        success,
        ...properties,
      });
    },
    [posthog],
  );

  const trackFormError = useCallback(
    (formName: string, errorField: string) => {
      if (!posthog) return;
      posthog.capture("form_error", {
        form_name: formName,
        error_field: errorField,
      });
    },
    [posthog],
  );

  return { track, trackForm, trackFormError };
}
