import pool from "./db.js";
import FileService from "./fileService.js";

class PostService {
  async create(postData) {
    const { title, description, body, image } = postData;

    const query = `
      INSERT INTO posts (title, description, body, image)
      VALUES ($1, $2, $3, $4) RETURNING *;`;

    const newPost = await pool.query(query, [title, description, body, image]);

    return newPost.rows[0];
  }

  async getAll(limit, page, sort, order) {
    const offset = (page - 1) * limit;
    const query = `
    SELECT * FROM posts
    ORDER BY ${sort} ${order}
    LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Ошибка в запросе getAll:", error);
      throw error;
    }
  }

  async getTotalCount() {
    const query = "SELECT COUNT(*) FROM posts;";

    const result = await pool.query(query);

    return parseInt(result.rows[0].count);
  }

  async getOne(id) {
    const query = "SELECT * FROM posts WHERE id = $1;";

    const post = await pool.query(query, [id]);

    return post.rows[0];
  }

  async update(id, postData) {
    const { title, description, body, image } = postData;

    const query = `
      UPDATE posts 
      SET title = $1, description = $2, body = $3, image = $4 
      WHERE id = $5 RETURNING *;`;

    const updatedPost = await pool.query(query, [
      title,
      description,
      body,
      image,
      id,
    ]);

    return updatedPost.rows[0];
  }

  async delete(id) {
    const querySelect = "SELECT image FROM posts WHERE id = $1;";
    const post = await pool.query(querySelect, [id]);
    const postImage = post.rows[0]?.image;

    if (!postImage) {
      return null;
    }

    await FileService.deleteFile(postImage);

    const queryDelete = "DELETE FROM posts WHERE id = $1 RETURNING *;";
    const deletedPost = await pool.query(queryDelete, [id]);

    return deletedPost.rows[0];
  }
}

export default new PostService();
