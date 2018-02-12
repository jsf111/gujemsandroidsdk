package de.guj.ems.test.app.view.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import de.guj.ems.mobile.sdk.autonative.AutoNativeConfig;
import de.guj.ems.mobile.sdk.autonative.AutoNativeLoader;
import de.guj.ems.mobile.sdk.util.SdkUtil;
import de.guj.ems.test.app.GlobalData;
import de.guj.ems.test.app.R;
import de.guj.ems.test.app.util;

/**
 * Created by proeg on 25.08.2017.
 */

public class AutoNativeFragment extends Fragment {


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_autonative, container, false);
        try {
            String url = util.getStringSettingByKey(GlobalData.preferenceNative);
            if (url.equals("")) {
                url = "http://www.gujmedia.de";
            }
            SdkUtil.setAutonativeBaseUrl(url);
            int correlator = SdkUtil.getCorrelator();
            this.createView(11, 1, correlator, rootView.findViewById(R.id.autonative1));
            this.createView(12, 2, correlator, rootView.findViewById(R.id.autonative2));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rootView;
    }

    private void createView(int pos, int tile, int correlator, View view) {
        try {
            AutoNativeConfig autoNativeConfig = new AutoNativeConfig(
                    AutoNativeConfig.TeaserAspectRatio.OneToOne,
                    util.getStringSettingByKey(GlobalData.preferenceAdUnit),
                    pos,
                    tile,
                    correlator
            );
            new AutoNativeLoader(autoNativeConfig, getContext(), view);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
