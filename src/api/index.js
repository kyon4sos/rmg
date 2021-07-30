const Redis = require("ioredis");
import { Message } from "element-ui";
let port = "6379",
  host = "127.0.0.1",
  family = "4",
  db = 0,
  lazyConnect = true;
let redis = null;
let err = 0;

const initRedis = ({
  port = "6379",
  host = "127.0.0.1",
  family = "4",
  db = 0,
  lazyConnect = true,
}) => {
  redis = new Redis({
    port, // Redis port
    host, // Redis host
    family, // 4 (IPv4) or 6 (IPv6)
    db,
    lazyConnect,
  });
  redis.on("error", (e) => {
    console.log("error", e);
    if (err == 0) {
      Message({
        type: "error",
        message: "连接错误,正在重试 !" + e,
        duration: 0,
      });
    }
  });
  redis.on("ready", (e) => {
    err = 0;
    Message.closeAll();
    Message({
      type: "success",
      message: "连接成功",
    });
  });
  redis.on("reconnecting", (e) => {
    console.log("reconnecting", e);
  });
  redis.on("close", (e) => {
    console.log("close", e);
  });
  redis.on("end", (e) => {
    console.log("end", e);
  });
  return redis;
};

const selectDb = (db) => {
  return redis.select(db);
};
const getAllKeys = () => {
  return redis.keys("*");
};
const save = async (key, { field, value }) => {
  console.log("save", field, value);
  const type = await getKeyType(key);
  let res = null;
  switch (type) {
    case "string":
      res = await redis.set(key, value);
      break;
    case "hash":
      res = await redis.hset(key, field, value);
      break;
    case "list":
      res = await redis.lset(key, field, value);
      break;
    case "set":
      res = await redis.smembers(key);
      break;
    case "zset":
      res = await redis.zrange(key, 0, -1);
      break;
    default:
      break;
  }
  console.log(res);
  return res;
};
const getKeyType = async (key) => {
  if (!key) {
    Message({
      showClose: true,
      message: "key 不能为空",
      type: "error",
    });
    return;
  }
  const type = await redis.type(key);
  console.log(type);
  return type;
};
const delField = async (key, { field, value }) => {
  const type = await getKeyType(key);
  let res = null;
  switch (type) {
    case "none":
      break;
    case "string":
      res = await redis.del(key);
      break;
    case "hash":
      res = await redis.hdel(key, field, value);
      break;
    case "list":
      res = await redis.lset(key, field, value);
      break;
    case "set":
      res = await redis.smembers(key);
      break;
    case "zset":
      res = await redis.zrange(key, 0, -1);
      break;
    default:
      break;
  }
  console.log(res);
  return res;
};
const delKey = async (key) => {
  const type = await getKeyType(key);
  let res = null;
  switch (type) {
    case "none":
      break;
    case "string":
      res = await redis.del(key);
      break;
    case "hash":
      res = await redis.hdel(key);
      break;
    case "list":
      res = await redis.lset(key);
      break;
    case "set":
      res = await redis.smembers(key);
      break;
    case "zset":
      res = await redis.zrange(key, 0, -1);
      break;
    default:
      break;
  }
  console.log(res);
  return res;
};
const keyExists = (key) => {
  return redis.exists(key);
};
const getValue = async (key) => {
  const type = await redis.type(key);
  console.log(type);
  let res = null;
  switch (type) {
    case "string":
      res = await redis.get(key);
      break;
    case "hash":
      res = await redis.hgetall(key);
      break;
    case "list":
      res = await redis.lrange(key, 0, -1);
      break;
    case "set":
      res = await redis.smembers(key);
      break;
    case "zset":
      res = await redis.zrange(key, 0, -1);
      break;
    default:
      break;
  }
  console.log(res);
  return { type, value: res };
};
const toArray = (res) => {
  if (res instanceof String) {
    return {
      value: res,
    };
  }
  if (res instanceof Array)
    return res.map((r, index) => ({
      field: index,
      value: r.value || r,
    }));
  if (res instanceof Object) {
    return Object.keys(res).map((r) => ({
      field: r,
      value: res[r],
    }));
  }
  return [];
};
export {
  getAllKeys,
  redis,
  initRedis,
  getValue,
  toArray,
  getKeyType,
  save,
  delField,
  delKey,
  keyExists,
  selectDb,
};
