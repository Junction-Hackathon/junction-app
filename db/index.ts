import * as SQLite from "expo-sqlite";
import { IVideo } from "@/types/video";

const db = SQLite.openDatabaseSync("local.db");

export class DbManager {
  constructor(private readonly db: SQLite.SQLiteDatabase) {}

  async init() {
    await this.db.execAsync("DROP TABLE IF EXISTS videos;");

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_path TEXT NOT NULL,
        sacrificer_id INTEGER NOT NULL,
        uploaded INTEGER DEFAULT 0
      );
    `);
  }

  async saveVideo(data: IVideo) {
    await this.db.runAsync(
      "INSERT INTO videos (file_path, sacrificer_id) VALUES (?, ?);",
      [data.filepath, data.sacrificeId]
    );

    const pending = await this.getPendingVideos();
    console.log(pending);
  }

  async getPendingVideos(): Promise<IVideo[]> {
    return this.db.getAllAsync("SELECT * FROM videos WHERE uploaded = 0;");
  }

  async markAsSynced(filepath: string) {
    return this.db.runAsync(
      "UPDATE videos SET uploaded = 1 WHERE filepath = ?",
      [filepath]
    );
  }
}

export const dbManager = new DbManager(db);
