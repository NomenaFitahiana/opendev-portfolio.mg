
import "@testing-library/jest-dom";
import { afterAll, beforeAll} from "vitest";


const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const msg = String(args[0] ?? "");
    if (
      msg.includes("Better Auth") ||
      msg.includes("Unexpected error") ||
      msg.includes("UNAUTHORIZED")
    ) return;
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});