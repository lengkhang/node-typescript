import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";
import ItemModel from './models/item';

// let items: Items = {
//   1: {
//     id: 1,
//     name: "Burger",
//     price: 599,
//     description: "Tasty",
//     image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
//   },
//   2: {
//     id: 2,
//     name: "Pizza",
//     price: 299,
//     description: "Cheesy",
//     image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
//   },
//   3: {
//     id: 3,
//     name: "Tea",
//     price: 199,
//     description: "Informative",
//     image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
//   }
// };

// export const findAll = async (): Promise<Items> => Object.values(items);
// export const findAll = async ({ pageSize = 10, pageNo = 1} = {}): Promise<Items> => {
//   return ItemModel
//     .find()
//     .limit(pageSize)
//     .skip(pageSize * (pageNo - 1));
// };
export const findAll = async ({ pageSize = 10, pageNo = 1} = {}): Promise<Items> => {
  const items = await process.postgresql.query('SELECT * FROM item');

  return items;
};

// export const find = async (id: number): Promise<Item> => items[id];
export const find = (id: number): Promise<Item> => {
  return ItemModel.findOne({ id }).exec();
};

// export const create = async (item: BaseItem): Promise<Item> => {
//   const id = new Date().valueOf();

//   items[id] = { id, ...item };

//   return items[id];
// };
export const create = async (item: BaseItem): Promise<Item> => {
  const id = new Date().valueOf();

  const newItem = { id, ...item };

  await ItemModel.create(newItem);

  return newItem;
};

// export const update = async (id: number, item: BaseItem): Promise<Item | null> => {
//   const foundItem = await find(id);

//   if (foundItem) {
//     items[id] = { id, ...item };
    
//     return items[id];
//   }

//   return null;
// };
export const update = async (id: number, item: BaseItem): Promise<Item | null> => {
  const foundItem = await find(id);

  if(foundItem) {
    const updatedItem = { id, ...item };
    await ItemModel.updateOne({ id }, updatedItem);

    return updatedItem;
  }

  return null;
};

// export const remove = async (id: number): Promise<void | null> => {
//   const foundItem = await find(id);

//   if (!foundItem){
//     return null;
//   }

//   delete(items[id]);
// };
export const remove = async (id: number): Promise<void | null> => {
  const foundItem = await find(id);

  if (!foundItem) {
    return null;
  }

  await ItemModel.deleteOne({id});
};