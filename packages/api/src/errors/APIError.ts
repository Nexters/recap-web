import { z } from "zod";

export type ApiMeta = {
  errorType?: string;
  errorMessage?: string;
};

export class APIError extends Error {
  public status?: number;
  public meta?: ApiMeta;
  public url?: string;
  public method?: string;

  constructor(
    message: string,
    opts?: {
      status?: number;
      meta?: ApiMeta;
      url?: string;
      method?: string;
      cause?: unknown;
    },
  ) {
    super(
      message,
      opts?.cause ? ({ cause: opts.cause } as ErrorOptions) : undefined,
    );

    this.name = "APIError";
    this.status = opts?.status;
    this.meta = opts?.meta;
    this.url = opts?.url;
    this.method = opts?.method;
  }
}

export function wrapZodError(err: unknown, url?: string, method?: string) {
  if (err instanceof z.ZodError) {
    const msg = generateZodError(err);

    console.error(
      `[Zod Validate Log]\n- api-url: ${url || "endpoint"}\n- method: ${method || "UNKNOWN"}\n`,
      err,
    );

    throw new APIError(msg, {
      meta: { errorType: "ZOD_ERROR", errorMessage: msg },
      url,
      method,
    });
  }
  throw err;
}

const generateZodError = (error: z.ZodError) => {
  let message = "";

  error.issues.forEach((issue) => {
    if (issue.code === "invalid_type") {
      const expected = issue.expected;
      const received = issue.input;
      message = `Error: Invalid data at path ${issue.path.join(" -> ")}
- Code: ${issue.code}
- Expected: ${expected}
- Received: ${received}
- Message: ${issue.message}`;
    }
  });

  return message;
};

export const catchAPIError = (error: Error | unknown) => {
  console.log(error);

  if (error instanceof APIError) {
    return console.error(error.message);
  }

  if (error instanceof Error) {
    return console.error(error.message);
  }

  console.error("지금 요청을 처리할 수 없습니다. 잠시 후 다시 시도하세요.");
};
