/**
 * Specifies configuration options for the inline form's buttons when `buttonLayout` is set to `Custom`.
 */
export interface SkyInlineFormButtonConfig {
  /**
   * The action that the button performs.
   * The valid options are `cancel`, `delete`, `done`, and `save`.
   * @required
   */
  action: string;

  /**
   * The label for the button.
   * @required
   */
  text: string;

  /**
   * Whether to disable the button.
   * @default false
   */
  disabled?: boolean;

  /**
   * The background color and style for the button.
   * The valid options are `default`, `link`, and `primary`.
   * These values set the background color and style from the
   * [secondary, link, and primary button classes](https://developer.blackbaud.com/skyux/components/button) respectively.
   */
  styleType?: string;
}
