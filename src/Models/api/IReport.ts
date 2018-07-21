/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */

import {IAPIBase} from '../Base';
import {ReportClassification, Snowflake} from '../commonTypes';

import IMod from './IMod';
import ISimpleUser from './ISimpleUser';

export default interface IReport extends IAPIBase {
    author: ISimpleUser;
    mod: IMod;
    classification: ReportClassification;
    body?: string;
}
