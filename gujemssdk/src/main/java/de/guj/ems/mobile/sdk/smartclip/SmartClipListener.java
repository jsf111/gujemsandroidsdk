package de.guj.ems.mobile.sdk.smartclip;

import android.support.annotation.NonNull;

import java.util.List;

import de.guj.ems.mobile.sdk.util.SdkLog;
import de.guj.ems.mobile.sdk.util.SdkUtil;
import de.guj.ems.mobile.sdk.views.animations.ExpandAnimation;
import de.guj.ems.mobile.sdk.views.animations.ShrinkAnimation;
import de.smartclip.mobileSDK.ScAdView;
import de.smartclip.mobileSDK.ScListener;

/**
 * Created by proeg on 11.10.2017.
 */

class SmartClipListener implements ScListener {

    private final static String TAG = "SmartClipListener";
    private List<SimpleSmartClipListener> listeners;

    public SmartClipListener(List<SimpleSmartClipListener> listeners) {
        this.listeners = listeners;
    }

    private void callStartOnListeners(ScAdView scAdView) {
        for (SimpleSmartClipListener l : listeners) {
            l.onStartCallback(scAdView);
        }
    }

    private void callEndOnListeners(ScAdView scAdView) {
        for (SimpleSmartClipListener l : listeners) {
            l.onEndCallback(scAdView);
        }
    }

    @Override
    public void onPrefetchComplete(@NonNull ScAdView scAdView) {
        SdkLog.i(TAG, "SmartClip onPrefetchCompleteCallback");
    }

    @Override
    public void onStartCallback(@NonNull final ScAdView scAdView) {
        SdkLog.i(TAG, "SmartClip onStartCallback");
        scAdView.postDelayed(new Runnable() {
            @Override
            public void run() {
                scAdView.startAnimation(new ExpandAnimation(scAdView, 180 * SdkUtil.getDensity()));
            }
        }, 0);
        callStartOnListeners(scAdView);
    }

    @Override
    public void onEndCallback(@NonNull final ScAdView scAdView) {
        SdkLog.i(TAG, "SmartClip onEndCallback");
        scAdView.postDelayed(new Runnable() {
            @Override
            public void run() {
                scAdView.startAnimation(new ShrinkAnimation(scAdView, 180 * SdkUtil.getDensity()));
            }
        }, 0);
        callEndOnListeners(scAdView);
    }

    @Override
    public boolean onClickThru(@NonNull ScAdView scAdView, @NonNull String s) {
        return false;
    }

    @Override
    public void onCappedCallback(@NonNull ScAdView scAdView) {
    }
}