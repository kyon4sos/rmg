const Redis = require("ioredis");
import { Message } from "element-ui";
let err = 0;
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
    if (err == 0) {
      err++;
      Message({
        type: "error",
        message: "连接错误,正在重试 !" + e,
        duration: 0,
      });
    }
  });
  newRedis.on("ready", (e) => {
    err = 0;
    Message.closeAll();
    Message({
      type: "success",
      message: "连接成功",
    });
  });
  newRedis.on("reconnecting", (e) => {});
  newRedis.on("close", (e) => {});
  newRedis.on("end", (e) => {});
  return newRedis;
};

export default newRedis;
