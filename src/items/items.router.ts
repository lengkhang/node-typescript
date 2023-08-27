/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items = await ItemService.findAll();

    res.status(200).send(items);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET items/:id
itemsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);

    const foundItem = await ItemService.find(id);

    if (foundItem) {
      res.status(200).send(foundItem);
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// POST items
itemsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;

    const createdItem = await ItemService.create(item);

    res.status(201).json(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT items/:id
itemsRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const item: Item = req.body;

    const foundItem = await ItemService.find(id);

    if (foundItem) {
      const updatedItem = await ItemService.update(id, item);

      return res.status(200).json(updatedItem);
    }

    const createdItem = await ItemService.create(item);

    res.status(201).json(createdItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE items/:id
itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);

    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err.message);
  }
});