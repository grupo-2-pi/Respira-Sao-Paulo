package school.sptech.service;

import school.sptech.database.model.File;
import school.sptech.database.model.Logger;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

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

    public List<File> getBucketObjects(String prefix){
        try{
            ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
                    .bucket(BUCKET_NAME)
                    .prefix(prefix)
                    .build();

            ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);

            List<File> inputStreams = new ArrayList<>();

            logger.info("List encontrado:  " + listResponse.toString());

            for (S3Object s3Object : listResponse.contents()) {
                String key = s3Object.key();

                if (s3Object.size() == 0 || key.endsWith("/")) {
                    logger.info("Pulando prefixo/pasta vazio: " + key);
                    continue;
                }

                logger.info("Arquivo atual encontrado no prefixo: " + s3Object.toString());

                GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                        .bucket(BUCKET_NAME)
                        .key(key)
                        .build();

                logger.info("Request da busca do objeto: " + getObjectRequest.toString());

                InputStream inputStream = s3Client.getObject(getObjectRequest);
                inputStreams.add(
                        new File(
                                s3Object.key(),
                                inputStream
                        )
                );
            }

            return inputStreams;
        }catch (S3Exception e){
            logger.error("Erro ao buscar os objetos do bucket " + e.getMessage());
        }

        return null;
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
