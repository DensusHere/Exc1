import { ICellEditorParams } from '@ag-grid-community/core';

import { SkyAgGridCurrencyProperties } from './currency-properties';

/**
 * @internal
 */
export interface SkyCellEditorCurrencyParams extends ICellEditorParams {
  skyComponentProperties?: SkyAgGridCurrencyProperties;
}
