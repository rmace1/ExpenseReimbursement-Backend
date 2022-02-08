package util;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import io.javalin.http.UploadedFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class AWS3FileUpload {

    public String uploadFile(UploadedFile file){
        if(file == null){
            return null;
        }

        //Environment Variable
        String bucketName = "jwa-p2";
        final String awsID = System.getenv ("AWS_PASS");
        final String secretKey = System.getenv ("AWS_SECRET_PASS");

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials (awsID, secretKey);


        String nameOfFile = file.getFilename();

        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.US_EAST_2)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();

        boolean isBucketExist = s3Client.doesBucketExistV2(bucketName);
        if(!isBucketExist){
            s3Client.createBucket(bucketName);
        }

        try{
            InputStream is = file.getContent();
            s3Client.putObject(new PutObjectRequest(bucketName, "ExpenseReimbursementv2/" + nameOfFile
                    , is, new ObjectMetadata()));
            is.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        //url of image
        return "https://jwa-p2.s3.us-east-2.amazonaws.com/ExpenseReimbursementv2" + nameOfFile;
    }

}
