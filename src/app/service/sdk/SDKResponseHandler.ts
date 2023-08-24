import { ClientRequestError } from '@dynatrace-sdk/client-classic-environment-v2/types/packages/client/classic-environment-v2/src/lib/error-envelopes/client-request-error';

export interface DefaultErrorParam {
  message?: string;
  clientRequestError?: ClientRequestError<string>;
}

export interface SDKResponseCallbacks<T> {
  finallyFunction?: () => void;
  successFunction?: (result: T) => void;
  allErrorsFunction?: () => void;
  errorDefaultFunction?: (defaultErrorParam?: DefaultErrorParam) => void;
  unexpectedErrorFunction?: () => void;
  httpErrorFunction?: (clientRequestError: ClientRequestError<string>) => void;
  errorMessageFunction?: (message: string) => void;
  resourceNotFoundFunction?: () => void;
}

export function handleFinallyFunction<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>) {
  if (sdkResponseCallbacks.finallyFunction) {
    sdkResponseCallbacks.finallyFunction();
  }
}

export function handleAllErrorsFunction<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>) {
  if (sdkResponseCallbacks.allErrorsFunction) {
    sdkResponseCallbacks.allErrorsFunction();
  }
}

export function handleSuccess<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>, result: T) {
  if (sdkResponseCallbacks.successFunction) {
    try {
      sdkResponseCallbacks.successFunction(result);
    } catch (error) {
      console.log(error)
      handleErrorMessage(sdkResponseCallbacks, error as any)
    }
  }
}

function handleErrorDefault<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>, defaultErrorParam?: DefaultErrorParam) {
  if (sdkResponseCallbacks.errorDefaultFunction) {
    sdkResponseCallbacks.errorDefaultFunction(defaultErrorParam);
  }
}

export function handleUnexpectedError<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>) {
  if (sdkResponseCallbacks.unexpectedErrorFunction) {
    sdkResponseCallbacks.unexpectedErrorFunction();
  } else {
    handleErrorDefault(sdkResponseCallbacks);
  }
}

export function handleHttpError<T>(
  sdkResponseCallbacks: SDKResponseCallbacks<T>,
  clientRequestError: ClientRequestError<string>,
) {
  if (sdkResponseCallbacks.httpErrorFunction) {
    sdkResponseCallbacks.httpErrorFunction(clientRequestError);
  } else {
    handleErrorDefault(sdkResponseCallbacks, { clientRequestError });
  }
}

export function handleErrorMessage<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>, message: string) {
  if (sdkResponseCallbacks.errorMessageFunction) {
    sdkResponseCallbacks.errorMessageFunction(message);
  } else {
    handleErrorDefault(sdkResponseCallbacks, { message });
  }
}

export function handleResourceNotFoundFunction<T>(sdkResponseCallbacks: SDKResponseCallbacks<T>) {
  if (sdkResponseCallbacks.resourceNotFoundFunction) {
    sdkResponseCallbacks.resourceNotFoundFunction();
  } else {
    handleErrorDefault(sdkResponseCallbacks);
  }
}
