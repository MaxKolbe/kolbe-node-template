import { clearTables, installExtensions } from "./helpers/setup.js";
import { describe, it, expect, beforeEach } from "vitest";
import pool from "../db/db.js";

describe("example-auth-unit-test", () => {
  //   beforeEach(() => {
  //     clearTables();
  //     installExtensions();
  //   });

  it("should return true", async () => {
    const result = await pool.query("SELECT 1");
  
    expect(result.command).toBe("SELECT");
  });
});
