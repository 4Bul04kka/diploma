import * as uuid from "uuid";
import * as path from "path";
import * as fs from "fs/promises";

class FileService {
  async saveFile(file) {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve("static", fileName);
      await file.mv(filePath);
      return fileName;
    } catch (e) {
      throw new Error("Ошибка при сохранении файла");
    }
  }

  async deleteFile(fileName) {
    try {
      const filePath = path.resolve("static", fileName);
      await fs.unlink(filePath);
    } catch (e) {
      console.warn(
        `Не удалось удалить файл: ${fileName}, возможно, он уже был удалён`
      );
    }
  }
}

export default new FileService();
