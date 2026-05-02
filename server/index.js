import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        products.id,
        products.serial_number,
        products.is_new,
        products.photo,
        products.title,
        products.type,
        products.specification,
        products.incoming,
        products.product_group,
        products.person,
        products.order_id,
        products.created_at,

        price.value AS price_value,
        price.symbol AS price_symbol,

        guarantees.start AS guarantee_start,
        guarantees.end AS guarantee_end

      FROM products
      LEFT JOIN price ON price.product_id = products.id
      LEFT JOIN guarantees ON guarantees.product_id = products.id
    `);

    const map = {};

    for (const row of rows) {
      const id = row.id;

      if (!map[id]) {
        map[id] = {
          id,
          serialNumber: row.serial_number,
          isNew: Boolean(row.is_new),
          photo: row.photo,
          title: row.title,
          type: row.type,
          specification: row.specification,
          incoming: row.incoming,
          group: row.product_group,
          person: row.person,
          order: row.order_id,
          date: row.created_at,

          price: null,
          guarantee: null,
        };
      }

      // prices
      if (row.price_value !== null) {
        map[id].price = {
          value: row.price_value,
          symbol: row.price_symbol,
        };
      }

      // guarantee
      if (row.guarantee_start && !map[id].guarantee) {
        map[id].guarantee = {
          start: row.guarantee_start,
          end: row.guarantee_end,
        };
      }
    }

    res.json(Object.values(map));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE PRODUCT
app.post("/products", async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      serialNumber,
      isNew,
      photo,
      title,
      type,
      specification,
      guarantee,
      price,
      incoming,
      group,
      person,
      order,
    } = req.body;

    const [productResult] = await connection.query(
      `INSERT INTO products 
     (serial_number, is_new, photo, title, type, specification, incoming, product_group, person, order_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        serialNumber,
        isNew ? 1 : 0,
        photo,
        title,
        type,
        specification,
        incoming,
        group,
        person,
        order,
      ],
    );

    const productId = productResult.insertId;

    if (guarantee) {
      await connection.query(
        `INSERT INTO guarantees (product_id, start, end)
       VALUES (?, ?, ?)`,
        [productId, guarantee.start, guarantee.end],
      );
    }

    if (price) {
      await connection.query(
        `INSERT INTO price (product_id, value, symbol)
       VALUES (?, ?, ?)`,
        [productId, price.value, price.symbol],
      );
    }

    await connection.commit();

    res.json({ message: "Product created", productId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: "Server error" });
  } finally {
    connection.release();
  }
});

// DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {
   try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      id
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET ALL ORDERS
app.get("/orders", async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT 
        orders.id AS order_id,
        orders.title AS order_title,
        orders.description,
        orders.created_at AS order_date,

        products.id AS product_id,
        products.serial_number,
        products.is_new,
        products.photo,
        products.title AS product_title,
        products.type,
        products.specification,
        products.incoming,
        products.product_group,
        products.person,
        products.order_id AS product_order_id,
        products.created_at AS product_created_at,

        price.value AS price_value,
        price.symbol AS price_symbol,

        guarantees.start AS guarantee_start,
        guarantees.end AS guarantee_end

        FROM orders
        LEFT JOIN products ON products.order_id = orders.id
        LEFT JOIN price ON price.product_id = products.id
        LEFT JOIN guarantees ON guarantees.product_id = products.id
    `);

    const map = {};

    for (const row of rows) {
      const orderId = row.order_id;
      const productId = row.product_id;

      if (!map[orderId]) {
        map[orderId] = {
          id: orderId,
          title: row.order_title,
          date: row.order_date,
          description: row.description,
          products: [],
        };
      }

    if (productId !== null) {
        let product = map[orderId].products.find((p) => p.id === productId);

        if (!product) {
          product = {
            id: productId,
            serialNumber: row.serial_number,
            isNew: Boolean(row.is_new),
            photo: row.photo,
            title: row.product_title,
            type: row.type,
            specification: row.specification,
            incoming: row.incoming,
            group: row.product_group,
            person: row.person,
            order: row.order_id,
            date: row.created_at,

            price: null,
            guarantee: null,
          };

          map[orderId].products.push(product);
        }

        // prices
        if (row.price_value !== null) {
          product.price = {
            value: row.price_value,
            symbol: row.price_symbol,
            isDefault: Boolean(row.is_default),
          };
        }

        // guarantee
        if (row.guarantee_start && !product.guarantee) {
          product.guarantee = {
            start: row.guarantee_start,
            end: row.guarantee_end,
          };
        }
      }
    }

    res.json(Object.values(map));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE ORDER
app.post("/orders", async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      "INSERT INTO orders (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE ORDER
app.delete("/orders/:id", async (req, res) => {
  
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error("Ошибка при удалении ордера:", error);
    res.status(500).json({ error: error.message });
  }
});





// WEBSOCKET

const users = new Set();

io.on("connection", (socket) => {
  users.add(socket.id);

  io.emit("activeUsers", users.size);

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("activeUsers", users.size);
  });
});

// server.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
