import logger from "../configs/logger.config.js";
import pool from "./db.js";

// CLEAR TABLES
const clearTables = async () => {
  try {
    logger.info("Clearing tables...");
    await pool.query(`DELETE FROM "references"`);
    logger.info("Tables cleared :)");
  } catch (error: any) {
    logger.error("Could not delete all tables", {
      message: error.message,
    });
  }
};

// INSTALL EXTENSIONS
const installExtensions = async () => {
  try {
    logger.info("Installing Extensions");
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    logger.info("Extensions Installed :)");
  } catch (error: any) {
    logger.error("Could not install extensions", {
      message: error.message,
    });
  }
};

export const createReferencesTable = async () => {
  const query: string = `
    CREATE TABLE IF NOT EXISTS "references" (
      id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
      int integer,
      int1 integer DEFAULT 10,
      int2 integer NOT NULL,
      boolean boolean,
      text1 text NOT NULL,
      text2 text,
      varchar1 varchar,
      varchar2 varchar(256),
      char1 char,
      char2 char(256),
      numeric1 numeric,
      numeric2 numeric(100),
      numeric3 numeric(100, 20),
      json1 json,
      json2 json DEFAULT '{"foo":"bar"}'::json,
      jsonb1 jsonb,
      jsonb2 jsonb DEFAULT '{"foo":"bar"}'::jsonb,
      uuid1 uuid,
      uuid2 uuid DEFAULT gen_random_uuid(),
      time1 time,
      date date,
      number_array numeric[],
      string_array1 text[],
      "unique" text,
      string_array2 text[] NOT NULL,
      timestamp1 timestamp,
      updated_at timestamp,
      created_at timestamp NOT NULL DEFAULT now(),
      deleted_at timestamp,
      CONSTRAINT references_unique_unique UNIQUE ("unique")
    );
    CREATE INDEX IF NOT EXISTS example_idx ON "references" USING btree (text2);
    CREATE INDEX IF NOT EXISTS example_search_index ON "references" USING gin (
      (
        setweight(to_tsvector('english', text1), 'A') ||
        setweight(to_tsvector('english', coalesce(text2, '')), 'B') ||
        setweight(array_to_tsvector(coalesce(string_array1, ARRAY[]::text[])), 'C') ||
        setweight(to_tsvector('english', coalesce(numeric1::text, '')), 'D')
      )
    );`;
  try {
    await pool.query(query);
    console.log('Table "references" created');
  } catch (err) {
    console.log('error creating references table', err);
  }
};

export const seedReferencesTable = async () => {
  const query: string = `
    INSERT INTO "references"
      (int, int1, int2, boolean, text1, text2, varchar1, varchar2, char1, char2,
       numeric1, numeric2, numeric3, json1, json2, jsonb1, jsonb2, uuid1,
       time1, date, number_array, string_array1, "unique", string_array2, timestamp1)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
       $11, $12, $13, $14, $15, $16, $17, $18,
       $19, $20, $21, $22, $23, $24, $25);`;

  const rows = [
    {
      int: 5,
      int1: 20,
      int2: 100,
      boolean: true,
      text1: "First seeded reference row",
      text2: "search text alpha",
      varchar1: "v",
      varchar2: "varchar value one",
      char1: "a",
      char2: "char value one",
      numeric1: 3.14,
      numeric2: 12345,
      numeric3: 1.2345,
      json1: { note: "plain json 1" },
      json2: { foo: "baz" },
      jsonb1: { note: "jsonb 1" },
      jsonb2: { foo: "qux" },
      uuid1: "11111111-1111-1111-1111-111111111111",
      time1: "09:00:00",
      date: "2026-01-01",
      number_array: [1, 2, 3],
      string_array1: ["red", "green"],
      unique: "unique-row-1",
      string_array2: ["mandatory", "array", "one"],
      timestamp1: "2026-01-01 09:00:00",
    },
    {
      int: 15,
      int1: 25,
      int2: 200,
      boolean: false,
      text1: "Second seeded reference row",
      text2: "search text beta",
      varchar1: "w",
      varchar2: "varchar value two",
      char1: "b",
      char2: "char value two",
      numeric1: 2.71,
      numeric2: 54321,
      numeric3: 9.8765,
      json1: { note: "plain json 2" },
      json2: { foo: "bar" },
      jsonb1: { note: "jsonb 2" },
      jsonb2: { foo: "bar" },
      uuid1: "22222222-2222-2222-2222-222222222222",
      time1: "13:30:00",
      date: "2026-02-14",
      number_array: [4, 5, 6],
      string_array1: ["blue"],
      unique: "unique-row-2",
      string_array2: ["mandatory", "array", "two"],
      timestamp1: "2026-02-14 13:30:00",
    },
    {
      int: null,
      int1: 30,
      int2: 300,
      boolean: true,
      text1: "Third seeded reference row",
      text2: null,
      varchar1: "x",
      varchar2: "varchar value three",
      char1: "c",
      char2: "char value three",
      numeric1: 1.41,
      numeric2: 99999,
      numeric3: 5.0001,
      json1: { note: "plain json 3" },
      json2: { foo: "bar" },
      jsonb1: { note: "jsonb 3" },
      jsonb2: { foo: "bar" },
      uuid1: "33333333-3333-3333-3333-333333333333",
      time1: "18:45:00",
      date: "2026-03-21",
      number_array: [7, 8],
      string_array1: null,
      unique: "unique-row-3",
      string_array2: ["mandatory", "array", "three"],
      timestamp1: null,
    },
    {
      int: 42,
      int1: 10,
      int2: 400,
      boolean: false,
      text1: "Fourth seeded reference row",
      text2: "search text delta",
      varchar1: "y",
      varchar2: "varchar value four",
      char1: "d",
      char2: "char value four",
      numeric1: 0.577,
      numeric2: 11111,
      numeric3: 3.3333,
      json1: { note: "plain json 4" },
      json2: { foo: "bar" },
      jsonb1: { note: "jsonb 4" },
      jsonb2: { foo: "bar" },
      uuid1: "44444444-4444-4444-4444-444444444444",
      time1: "22:15:00",
      date: "2026-04-30",
      number_array: [9, 10, 11],
      string_array1: ["yellow", "purple", "orange"],
      unique: "unique-row-4",
      string_array2: ["mandatory", "array", "four"],
      timestamp1: "2026-04-30 22:15:00",
    },
  ];

  try {
    for (const row of rows) {
      await pool.query(query, [
        row.int,
        row.int1,
        row.int2,
        row.boolean,
        row.text1,
        row.text2,
        row.varchar1,
        row.varchar2,
        row.char1,
        row.char2,
        row.numeric1,
        row.numeric2,
        row.numeric3,
        row.json1,
        row.json2,
        row.jsonb1,
        row.jsonb2,
        row.uuid1,
        row.time1,
        row.date,
        row.number_array,
        row.string_array1,
        row.unique,
        row.string_array2,
        row.timestamp1,
      ]);
    }
    console.log('Table "references" seeded with 4 rows');
  } catch (err) {
    console.log("error seeding references table", err);
  }
};

clearTables();
installExtensions();
createReferencesTable();
seedReferencesTable();