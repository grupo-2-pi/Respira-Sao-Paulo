package school.sptech.service;

import school.sptech.database.model.Logger;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class S3Service  {

    private final S3Client s3Client;
    private final String BUCKET_NAME;
    private final Logger logger;

    public S3Service(S3Client s3Client, String bucketName, Logger logger) {
        this.s3Client = s3Client;
        this.BUCKET_NAME = bucketName;
        this.logger = logger;
    }

    public void createBucket(){;
        CreateBucketRequest createBucketRequest = CreateBucketRequest.builder()
                .bucket(BUCKET_NAME)
                .build();

        s3Client.createBucket(createBucketRequest);
    }

    public List<Bucket> listBuckets(){
        List<Bucket> buckets = s3Client.listBuckets().buckets();

        return buckets;
    }

    public List<S3Object> getBucketObjects(){
        try{
            ListObjectsRequest listObjects = ListObjectsRequest.builder()
                    .bucket(BUCKET_NAME)
                    .build();

            List<S3Object> objects = s3Client.listObjects(listObjects).contents();

            return objects;
        }catch (S3Exception e){
            logger.error("Erro ao buscar os objetos do bucket " + e.getMessage());
        }

        return null;
    }

    public void uploadObjectToBucket(File file){

        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(UUID.randomUUID().toString())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));
        }catch (S3Exception e){
            logger.error("Erro ao colocar objeto no bucket " + e.getMessage());
        }

    }

    public void downloadObjectsFromBucket(){
        List<S3Object> objects = getBucketObjects();
        for (S3Object object : objects) {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(object.key())
                    .build();

            try{
                InputStream objectContent = s3Client.getObject(getObjectRequest, ResponseTransformer.toInputStream());
                Files.copy(objectContent, new File(object.key()).toPath());

                logger.info("Download do arquivo realizado com sucesso: " + object.key());

            }catch (IOException e){
                logger.error("Erro ao realizar download do arquivo vindo do bucket " + e.getMessage() + Arrays.toString(e.getStackTrace()));
            }
        }
    }

    public void deleteObject(String objectKey){
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);

        logger.info("Objeto removido com sucesso: " + objectKey);
    }

}
