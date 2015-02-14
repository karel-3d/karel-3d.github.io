#wget -q -O - http://karelbilek.com/tails/run.sh | sudo bash
RELEASEFF=35.0.1
RELEASEPLUG=1.0.5

sudo -u amnesia wget https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/$RELEASEFF/linux-i686/en-US/firefox-$RELEASEFF.tar.bz2
sudo -u amnesia tar vxjf firefox-$RELEASEFF.tar.bz2
sudo -u amnesia wget http://karelbilek.com/tails/browser-plugin-trezor_$RELEASEPLUG""_i386.deb
dpkg -i browser-plugin-trezor_$RELEASEPLUG""_i386.deb
udevadm control --reload
sudo -u amnesia firefox/firefox www.mytrezor.com -setDefaultBrowser