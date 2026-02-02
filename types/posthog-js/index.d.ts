/**
 * Minimal PostHog types copied from
 * https://github.com/PostHog/posthog-js/tree/main/packages/types
 * so that `window.posthog` is typed without needing the runtime package.
 */

declare global {
  interface PosthogOptions {
    api_host: string;
    autocapture?: boolean;
    capture_pageview?: boolean;
    api_key?: string;
    loaded?: () => void;
    disable_session_recording?: boolean;
    defaults?: string;
    person_profiles?: 'always' | 'identified_only' | 'disabled';
  }

  interface PosthogInstance {
    __SV?: number;
    init(apiKey: string, options: PosthogOptions): void;
    capture(event: string, properties?: Record<string, unknown>): void;
    identify(distinctId: string): void;
    alias(distinctId: string): void;
    reset(): void;
    [method: string]: any;
  }

  interface Window {
    posthog?: PosthogInstance;
  }
}

export {};
