/*
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * This work is licensed under BSD-3 Clause
 */

package moe.clarity.sayonika.Server;

import io.vertx.core.Vertx;

public class Main 
{
    public static void Main (String[] args)
    {
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new ServerVerticle());
    }
}