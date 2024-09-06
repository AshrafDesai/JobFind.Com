import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

// Get all companies for a user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Logged-in user ID
        const companies = await Company.find({ userId });

        if (!companies.length) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
};

// Update a company
export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body; // Changed companyname to name

        if (!name) {
            return res.status(400).json({ success: false, message: 'Company name is required' });
        }

        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        company.name = name; // Update the company name
        await company.save();

        return res.status(200).json({ success: true, company });
    } catch (error) {
        console.error('Error updating company:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
