import PostService from "./PostService.js";
import FileService from "./fileService.js";

class PostController {
  async create(req, res) {
    try {
      if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "Файл не найден" });
      }

      console.log("Файл для сохранения:", req.files.image);
      const pictureName = await FileService.saveFile(req.files.image);
      console.log("Имя сохранённого файла:", pictureName);

      const post = await PostService.create({
        ...req.body,
        image: pictureName,
      });

      console.log("Созданный пост:", post);
      res.status(201).json(post);
    } catch (e) {
      console.error("Ошибка при создании поста:", e);
      res
        .status(500)
        .json({ message: "Ошибка создания поста", error: e.message });
    }
  }

  async getAll(req, res) {
    try {
      const {
        _limit = 10,
        _page = 1,
        _sort = "id",
        _order = "ASC",
      } = req.query;

      console.log("Запрос на получение постов:", {
        _limit,
        _page,
        _sort,
        _order,
      });

      const posts = await PostService.getAll(_limit, _page, _sort, _order);
      console.log("Посты получены:", posts);

      const totalCount = await PostService.getTotalCount();
      console.log("Общее количество постов:", totalCount);

      return res.json({
        posts,
        totalCount,
        currentPage: parseInt(_page),
        totalPages: Math.ceil(totalCount / _limit),
      });
    } catch (error) {
      console.error("Ошибка при получении постов:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении постов", error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const postId = req.params.id;
      console.log(`Запрос на получение поста с ID: ${postId}`);

      const post = await PostService.getOne(postId);
      if (!post) {
        return res.status(404).json({ message: "Пост не найден" });
      }

      console.log("Пост найден:", post);
      return res.json(post);
    } catch (e) {
      console.error(`Ошибка при получении поста с ID ${req.params.id}:`, e);
      res
        .status(500)
        .json({ message: "Ошибка получения поста", error: e.message });
    }
  }

  async update(req, res) {
    try {
      const postId = req.params.id;

      if (!postId) {
        return res.status(400).json({ message: "ID поста не указан" });
      }

      const existingPost = await PostService.getOne(postId);
      if (!existingPost) {
        return res.status(404).json({ message: "Пост не найден" });
      }

      let pictureName;

      if (req.files && req.files.image) {
        // Save the new image and delete the old one
        pictureName = await FileService.saveFile(req.files.image);
        // Optionally delete the old image
        await FileService.deleteFile(existingPost.image);
        req.body.image = pictureName;
      }

      const updatedPost = await PostService.update(postId, {
        ...req.body,
        image: pictureName ? pictureName : existingPost.image, // Preserve old image if no new image is uploaded
      });

      console.log("Обновленный пост:", updatedPost);
      return res.json(updatedPost);
    } catch (e) {
      console.error("Ошибка при обновлении поста:", e);
      res
        .status(500)
        .json({ message: "Ошибка обновления поста", error: e.message });
    }
  }

  async delete(req, res) {
    try {
      const postId = req.params.id;
      console.log(`Запрос на удаление поста с ID: ${postId}`);

      const post = await PostService.delete(postId);
      if (!post) {
        return res.status(404).json({ message: "Пост не найден" });
      }

      // Optionally delete the associated image file
      await FileService.deleteFile(post.image);

      console.log("Пост удален:", post);
      return res.json({ message: "Пост удален" });
    } catch (e) {
      console.error("Ошибка удаления поста:", e);
      res
        .status(500)
        .json({ message: "Ошибка удаления поста", error: e.message });
    }
  }
}

export default new PostController();
