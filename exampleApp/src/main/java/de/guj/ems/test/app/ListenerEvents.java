package de.guj.ems.test.app;

import android.graphics.Color;
import android.view.View;
import android.widget.TextView;

import java.io.Serializable;

import de.guj.ems.mobile.sdk.controllers.IOnAdEmptyListener;
import de.guj.ems.mobile.sdk.controllers.IOnAdErrorListener;
import de.guj.ems.mobile.sdk.controllers.IOnAdSuccessListener;
import de.guj.ems.mobile.sdk.util.SdkLog;

/**
 * Created by gohl2 on 17.11.2015.
 */
public class ListenerEvents implements IOnAdSuccessListener, IOnAdEmptyListener, IOnAdErrorListener {

    private View view = null;
    private int messageBox = -1;

    public ListenerEvents(View tv, int id) {
        this.view = tv;
        this.messageBox = id;
    }

    @Override
    public void onAdSuccess() {
        if (this.view != null) {
            ((TextView) this.view.findViewById(this.messageBox)).setText("Ad loaded successfully");
        }
        SdkLog.d("AdEventListener", "Ad loaded");
    }

    @Override
    public void onAdEmpty() {
        if (this.view != null) {
            ((TextView) this.view.findViewById(this.messageBox)).setTextColor(Color.YELLOW);
            ((TextView) this.view.findViewById(this.messageBox)).setText("Ad is empty");
        }
        SdkLog.d("AdEventListener", "Ad is empty");
    }

    @Override
    public void onAdError(String msg) {
        if (this.view != null) {
            ((TextView) this.view.findViewById(this.messageBox)).setTextColor(Color.RED);
            ((TextView) this.view.findViewById(this.messageBox)).setText("Ad error: " + msg);
        }
        SdkLog.d("AdEventListener", "Ad error: " + msg);
    }

    @Override
    public void onAdError(String msg, Throwable t) {
        if (this.view != null) {
            ((TextView) this.view.findViewById(this.messageBox)).setTextColor(Color.RED);
            ((TextView) this.view.findViewById(this.messageBox)).setText("Ad error: " + msg);
        }
        SdkLog.d("AdEventListener", "Ad error: " + msg);
    }
}
