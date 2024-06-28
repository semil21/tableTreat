import Category from "../schemas/category.schema";
import { Request, Response, response } from "express";

const postCategory = async (req: Request, res: Response) => {
    try {
        const saveCategory = await Category.create(req.body)

        if (saveCategory) {
            res.status(200).send({ response: saveCategory })
        }
        else {
            res.status(500).send({ response: "Failed to Save Category" })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Erroe, Failed to Save Category" })
    }
}

const getCategory = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const getData = await Category.find({ userId: userId })

        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(500).send({ response: 'Failed to Get Data' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to Get Category" })
    }
}

const editCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params
    const data = req.body
    try {
        const saveUpdatedData = await Category.findByIdAndUpdate(
            { _id: categoryId },
            data,
            { new: true }
        )

        if (saveUpdatedData) {
            res.status(200).send({ response: saveUpdatedData })
        }
        else {
            res.status(500).send({ response: 'Failed to Edit Category' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to Edit Category" })
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params

    try {
        const deleteData = await Category.findByIdAndDelete(
            { _id: categoryId },
            { new: true }
        )

        if (deleteData) {
            res.status(200).send({ response: deleteData })
        } else {
            res.status(500).send({ response: 'Failed to Delete a Category' })

        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to Delete Category" })
    }
}

const serachCategory = async (req: Request, res: Response) => {
    const { searchCategoryName } = req.body
    try {

        if (searchCategoryName.length === 0) {
            res.status(400).send({ response: 0 })
        }
        else {
            const findCategory = await Category.find(
                { categoryName: new RegExp(searchCategoryName, 'i') }
            )
            if (findCategory) {
                res.status(200).send({ response: findCategory })
            }
            else {
                res.status(400).send({ response: "NO category found." })
            }
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, failed to search category" })
    }
}

export default { postCategory, getCategory, editCategory, deleteCategory, serachCategory }