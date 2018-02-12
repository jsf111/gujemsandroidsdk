package de.guj.ems.mobile.sdk.autonative;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.widget.ImageView;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import de.guj.ems.mobile.sdk.util.SdkLog;

/**
 * Created by proeg on 29.08.2017.
 */

class ImgToViewLoader extends AsyncTask<String, Void, Bitmap> {

    private static final String TAG = "ImgToViewLoader";
    private ImageView target;

    public ImgToViewLoader(ImageView target) {
        this.target = target;
    }


    protected Bitmap doInBackground(String... src) {
        try {
            URL url = new URL(src[0]);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            SdkLog.e(TAG, "could not load bitmap for autonative imgview", e);
            return null;
        }
    }

    protected void onPostExecute(Bitmap bitmap) {
        if (bitmap != null) {
            target.setImageBitmap(bitmap);
            SdkLog.i(TAG, "successfully inserted teaserimage for autonative ad");
        }
    }
}
