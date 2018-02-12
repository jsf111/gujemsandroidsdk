package de.guj.ems.mobile.sdk.aqt;

/**
 * Created by proeg on 14.08.2017.
 * Holds data for a single aqt request
 */

class AqtRequestObject {

    private String creativeId;
    private String adUnitId;
    private String location;
    private String code;

    public AqtRequestObject(String creativeId, String adUnitId, String location, String code) {
        this.creativeId = creativeId;
        this.adUnitId = adUnitId;
        this.location = location;
        this.code = code;
    }


    public String getCreativeId() {
        return creativeId;
    }

    public String getAdUnitId() {
        return adUnitId;
    }

    public String getLocation() {
        return location;
    }

    public String getCode() {
        return code;
    }
}
