import { genCatchHttpClientResponseError } from './catchSDKReason';
import { handleFinallyFunction, handleSuccess, SDKResponseCallbacks } from './SDKResponseHandler';

export function callSDK<T>(promise: Promise<T>, sdkResponseCallbacks: SDKResponseCallbacks<T>) {
  promise
    .then((result) => {
      handleSuccess(sdkResponseCallbacks, result);
      handleFinallyFunction(sdkResponseCallbacks);
    })
    .catch(genCatchHttpClientResponseError<T>(sdkResponseCallbacks));
}
