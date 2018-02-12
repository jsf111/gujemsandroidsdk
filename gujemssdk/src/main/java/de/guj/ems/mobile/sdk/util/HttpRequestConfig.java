package de.guj.ems.mobile.sdk.util;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by proeg on 10.08.2017.
 * Config for a
 */

public class HttpRequestConfig {

    private String url;
    private String httpMethod;
    private String path = "";
    private HashMap<String, String> urlParams;

    public HttpRequestConfig(String url, String httpMethod) {
        this.url = url;
        this.httpMethod = httpMethod;
        this.urlParams = new HashMap<>();
    }

    public HttpRequestConfig(String url, String httpMethod, String path) {
        this.url = url;
        this.httpMethod = httpMethod;
        this.urlParams = new HashMap<>();
        this.path = path;
    }

    public Map<String, String> addUrlParam(String key, String value) {
        this.urlParams.put(key, value);
        return urlParams;
    }

    public String getUrl() {
        return url;
    }

    public String getPath() {
        return path;
    }


    public String getHttpMethod() {
        return httpMethod;
    }

    public HashMap<String, String> getUrlParams() {
        return urlParams;
    }
}