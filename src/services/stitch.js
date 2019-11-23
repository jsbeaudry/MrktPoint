import { Stitch, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

// https://www.npmjs.com/package/mongodb-stitch-react-native-sdk

let stitchClient = null,
  mongoClient = null,
  db = null;

export async function DB() {
  stitchClient = Stitch.defaultAppClient;

  // Get a client of the Remote Mongo Service for database access
  mongoClient = stitchClient.getServiceClient(
    RemoteMongoClient.factory,
    stitchConfig.stitchName
  );
  // Retrieve a database object
  db = mongoClient.db(stitchConfig.db);
}

// Retrieve the collection in the database

export async function getAll(collect, filter, lim) {
  DB();
  const datas = await db.collection(collect);
  return datas.find(filter, { limit: lim }).toArray();
}

export async function getOne(collect, filter) {
  DB();
  const datas = await db.collection(collect);
  return datas.find(filter).toArray();
}

export async function addMultipleOrder(collect, objects) {
  DB();
  const response = await db.collection(collect);
  return response.insertMany(objects);
}
export async function addOrder(collect, object) {
  DB();
  const response = await db.collection(collect);
  return response.insertOne(object);
}

//////////////////update/////////////////
export const updateUser = async (collect, where, object) => {
  console.log(where);

  DB();
  const query = where;
  const update = {
    $set: object
  };
  const options = { upsert: false };

  return db.collection(collect).updateOne(query, update, options);
};
export const stitchConfig = {
  appId: "mrkt-hiwea",
  db: "market",
  stitchName: "mongodb-atlas"
};
