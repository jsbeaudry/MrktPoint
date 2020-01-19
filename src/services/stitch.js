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

export async function deleteOne(collect, filter) {
  DB();
  const datas = await db.collection(collect);
  return datas.deleteOne(filter);
}

export async function addData(collect, object) {
  DB();
  const response = await db.collection(collect);

  return response.insertOne(object);
}
export async function addManyData(collect, array) {
  DB();

  const response = await db.collection(collect);

  return response.insertMany(array);
}

export async function getOrdersByCustumer(id) {
  return stitchClient.callFunction("getOrdersByCustumer", [id]);
}

export async function getUserFavorites(id) {
  return stitchClient.callFunction("getUserFavorites", [id]);
}
export async function getUserWishlist(id) {
  return stitchClient.callFunction("getUserWishlist", [id]);
}
//////////////////update/////////////////
export const updateUser = async (collect, where, object) => {
  console.log(where);

  DB();
  const query = where;
  const update = {
    $set: object
  };
  const options = { upsert: true };

  return db.collection(collect).updateOne(query, update, options);
};
//////////////////update global/////////////////
export const update = async (collect, where, object) => {
  DB();
  const query = where;
  const update = {
    $set: object
  };
  const options = { upsert: true };

  return db.collection(collect).updateOne(query, update, options);
};

export const updateAddress = addAddress => {
  let data_ = Stitch.defaultAppClient.auth.activeUserAuthInfo;
  if (data_ && data_.userId != undefined) {
    updateUser(
      "users",
      { user_id: data_.userId },
      {
        addressShipping: addAddress
      }
    )
      .then(results => {
        console.log(results);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export const stitchConfig = {
  appId: "mrkt-hiwea",
  db: "market",
  stitchName: "mongodb-atlas"
};
