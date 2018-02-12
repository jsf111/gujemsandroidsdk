package de.guj.ems.mobile.sdk.smartclip;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import java.util.List;

import de.guj.ems.mobile.sdk.util.SdkLog;
import de.guj.ems.mobile.sdk.util.SdkUtil;
import de.smartclip.mobileSDK.ScAdView;

/**
 * Created by proeg on 11.10.2017.
 */

public class SmartClipPaster {

    private final static String TAG = "SmartClipPaster";
    private View oldView;
    private List<SimpleSmartClipListener> listeners;

    public SmartClipPaster(View oldView, List<SimpleSmartClipListener> listeners) {
        this.oldView = oldView;
        SdkUtil.setSmartclipUrl("https://ad.sxp.smartclip.net/select?type=dyn&ple=testcors.eu.smartclip~~400x320&cu_test=ms_vast2_nofc&cu_smar_cors=1&smar_cors=1&cat=&fwd_dt1=&fwd_dt2=&fwd_sz=400x320&&rnd=523214&count=[count]");
        this.listeners = listeners;
    }

    public void insertSmartClipView(Context context) {
        if (context != null) {
            ScAdView sCView = new ScAdView(context);
            swapOutViewWithSmartClipView(sCView);
            sCView.setAdURL(SdkUtil.getSmartclipUrl());
            sCView.addListener(new SmartClipListener(listeners));
        } else {
            SdkLog.i(TAG, "context not set - cant start SmartClip");
        }
    }

    private void swapOutViewWithSmartClipView(View newView) {
        if (this.oldView != null) {
            ViewGroup parent = (ViewGroup) this.oldView.getParent();
            if (parent != null) {
                int oldViewIndex = parent.indexOfChild(this.oldView);
                //remove oldView to replace with smartclip view
                parent.removeView(this.oldView);
                RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                );
                newView.setLayoutParams(new ViewGroup.LayoutParams(params));
                parent.addView(newView, oldViewIndex);
                SdkLog.i(TAG, "SmartClip view inserted");
            } else {
                SdkLog.e(TAG, "parent of oldview is null");
            }
        } else {
            SdkLog.e(TAG, "oldView is null");
        }
    }
}