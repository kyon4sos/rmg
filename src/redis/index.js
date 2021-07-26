const Redis = require("ioredis");
import { Message } from "element-ui";
const newRedis = ({
  port = 6379,
  host = "127.0.0.1",
  password = "",
  db = 0,
  family = 4,
  lazyConnect = true,
}) => {
  const newRedis = new Redis({
    password,
    port, // Redis port
    host, // Redis host
    family, // 4 (IPv4) or 6 (IPv6)
    db,
    lazyConnect,
  });
  newRedis.on("error", (e) => {
    console.log("error", e);
  });
  newRedis.on("ready", (e) => {
    Message({
      type: "success",
      message: "连接成功",
    });
  });
  newRedis.on("reconnecting", (e) => {
    console.log("reconnecting", e);
  });
  newRedis.on("close", (e) => {
    console.log("close", e);
  });
  newRedis.on("end", (e) => {
    console.log("end", e);
  });
  return newRedis;
};

export default newRedis;
