#wget -q -O - http://karelbilek.com/tails/run.sh | sudo bash
RELEASEFF=35.0.1
RELEASEPLUG=1.0.5

if [ ! -f firefox-$RELEASEFF.tar.bz2 ] ; then
    sudo -u amnesia wget https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/$RELEASEFF/linux-i686/en-US/firefox-$RELEASEFF.tar.bz2
fi
if [ ! -d firefox ] ; then
    sudo -u amnesia tar vxjf firefox-$RELEASEFF.tar.bz2
fi
if [ ! -f browser-plugin-trezor_$RELEASEPLUG""_i386.deb ] ; then
    sudo -u amnesia wget http://karelbilek.com/tails/browser-plugin-trezor_$RELEASEPLUG""_i386.deb
fi
if [ ! -d plugin ] ; then
    sudo -u amnesia dpkg -x browser-plugin-trezor_$RELEASEPLUG""_i386.deb plugin
fi    
if [ ! -d firefox/browser/plugins ] ; then
    sudo -u amnesia mkdir firefox/browser/plugins
fi   
if [ ! -f firefox/browser/plugins/npBitcoinTrezorPlugin.so ] ; then
    sudo -u amnesia cp plugin/usr/lib/mozilla/plugins/npBitcoinTrezorPlugin.so firefox/browser/plugins/
fi
if [ ! -f /lib/udev/rules.d/51-trezor-udev.rules ] ; then
    #the only things that are run as root
    cp plugin/lib/udev/rules.d/51-trezor-udev.rules /lib/udev/rules.d/
    udevadm control --reload
fi

sudo -u amnesia firefox/firefox 'https://www.mytrezor.com' -setDefaultBrowser
