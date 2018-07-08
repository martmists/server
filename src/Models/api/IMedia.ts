/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {MediaTypes, URL} from '../commonTypes';
import Media from '../db/Media';

export default interface IMedia extends IAPIBase {
    type: MediaTypes;
    url: URL;
}

export function convertFromDB(obj: Media): IMedia {
    return obj as IMedia;
}
