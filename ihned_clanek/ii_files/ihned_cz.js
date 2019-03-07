var cpexSkin = function () {
    try {
        var skinWrapper = top.document.createElement("div");
        skinWrapper.id = 'cpex-skin-wrapper';
        skinWrapper.style.position = "fixed";
        skinWrapper.style.left = "0";
        skinWrapper.style.top = "0";
        skinWrapper.style.width = "100%";
        skinWrapper.style.height = "100%";
        skinWrapper.style.zIndex = "0";
        skinWrapper.style.cursor = "pointer";
        top.document.body.appendChild(skinWrapper);


        //hide leaderboard
        var leaderboard = top.document.getElementsByClassName('leader')[0];
        if (leaderboard) {
            leaderboard.style.display = 'none';
            leaderboard.className =
                leaderboard.className.replace(/sa-show/,'');
        }

        var contentElement;

        var wrapper = top.document.getElementById('brand-c');
        if (wrapper) {
            contentElement = wrapper;
        } else {
            var headerWrapper = top.document.getElementById('header');
            if (headerWrapper && headerWrapper.parentElement) {
                contentElement = headerWrapper.parentElement;
            }
        }

        if (contentElement) {
            contentElement.style.zIndex = 1;
            contentElement.style.position = 'relative';
            contentElement.style.width = '1180px';
            contentElement.style.margin = '200px auto 0 auto';
        }

        scrollElement = top.document.body;

    } catch (e) {
        cpexSkinObject.logError('prepare page error: ' + e);
    }

    return {
        scrollElement: scrollElement,
        skinWrapper: skinWrapper,
        contentElement: contentElement
    };
};
