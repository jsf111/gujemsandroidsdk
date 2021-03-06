package de.guj.ems.test.app.view.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import de.guj.ems.mobile.sdk.views.video.GuJEMSVideoPlayer;
import de.guj.ems.test.app.GlobalData;
import de.guj.ems.test.app.R;
import de.guj.ems.test.app.util;

public class VideoFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.fragment_video, container, false);

        ((Button) rootView.findViewById(R.id.FragmentVideoStart)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    String adUnitId = util.getStringSettingByKey(GlobalData.preferenceAdUnit);
                    GuJEMSVideoPlayer player = (GuJEMSVideoPlayer) rootView.findViewById(R.id.FragmentVideoPlayer);

                    player.setAdUnit(adUnitId.replace("/6032/", ""));
                    player.requestAndPlayAds();
                } catch (Exception e) {
                }
            }
        });


        return rootView;
    }
}
