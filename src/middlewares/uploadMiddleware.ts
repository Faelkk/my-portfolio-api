import multer from "multer";
import { supabase } from "../connection/supabase";
import env from "../config/config";

interface SupabaseResponse {
    data?: { path: string };
    error?: Error;
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = (fieldNames) => async (req, res, next) => {
    try {
        await upload.fields([
            { name: fieldNames[0], maxCount: 1 },
            { name: fieldNames[1], maxCount: 1 },
        ])(req, res, async (error) => {
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

            const handleUpload = async (fieldName, file) => {
                try {
                    const response: SupabaseResponse = await supabase.storage
                        .from("uploads")
                        .upload(
                            `${Date.now()}--${file.originalname}`,
                            file.buffer,
                            {
                                contentType: file.mimetype,
                            }
                        );

                    if (response.error) {
                        throw new Error("Error uploading to Supabase Storage");
                    }

                    const baseUrl = `${env.supabaseUrl}/storage/v1/object/uploads/public`;
                    const fileUrl = `${baseUrl}/${response.data.path}`;

                    uploadedFiles.push({ ...response.data, fileUrl });
                } catch (error) {
                    return res.status(500).json({
                        error: "Erro no upload dos arquivos para o Supabase Storage",
                    });
                }
            };

            for (const fieldName of fieldNames) {
                const file = files[fieldName][0];
                await handleUpload(fieldName, file);
            }

            req.uploadedFiles = uploadedFiles;

            next();
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            error: true,
            message: "Erro no upload dos arquivos",
        });
    }
};

export default uploadMiddleware;
