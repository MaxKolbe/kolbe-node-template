import { clearTables, installExtensions } from "./helpers/setup.js";
import { describe, it, expect, beforeEach } from "vitest";
import { testDb, closeTestDb } from "./helpers/testDb.js";

describe("example-auth-unit-test", () => {
  //   beforeEach(() => {
  //     clearTables();
  //     installExtensions();
  //   });
  //   afterAll(async () => {
  //     await closeTestDb();
  // });
  it("should return true", async () => {
    const result = await testDb.execute("SELECT 1");

    expect(result.command).toBe("SELECT");
  });
});
