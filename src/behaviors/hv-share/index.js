// @flow

/**
 * Copyright (c) Garuda Labs, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as Namespaces from 'hyperview/src/services/namespaces';
import type { Content, Options } from './types';
import type { DOMString, Element } from 'hyperview/src/types';
import { Platform, Share } from 'react-native';

const getContent = (
  message: ?DOMString,
  title: ?DOMString,
  url: ?DOMString,
): ?Content => {
  if (message) {
    if (title && url) {
      return { message, title, url };
    }
    if (title) {
      return { message, title };
    }
    if (url) {
      return { message, url };
    }
    return { message };
  }
  return null;
};

const getOptions = (dialogTitle: ?DOMString, subject: ?DOMString): Options => {
  if (dialogTitle) {
    if (subject) {
      return { dialogTitle, subject };
    }
    return { dialogTitle };
  }
  return {};
};

// `url` is not supported on android. See https://facebook.github.io/react-native/docs/share
const platformSpecificContent = (
  message: ?DOMString,
  title: ?DOMString,
  url: ?DOMString,
): ?Content => {
  const content = getContent(message, title, url);
  if (content) {
    if (Platform.OS === 'android' && content.url) {
      const msg = `${content.message} ${content.url}`;
      return { ...content, message: msg };
    }
    return content;
  }
  return null;
};

export default {
  action: 'share',
  callback: (element: Element) => {
    // This share API is based off https://facebook.github.io/react-native/docs/0.52/share
    const dialogTitle: ?DOMString = element.getAttributeNS(
      Namespaces.SHARE,
      'dialog-title',
    );
    const message: ?DOMString = element.getAttributeNS(
      Namespaces.SHARE,
      'message',
    );
    const subject: ?DOMString = element.getAttributeNS(
      Namespaces.SHARE,
      'subject',
    );
    const title: ?DOMString = element.getAttributeNS(Namespaces.SHARE, 'title');
    const url: ?DOMString = element.getAttributeNS(Namespaces.SHARE, 'url');

    const content = platformSpecificContent(message, title, url);
    if (content) {
      const options = getOptions(dialogTitle, subject);
      Share.share(content, options);
    }
  },
};
