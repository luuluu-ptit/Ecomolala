const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const uploadImageWithURL = async () => {
    try {
        const url = 'https://toidicodedao.files.wordpress.com/2019/09/message-queue-small.png';
        const folder = 'products/shopID', newFile = 'test';

        const result = await cloudinary.uploader.upload(url, {
            // public_id: newFile,
            folder
        });
        // console.log(result);
        return {
            code: 200,
            metadata: result
        };
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

const uploadSingleImageFile = async ({
    path,
    folder = 'products/shopID'
}) => {
    try {
        const result = await cloudinary.uploader.upload(path, {
            public_id: 'thumb',
            folder
        });
        // console.log(result);
        return {
            code: 200,
            metadata: {
                image_url: result.secure_url,
                shopID: 8888,
                thumb_url: await cloudinary.url(result.public_id, {
                    height: 100,
                    width: 100,
                    format: 'jpg'
                })
            }
        };
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

const uploadMultiImageFile = async ({
    files,
    folder = 'products/shopID'
}) => {
    try {
        if (!files.length) {
            return {
                code: 409,
                message: "upload single file failed"
            }
        }
        const uploadUrls = [];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                // public_id: newFile,
                folder
            });

            uploadUrls.push({
                image_url: result.secure_url,
                shopID: 8888,
                thumb_url: await cloudinary.url(result.public_id, {
                    height: 100,
                    width: 100,
                    format: 'jpg'
                })
            })
        }

        // console.log(result);
        return {
            code: 200,
            metadata: uploadUrls
        };
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// uploadWithURL().catch()

module.exports = {
    uploadImageWithURL,
    uploadSingleImageFile,
    uploadMultiImageFile
}