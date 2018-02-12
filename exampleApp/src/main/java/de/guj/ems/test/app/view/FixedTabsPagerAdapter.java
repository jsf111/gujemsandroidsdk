package de.guj.ems.test.app.view;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import de.guj.ems.test.app.view.fragments.AutoNativeFragment;
import de.guj.ems.test.app.view.fragments.BannerFragment;
import de.guj.ems.test.app.view.fragments.InFlowFragment;
import de.guj.ems.test.app.view.fragments.InterstitialFragement;
import de.guj.ems.test.app.view.fragments.VideoFragment;

/**
 * Created by proeg on 08.08.2017.
 */

public class FixedTabsPagerAdapter extends FragmentPagerAdapter {

    public FixedTabsPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return new BannerFragment();
            case 1:
                return new InterstitialFragement();
            case 2:
                return new VideoFragment();
            case 3:
                return new InFlowFragment();
            case 4:
                return new AutoNativeFragment();
            default:
                return null;
        }
    }

    @Override
    public CharSequence getPageTitle(int position) {
        switch (position) {
            case 0:
                return "Banner";
            case 1:
                return "Interstitial";
            case 2:
                return "Video";
            case 3:
                return "InFlow";
            case 4:
                return "AutoNative";
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return 5;
    }
}
