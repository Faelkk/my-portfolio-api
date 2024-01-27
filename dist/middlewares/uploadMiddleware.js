"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const supabase_1 = require("../connection/supabase");
const config_1 = __importDefault(require("../config/config"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const uploadMiddleware = (fieldNames) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield upload.fields([
            { name: fieldNames[0], maxCount: 1 },
            { name: fieldNames[1], maxCount: 1 },
        ])(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return next(error);
            }
            const files = req.files;
            if (!files || !files[fieldNames[0]] || !files[fieldNames[1]]) {
                return res.status(400).json({
                    error: "Nenhum arquivo enviado ou arquivos insuficientes",
                });
            }
            const uploadedFiles = [];
            const handleUpload = (fieldName, file) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const response = yield supabase_1.supabase.storage
                        .from("uploads")
                        .upload(`${Date.now()}--${file.originalname}`, file.buffer, {
                        contentType: file.mimetype,
                    });
                    if (response.error) {
                        throw new Error("Error uploading to Supabase Storage");
                    }
                    const baseUrl = `${config_1.default.supabaseUrl}/storage/v1/object/uploads/public`;
                    const fileUrl = `${baseUrl}/${response.data.path}`;
                    uploadedFiles.push(Object.assign(Object.assign({}, response.data), { fileUrl }));
                }
                catch (error) {
                    return res.status(500).json({
                        error: "Erro no upload dos arquivos para o Supabase Storage",
                    });
                }
            });
            for (const fieldName of fieldNames) {
                const file = files[fieldName][0];
                yield handleUpload(fieldName, file);
            }
            req.uploadedFiles = uploadedFiles;
            next();
        }));
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Erro no upload dos arquivos",
        });
    }
});
exports.default = uploadMiddleware;
