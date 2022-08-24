package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.io.*;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.*;
import java.util.Iterator;
import java.util.Locale;

public class FileUploadUtil {
    private static final String UPLOAD_DIR = "user-photos/";

    public static void checkUploadDir(String userID) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR + userID);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

    }

    public static String getImageType(InputStream inputStream) throws IOException {
        ImageInputStream iis = ImageIO.createImageInputStream(inputStream);
        Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);

        if (imageReaders.hasNext()) {
            ImageReader reader = imageReaders.next();
            return reader.getFormatName().toLowerCase(Locale.ROOT);
        }
        return "txt";
    }

    public static String downloadNonFile(Long id, String link) throws IOException {
        Image image = ImageIO.read(new URL(link));
        if (image == null) throw new IOException("NOT IMAGE");

        try (
                InputStream in = new URL(link).openStream();
                ReadableByteChannel readableByteChannel = Channels.newChannel(new URL(link).openStream())
        ) {
            checkUploadDir(id.toString());
            String type = getImageType(in);
            try (FileOutputStream fileOutputStream = new FileOutputStream(UPLOAD_DIR + "/" + id + "/unknown." + type)) {
                fileOutputStream.getChannel()
                        .transferFrom(readableByteChannel, 0, Long.MAX_VALUE);
            }
            return "unknown." + type;
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + id + " - " + link, ioe);
        }
    }

    public static String saveFile(Long id, MultipartFile multipartFile) throws IOException {
        checkUploadDir("");

        if (multipartFile == null || multipartFile.getContentType() == null) throw new IOException("Error: Type is Unknown");

        try (
                InputStream inputStream = multipartFile.getInputStream();
                ReadableByteChannel readableByteChannel = Channels.newChannel(multipartFile.getInputStream())
        ) {
            String fileType = getImageType(inputStream);
            checkUploadDir(id.toString());
            try (FileOutputStream fileOutputStream = new FileOutputStream(UPLOAD_DIR + "/" + id + "/" + "unknown." + fileType)) {
                fileOutputStream.getChannel()
                        .transferFrom(readableByteChannel, 0, Long.MAX_VALUE);
            }
            return "unknown." + fileType;
        } catch (Exception e) {throw new IOException("Could not save image file: " + "new image", e);}
    }
}
