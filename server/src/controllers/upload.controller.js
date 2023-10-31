const { uploadImageWithURL, uploadSingleImageFile, uploadMultiImageFile } = require("../services/upload.service");

class UploadController {
    static uploadWithURLcontroller = async (req, res, next) => {
        try {
            const result = await uploadImageWithURL();
            return res.status(result.code).json({
                message: result.code === 200 ? 'upload successfully uploaded' : result.message,
                metadata: result.metadata
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    static uploadSingleIMGcontroller = async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
                return {
                    code: 409,
                    message: "upload single file failed"
                }
            }
            const result = await uploadSingleImageFile({
                path: file.path
            });
            return res.status(result.code).json({
                message: result.code === 200 ? 'upload single file successfully uploaded' : result.message,
                metadata: result.metadata
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }

    static uploadMultiIMGcontroller = async (req, res, next) => {
        try {
            const { files } = req;
            if (!files) {
                return {
                    code: 409,
                    message: "upload single file failed"
                }
            }
            const result = await uploadMultiImageFile({
                files
            });
            return res.status(result.code).json({
                message: result.code === 200 ? 'upload single file successfully uploaded' : result.message,
                metadata: result.metadata
            })
        } catch (error) {
            return res.status(error.code || 500).json({
                message: error.message,
                status: error.status
            });
        }
    }
}

module.exports = UploadController;