/**
 * Copyright 2018 (c) The Sayonika Project Authors
 * 
 * Licensed under BSD-3-Clause
 */

/**
  * Parses Mod Specific Data.
  * @returns {JSON} json object 
  */
router.get(`${baseRoute}/mods/:id`, (req, res) => {
    db.any('select $id from mods where verified = $1', [true]).then(data => {
        // TODO: Return JSON Data of mods
        res.send(data);
    });
});

/**
 * Parses all mods (Probably dangerous, only allow this on Client)
 * @returns {JSON} JSON response of all mods in the DB
 */
router.get(`${baseRoute}/mods`, (req, res) => {
    db.any('select * from mods where verified = $1', [true]).then(data => {
        // TODO: Return JSON Data of mods
        res.send(data);
    });
});