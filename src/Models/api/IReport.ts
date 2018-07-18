/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3-Clause
 */
 
import {IAPIBase} from '../Base';
import {Snowflake} from '../commonTypes';
import Mod from '../db/Mod';
import IMod from './IMod';
import ISimpleUser from './ISimpleUser';

export enum ReportClassification {
    IPViolation = 1,
    BadModEntry = 2,
    CopyrightedContentViolation = 3
}

export default interface IReport {
    mod: IMod;
    reportClassification: ReportClassification;
    reportAuthor: ISimpleUser;
}