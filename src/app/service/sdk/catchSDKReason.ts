import { ClientRequestError } from "@dynatrace-sdk/client-classic-environment-v2/types/packages/client/classic-environment-v2/src/lib/error-envelopes/client-request-error";
import { ErrorEnvelope } from "../../../models/response-error";
import {
  handleAllErrorsFunction,
  handleFinallyFunction,
  handleErrorMessage,
  handleHttpError,
  handleResourceNotFoundFunction,
  handleUnexpectedError,
  SDKResponseCallbacks,
} from "./SDKResponseHandler";

export const RESOURCE_NOT_FOUND_STATUS = 404;

function handleErrorEnvelopeError<T>(
  clientRequestError: ClientRequestError<string>,
  sdkResponseCallbacks: SDKResponseCallbacks<T>
): boolean {
  try {
    const errorEnvelope = JSON.parse(clientRequestError.body) as ErrorEnvelope;

    if (errorEnvelope.error?.message && errorEnvelope.error.message != "") {
      handleErrorMessage<T>(sdkResponseCallbacks, errorEnvelope.error.message);
      return true;
    }
  } catch (parseError) {
    console.log("Parse Error: ", clientRequestError.body);
    handleUnexpectedError<T>(sdkResponseCallbacks);
    return true;
  }
  return false;
}

function handleClientRequestError<T>(
  reason: any,
  sdkResponseCallbacks: SDKResponseCallbacks<T>
): boolean {
  const clientRequestError = reason as ClientRequestError<string>;
  if (clientRequestError.errorType === "Http Error") {
    if (clientRequestError.response.status === RESOURCE_NOT_FOUND_STATUS) {
      handleResourceNotFoundFunction<T>(sdkResponseCallbacks);
      return true;
    } else {
      handleHttpError<T>(sdkResponseCallbacks, clientRequestError);
      return true;
    }
  }

  return handleErrorEnvelopeError<T>(clientRequestError, sdkResponseCallbacks);
}

function handleFreeFormatResponseError<T>(
  reason: any,
  sdkResponseCallbacks: SDKResponseCallbacks<T>
): boolean {
  if ("cause" in reason) {
    handleUnexpectedError<T>(sdkResponseCallbacks);
  }
  return handleClientRequestError<T>(reason, sdkResponseCallbacks);
}

export function genCatchHttpClientResponseError<T>(
  sdkResponseCallbacks: SDKResponseCallbacks<T>
) {
  return (reason: any) => {
    handleAllErrorsFunction(sdkResponseCallbacks);

    const handled = handleFreeFormatResponseError<T>(
      reason,
      sdkResponseCallbacks
    );

    if (handled) {
      // pass
    } else {
      handleUnexpectedError<T>(sdkResponseCallbacks);
    }
    handleFinallyFunction(sdkResponseCallbacks);
  };
}
