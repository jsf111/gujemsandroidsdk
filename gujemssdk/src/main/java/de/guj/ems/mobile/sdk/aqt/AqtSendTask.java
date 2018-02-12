package de.guj.ems.mobile.sdk.aqt;

import java.util.HashMap;
import java.util.Map;
import de.guj.ems.mobile.sdk.util.HttpConnectionTask;
import de.guj.ems.mobile.sdk.util.HttpRequestConfig;

/**
 * Created by proeg on 10.08.2017.
 * Sends multiple aqt requests as one HTTP operation using HttpURLConnection.
 */

class AqtSendTask extends HttpConnectionTask {

    private final static String TAG = "AqtSendTask";
    private String adUnitId;
    private String location;
    private HashMap<String, String> creativeIdCodeMap;
    private HttpRequestConfig httpRequestConfig;

    public AqtSendTask(String adUnitId, String location, HashMap<String, String> creativeIdCodeMap) {
        super();
        this.adUnitId = adUnitId;
        this.location = location;
        this.creativeIdCodeMap = creativeIdCodeMap;
        this.prepareRequest();
        this.setHttpRequestConfig(this.httpRequestConfig);
        this.setWriteHashMap(this.creativeIdCodeMap);
    }

    private void prepareRequest() {
        httpRequestConfig = new HttpRequestConfig(Constants.AQT_URL, "POST");
        httpRequestConfig.addUrlParam("id", getCreativeIdsAsString());
        httpRequestConfig.addUrlParam("adUnit", adUnitId);
        httpRequestConfig.addUrlParam("location", location);
    }

    private String getCreativeIdsAsString() {
        String res = "";
        for (Map.Entry<String, String> entry : this.creativeIdCodeMap.entrySet()) {
            res += entry.getKey() + ",";
        }
        return res;
    }
}
