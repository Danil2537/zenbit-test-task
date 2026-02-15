export type ErrorResponse = {
    message?: string | string[];
  };
  
  export function isErrorResponse(
    value: unknown
  ): value is ErrorResponse {
    return (
      typeof value === "object" &&
      value !== null &&
      "message" in value
    );
  }
  
  export const getErrorMessage = (response: unknown) => {
    if (isErrorResponse(response) && response.message) {
      const message = Array.isArray(response.message)
        ? response.message[0]
        : response.message;
  
      return formatErrorMessage(message);
    }
  
    return "Unknown error occurred.";
  };
  
  const formatErrorMessage = (message: string) =>
    message.charAt(0).toUpperCase() + message.slice(1);