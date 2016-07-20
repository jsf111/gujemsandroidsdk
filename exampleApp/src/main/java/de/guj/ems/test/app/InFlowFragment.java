package de.guj.ems.test.app;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.io.Serializable;

import de.guj.ems.mobile.sdk.views.video.GuJEMSInFlowView;


public class InFlowFragment extends android.app.Fragment implements Serializable {
    View currentView = null;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.fragment_inflow, container, false);
        this.currentView = rootView;

        try {
            String adUnitId = util.getStringSettingByKey(GlobalData.preferenceAdUnit);
            GuJEMSInFlowView inflow = (GuJEMSInFlowView)rootView.findViewById(R.id.InFlowPlayer);
            inflow.setColorToButtons("#00a600");
            inflow.setAdUnit(adUnitId);
        }catch(Exception e) {
            e.printStackTrace();
        }



        return rootView;
    }




}

