package de.guj.ems.test.app.thirdParty;

import android.content.Context;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.AdListener;
import com.facebook.ads.AdSize;
import com.facebook.ads.AdView;
import com.google.android.gms.ads.doubleclick.PublisherAdView;

import de.guj.ems.mobile.sdk.util.ThirdPartyConnector;
import de.guj.ems.mobile.sdk.util.ThirdPartyConnectorInterface;

/**
 * Created by gohl2 on 23.08.2016.
 */
public class FacebookAudienceConnector implements ThirdPartyConnectorInterface {
    private Context context = null;

    public FacebookAudienceConnector(Context c) {
        this.context = c;
    }

    public boolean isTypeOf(int t) {
        return ThirdPartyConnector.facebook == t;
    }

    public Context getContext() {
        return this.context;
    }

    public void call(Object... o) {
        LinearLayout view = (LinearLayout)((PublisherAdView)o[0]).getParent();
        AdView adView = new AdView(this.context, ((String) o[1]), AdSize.BANNER_HEIGHT_50);
        view.removeAllViews();
        view.addView(adView);
        adView.setAdListener(new AdListener() {
            @Override
            public void onError(Ad ad, AdError adError) {
                Toast.makeText(getContext(), "Error: " + adError.getErrorMessage(), Toast
                        .LENGTH_LONG).show();
            }

            @Override
            public void onAdLoaded(Ad ad) {
                Toast.makeText(getContext(), "Ad loaded!", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onAdClicked(Ad ad) {
                Toast.makeText(getContext(), "Ad clicked!", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onLoggingImpression(Ad ad) {
                Toast.makeText(getContext(), "Impression logged!", Toast.LENGTH_LONG).show();
            }
        });
        adView.loadAd();
    }

}
