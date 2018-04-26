package de.guj.ems.test.app.view.fragments;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.io.Serializable;
import de.guj.ems.mobile.sdk.views.video.GuJEMSInFlowView;
import de.guj.ems.test.app.GlobalData;
import de.guj.ems.test.app.R;
import de.guj.ems.test.app.util;


public class InFlowFragment extends Fragment implements Serializable {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.fragment_inflow, container, false);
        try {
            String adUnitId = util.getStringSettingByKey(GlobalData.preferenceAdUnit);
            inflateInflowView(adUnitId, R.id.InFlowPlayer1, rootView);
            inflateInflowView(adUnitId, R.id.InFlowPlayer2, rootView);
            inflateInflowView(adUnitId, R.id.InFlowPlayer3, rootView);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rootView;
    }

    private void inflateInflowView(String adUnitId, int id, View rootView) {
        GuJEMSInFlowView inflow = (GuJEMSInFlowView) rootView.findViewById(id);
        inflow.setColorToButtons("#00a600");
        inflow.setAdUnit(adUnitId);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }
}
