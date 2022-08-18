package ch.noseryoung.blockshop.blockshop.block;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.*;
import java.net.URL;
import java.nio.file.*;
import java.util.Optional;

public class FileUploadUtil {
    @Autowired private static BlockRepository blockRepository;
    private static String uploadDir = "user-photos/";

    public static void savePossibleFile(Block block, Optional<MultipartFile> multipartFile) {
        String fileName = block.getName() + "-" + block.getId();
        try {
            if (multipartFile.isEmpty()) {
                downloadNonFile(block, fileName);
            } else {
                saveFile(fileName, multipartFile.get());
            }
        } catch (Exception e) {
            block.setImageLink("");
            block.setId(block.getId());
            blockRepository.save(block);
        }
    }

    public static void downloadNonFile(Block block, String fileName) throws IOException {
        Image image = ImageIO.read(new URL(block.getImageLink()));
        if (image == null) throw new IOException("NOT IMAGE");
        try(InputStream in = new URL(block.getImageLink()).openStream()){
            Files.copy(in, Paths.get("user-photos/" + fileName));
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }

    public static void saveFile(String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }
}
