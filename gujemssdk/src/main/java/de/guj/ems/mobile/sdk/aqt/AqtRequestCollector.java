package de.guj.ems.mobile.sdk.aqt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by proeg on 14.08.2017.
 * Singleton implementation to collect aqt requests from across the app
 */

public class AqtRequestCollector {

    private static AqtRequestCollector instance;
    private ArrayList<AqtRequestObject> sendQueue;
    private Timer sendReqTimer;

    public static AqtRequestCollector getInstance() {
        if (instance == null) instance = new AqtRequestCollector();
        return instance;
    }

    private AqtRequestCollector() {
        this.sendQueue = new ArrayList<>();
    }

    public synchronized void addRequest(String creativeId, String adUnitId, String location, String code) {
        AqtRequestObject aqtRequestObject = new AqtRequestObject(creativeId, adUnitId, location, code);
        this.sendQueue.add(aqtRequestObject);
        if (sendReqTimer != null) {
            sendReqTimer.cancel();
        }
        startTimer();
    }

    private void startTimer() {
        sendReqTimer = new Timer();
        sendReqTimer.schedule(new SendRequest(), Constants.COLLECTION_TIME);
    }

    /**
     * Delegates list of aqt request to sendtask
     */
    class SendRequest extends TimerTask {
        public void run() {
            HashMap<String, String> idCodeMap = new HashMap<String, String>();
            for (AqtRequestObject o : sendQueue) {
                idCodeMap.put(o.getCreativeId(), o.getCode());
            }
            // expect the adunit and location to be the same for all requests
            String adUnitId = sendQueue.get(0).getAdUnitId();
            String location = sendQueue.get(0).getLocation();
            sendQueue.clear();
            new AqtSendTask(adUnitId, location, idCodeMap).execute();
        }
    }

}
