import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = (fieldNames) => async (req, res, next) => {
    try {
        await upload.fields([
            { name: fieldNames[0], maxCount: 1 },
            { name: fieldNames[1], maxCount: 1 },
        ])(req, res);

        const files = req.files;
        if (!files || !files[fieldNames[0]] || !files[fieldNames[1]]) {
            return res.send(400, {
                error: "Nenhum arquivo enviado ou arquivos insuficientes",
            });
        }

        const uploadedFiles = [];

        const handleUpload = async (fieldName, file) => {
            try {
                const data = await supabase.storage
                    .from("uploads")
                    .upload(
                        `${Date.now()}--${file.originalname}`,
                        file.buffer,
                        {
                            contentType: file.mimetype,
                        }
                    );

                const baseUrl = `https://your-supabase-url/storage/v1/object/${}/public`;
                const fileUrl = `${baseUrl}/${data.fullPath}`;

                uploadedFiles.push({ ...data, fileUrl });
            } catch (error) {
                return res.send(500, {
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
    } catch (err) {
        return res.send(500, {
            error: true,
            message: "Erro no upload dos arquivos",
        });
    }
};
export default uploadMiddleware;
