import Restaurant from "../schemas/restaurant.schema";
import { Request, Response } from "express";

const postRestaurant = async (req: Request, res: Response) => {
    try {
        const saveData = await Restaurant.create(req.body);

        if (saveData) {
            res.status(200).send({ response: [saveData] });
        } else {
            res.status(500).send({ response: "Failed to Save Data " });
        }
    } catch (error) {
        res
            .status(500)
            .send({ response: "Server Error, Failed to save restraunt data" });
    }
};

const getRestaurantData = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const getData = await Restaurant.find({ userId: id });
        if (getData.length === 0) {
            res.status(200).send({ response: 0 });
        } else {
            res.status(200).send({ response: getData });
        }
    } catch (error) {
        res.status(500).send({ response: "Server Error, Failed to get data" });
    }
};

const updateRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updateRecord = await Restaurant.findOneAndUpdate(
            { userId: id },
            data,
            { new: true }
        );
        if (updateRecord) {
            res.status(200).send({ response: updateRecord });
        } else {
            res.status(400).send({ response: "Failed to Update Restaurant" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ response: "Server Error, Failed to Update Restaurant" });
    }
};

const deleteRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleteRecord = await Restaurant.findOneAndDelete(
            { userId: id },
            { new: true }
        );
        if (deleteRecord) {
            res.status(200).send({ response: "Restaurant Deleted Successfully" });
        } else {
            res.status(400).send({ response: "Failed to Delete Restaurant" });
        }
    } catch (error) {
        res
            .status(500)
            .send({ response: "Server Error, Failed to Delete Restaurant" });
    }
};

export default {
    postRestaurant,
    getRestaurantData,
    updateRestaurant,
    deleteRestaurant,
};
