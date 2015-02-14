RELEASEFF=35.0.1
RELEASEPLUG=1.0.5

wget https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/$RELEASEFF/linux-i686/en-US/firefox-$RELEASEFF.tar.bz2
tar vxzf firefox-$RELEASEFF.bz2
wget http://karelbilek.com/tails/browser-plugin-trezor_$RELEASEPLUG""_i386.deb
dpkg -x browser-plugin-trezor_$RELEASEPLUG""_i1386.deb ./plugin
