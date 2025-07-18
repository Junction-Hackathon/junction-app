import * as SQLite from "expo-sqlite";
import { IVideo } from "@/types/video";

const db = SQLite.openDatabaseSync("local.db");

export class DbManager {
  constructor(
    private readonly db: SQLite.SQLiteDatabase 
  ) {}

  async init() {
    this.db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uri TEXT NOT NULL,
        doner_id INTERGER NOT NULL,
        uploaded INTEGER DEFAULT 0
      );
    `
    )
  }

  async saveVideo(data: IVideo) {
    db.runAsync(
      "INSERT INTO videos (uri, doner_id) VALUES (?, ?, ?);",
      ...[data.uri, data.donorId]
    );
  }

  async getPendingVideos() {
    return db.getAllAsync('SELECT * FROM videos WHERE uploaded = 0');
  }
}

export const dbManager = new DbManager(db);