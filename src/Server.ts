/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * Licensed under BSD-3 Clause.
 * You should have received a copy of the license with the source code. 
 */

/// <reference types="@vertx/core/runtime" />
// @ts-check

import {Router} from '@vertx/web';

const app = Router.router(vertx);

vertx.createHttpServer
     .listen(process.env.PORT || 7821)
     .requestHandler(app);