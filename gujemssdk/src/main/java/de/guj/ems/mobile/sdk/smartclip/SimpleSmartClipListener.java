package de.guj.ems.mobile.sdk.smartclip;

import de.smartclip.mobileSDK.ScAdView;

/**
 * Created by proeg on 14.11.2017.
 */

public interface SimpleSmartClipListener {

    void onStartCallback(final ScAdView scAdView);

    void onEndCallback(final ScAdView scAdView);
}
