/**
 * Display information about a "siteOf" entity
 */
export interface SiteOfInfo {
  /**
   * The display name of the monitored entity.
   */
  displayName: string;
  /**
   * The type of the monitored entity.
   */
  type: string;
  /**
   * The type of the monitored entity.
   */
  typeDisplayName: string;
}
/** @ignore */
export declare namespace _SiteOfInfoTransformation {
  interface AsJson {
    displayName: string;
    type: string;
    typeDisplayName: string;
  }
  function fromJson(model: AsJson): SiteOfInfo;
  function toJson(model: SiteOfInfo): AsJson;
}
