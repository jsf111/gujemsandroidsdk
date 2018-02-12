package de.guj.ems.mobile.sdk.views.animations;

import android.view.View;
import android.view.animation.Animation;
import android.view.animation.Transformation;

/**
 * Created by proeg on 15.08.2017.
 */

public class ExpandAnimation extends Animation {

    private View view;
    private double targetHeight;
    private final int ANIM_DURATION = 1500;

    public ExpandAnimation(View view, double targetHeight) {
        this.view = view;
        this.targetHeight = targetHeight;
        this.setAnimationListener(new AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationEnd(Animation animation) {

            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });
        init();
    }

    private void init() {
        this.setFillAfter(true);
        this.setFillEnabled(true);
        this.setDuration(ANIM_DURATION);
    }

    public String toString() {
        return "close";
    }

    @Override
    protected void applyTransformation(float interpolatedTime, Transformation t) {
        view.getLayoutParams().height = (int) (targetHeight * interpolatedTime);
        view.requestLayout();
    }

    @Override
    public boolean willChangeBounds() {
        return true;
    }

}
