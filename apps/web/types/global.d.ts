export {};

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

interface GoogleIdentityServices {
  accounts: {
    id: {
      initialize: (options: GoogleIdInitializeOptions) => void;
      renderButton: (
        parent: HTMLElement,
        options: GoogleIdButtonOptions,
      ) => void;
      prompt: (momentListener?: (notification: unknown) => void) => void;
    };
  };
}

interface GoogleIdInitializeOptions {
  client_id: string;
  callback: (response: GoogleIdCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  prompt_parent_id?: string;
}

interface GoogleIdCredentialResponse {
  credential?: string;
  select_by?: string;
  clientId?: string;
}

type GoogleIdButtonOptions = {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: number;
  locale?: string;
};
