// @flow

/**
 * Copyright (c) Garuda Labs, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type State = {|
  value: ?string,
  pickerValue: ?string,
  focused: boolean,
  fieldPressed: boolean,
  donePressed: boolean,
  cancelPressed: boolean,
|};
