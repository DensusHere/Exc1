/**
 * Contains an object with the data passed from users when
 * a modal is closed and the reason that the modal was closed.
 */
export class SkyModalCloseArgs {
  /**
   * The reason the modal was closed.
   * Options include `"close"`, `"save"`, and `"cancel"`.
   */
  public reason: string | undefined;
  /**
   * The data passed from users when the modal is closed.
   */
  public data: any;
}
