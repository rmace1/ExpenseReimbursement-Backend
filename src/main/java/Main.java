import dao.ReimbursementDaoInterface;
import frontcontroller.FrontController;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import models.Reimbursement;
import org.jasypt.util.password.StrongPasswordEncryptor;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;

public class Main {
    public static void main(String[] args) {
        Javalin server = Javalin.create(config -> {
            //The directory is the location of the static files that are used.
            config.addStaticFiles("/frontend", Location.CLASSPATH); config.enableCorsForAllOrigins();
        }).start(9000);
        new FrontController(server);

    }
}
