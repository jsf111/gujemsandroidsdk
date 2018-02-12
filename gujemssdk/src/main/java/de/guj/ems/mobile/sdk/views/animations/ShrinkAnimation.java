package de.guj.ems.mobile.sdk.views.animations;

import android.view.View;
import android.view.animation.Animation;
import android.view.animation.Transformation;

/**
 * Created by proeg on 15.08.2017.
 */

public class ShrinkAnimation extends Animation {

    private View view;
    private double targetHeight;
    private final int ANIM_DURATION = 1500;

    public ShrinkAnimation(View view, double targetHeight) {
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
        this.setDuration(ANIM_DURATION);
    }

    public String toString() {
        return "shrink";
    }

    @Override
    protected void applyTransformation(float interpolatedTime, Transformation t) {
        if (interpolatedTime == 1) {
            view.setVisibility(View.GONE);
        } else {
            view.getLayoutParams().height = (int) targetHeight
                    - (int) (targetHeight * interpolatedTime);
            view.requestLayout();
        }
    }

    @Override
    public boolean willChangeBounds() {
        return true;
    }
}
