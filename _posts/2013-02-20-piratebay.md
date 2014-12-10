---
layout: post
title: Pirate bay archival
description: Information about 2013 Pirate Bay archive and additional experiments
---

Update, 2014: As of December 2014, The Pirate Bay is down and people started to write me, if I don't have any updated version. I don't. Slightly more (july 2013) updated versions of TPB (and in CSV - probably easier to parse) are on those github repositories (not made by me):

* <https://github.com/tpb-archive/3xxxxxx>
* <https://github.com/tpb-archive/4xxxxxx>
* <https://github.com/tpb-archive/5xxxxxx>
* <https://github.com/tpb-archive/6xxxxxx>
* <https://github.com/tpb-archive/7xxxxxx>
* <https://github.com/tpb-archive/8xxxxxx>
* <https://github.com/tpb-archive/9xxxxxx>

I am not aware of any newer archive.

----

original article, from February 2013 (with working links):

*Note: Some people noticed that the XML files are not well-formed and valid. I have corrected that, see the bottom.*

[Some time ago, I did an experiment on how small I can make all pirate bay while keeping the important information.](http://thepiratebay.se/torrent/7016365/The_whole_Pirate_Bay_magnet_archive) People apparently liked it and it got *way* more popular than I expected.

Well, now some months later, I wanted to do two things - first, make it even smaller and correct all the mistakes I did before. Second - I wanted to create another version that will have all the additional metadata - most importantly, *all* the comments and text information. For me, pirate bay is not just the torrents, but mainly the additional information - how fake is the file? What can I really expect inside?

So I did both.

The "smaller" file [is for download here](http://www.torrenthound.com/hash/277e1afa0038db7299cd8274310556526599f67c/torrent-info/Small-pirate-bay-archive-february-2013) ([magnet](magnet:?xt=urn:btih:277e1afa0038db7299cd8274310556526599f67c&dn=Small+pirate+bay+archive+%28february+2013%29&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337)) - it has 76 MB 7zipped and it really has just names and magnet links.

The "bigger" file [is for download here](http://www.torrenthound.com/hash/e4b6f847647211b930219492ecf1a9c7bc696d29/torrent-info/Complete-Pirate-Bay-archive-february-2013-.) ([magnet](magnet:?xt=urn:btih:e4b6f847647211b930219492ecf1a9c7bc696d29&dn=Complete+Pirate+Bay+archive+%28february+2013%29.&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337)) - in 631 MB 7zipped, it has all the information about number of seeders, leechers (at the time of the download), magnet links, descriptions, size, and perhaps most importantly - **comments**. It does *not* contain the "big" torrent files.

Note: since the downloading itself took quite long, the data in the older torrents can be slightly out of date.

How I did it
---

With [this script, that walks through the torrents one by one](https://github.com/runn1ng/runn1ng.github.com/blob/master/piratebay.pl). Unlike the last time, this time I decided to output XML so people parsing it won't get it so crazy. Of course, I messed up the XML again; see the bottom.

Unfortunately, Pirate Bay always started blocking my computers (I guess they thought I am DDoSing them or something), so I had to switch from computer to computer. And because I wanted to make sure I really didn't miss any torrent, the whole thing took about 6 months. (...yep.)
 
Also, PirateBay had some downtimes during the download. I tried to "catch" them, but I still lost about 100-300 torrents. I am too lazy to sort them out now. Sorry.


Frankly, I can't wait to see what will people do with this stuff. And I like graphs, so I made some :)

Uploaded torrents
---
First, let's look at the most basic thing - how many torrents people upload a day? Is it growing or staying about the same? Let's put the days on X axis and number of torrents on Y axis.

![number of torrents uploaded](http://i.imgur.com/555rLCBl.png)

Well, as we can see, the number is growing, even when it's not as smooth as it could be. We can see some drops to zero, I guess it's the days when Pirate Bay was off.

Let's look at the cumulative functions - how much is the number of torrents growing over time?

![number of torrents cummulative](http://i.imgur.com/ncPwKgUl.png)


It's growing nicely. But despite what Pirate Bay says in its footer, I found only about 2 millions of torrents.

Number of seeders
---
Now, let's look at something else - is it true, that the newest torrents are seeded the most, or not? Let's put all the torrents on X axis, sort them by time, and put the number of seeders on Y axis. Once R finally crunches the numbers, we get this graph.

![number of seeders per time](http://i.imgur.com/TskOXyul.png)

We can see that except for some insanely popular torrents in the past, the more recent torrents are indeed the more seeded ones. However, when I tried to look at the seeder numbers closely, I realized one thing.

Slightly more than one third of the torrents have *no seeders at all*. Nothing. Actually, more than 3/4 of the torrents have *4 seeders or less*. 

On the other hand, a small number of torrents is insanely popular.

Of course, we can try to visualize this. If you try to graph the popularity on a linear scale and without cutting the very few outliers on the right, you get crazy graph like this. (On X is number of seeders, on Y number of torrents with that number of seeders.)

![Distribution of seeders](http://i.imgur.com/v7lZ6OSl.png)

Yeah, this is not going to work. Let's cut the outliers on the right (say, torrents with >2000 seeders) and let's put the y axis on logarithmic scale.

![Distribution of seeders log](http://i.imgur.com/mvZG6TTl.png)

Keep in mind that Y axis is on logarithmical scale. This is pretty crazy.

What's to take from this? Torrents on TPB are really, really unevenly seeded. Unfortunately, with no seeders, magnet links are useless. So, for about 1/3 of this archive, the magnet links are not really useful, and for 3/4, they are useful only if you are very lucky. OTOH, the actual torrents files would make this archive much bigger (and it's not really that small to begin with)

Words
---
Last but not the least, you can do fun stuff with the descriptions and comments themselves. Unluckily, I currently have no time to play with it, so I just looked at the names of the torrents, did some primitive tokenization and looked at the most favourite words in the torrent names. Well, the results speak for themselves :)

<table>
    <tr><td><b>Order</b></td><td><b>Appearances</b></td><td><b>Word</b></td></tr>
     <tr><td>     1 </td><td> 184015 </td><td>XviD</td></tr>
 <tr><td>     2 </td><td> 177920</td><td> The</td></tr>
      <tr><td>3 </td><td> 137824</td><td> HDTV</td></tr>
 <tr><td>     4 </td><td>  86804 </td><td>x264</td></tr>
  <tr><td>    5  </td><td> 74855 </td><td>DVDRip</td></tr>
   <tr><td>   6 </td><td>  65450 </td><td>720p</td></tr>
  <tr><td>    7 </td><td>  48845 </td><td>XXX</td></tr>
  <tr><td>    8 </td><td>  39148 </td><td>2011</td></tr>
 <tr><td>     9 </td><td>  34117 </td><td>2012</td></tr>
 <tr><td>    10  </td><td> 32547 </td><td>2010</td></tr>
  <tr><td>   11 </td><td>  31453 </td><td>avi</td></tr>
  <tr><td>   12  </td><td> 28516 </td><td>PDTV</td></tr>
 <tr><td>    13  </td><td> 27057 </td><td>VA</td></tr>
  <tr><td>   14  </td><td> 24888 </td><td>2009</td></tr>
  <tr><td>   15 </td><td>  24527 </td><td>com</td></tr>
   <tr><td>  16 </td><td>  22558 </td><td>AC3</td></tr>
   <tr><td>  17 </td><td>  22072 </td><td>A</td></tr>
   <tr><td>  18  </td><td> 21019 </td><td>2</td></tr>
  <tr><td>   19  </td><td> 19167 </td><td>WS</td></tr>
 <tr><td>    20  </td><td> 18563 </td><td>2008</td></tr>
 <tr><td>    21 </td><td>  18065 </td><td>1</td></tr>
 <tr><td>    22 </td><td>  17836 </td><td>480p</td></tr>
 <tr><td>    23 </td><td>  16610 </td><td>SWESUB</td></tr>
   <tr><td>  24 </td><td>  16140 </td><td>12</td></tr>
   <tr><td>  25 </td><td>  16123 </td><td>of</td></tr>
  <tr><td>   26 </td><td>  14861 </td><td>the</td></tr>
  <tr><td>   27  </td><td> 14300 </td><td>Of</td></tr>
  <tr><td>   28  </td><td> 13706 </td><td>Big</td></tr>
   <tr><td>  29  </td><td> 12662 </td><td>and</td></tr>
   <tr><td>  30  </td><td> 12592 </td><td>BluRay</td></tr>
   <tr><td>  31  </td><td> 12563 </td><td>DVDRiP</td></tr>
   <tr><td>  32  </td><td> 12421 </td><td>mSD</td></tr>
   <tr><td>  33  </td><td> 12233 </td><td>3</td></tr>
   <tr><td>  34  </td><td> 12019 </td><td>s</td></tr>
   <tr><td>  35  </td><td> 11701</td><td> XViD</td></tr>
   <tr><td>  36  </td><td> 11532 </td><td>2007</td></tr>
   <tr><td>  37 </td><td>  10978 </td><td>I</td></tr>
   <tr><td>  38 </td><td>  10898 </td><td>2HD</td></tr>
   <tr><td>  39 </td><td>  10556 </td><td>LOL</td></tr>
    <tr><td> 40  </td><td> 10504</td><td> 10</td></tr>

</table>

Well there you have it. All I have been able to squeeze from the archive for now, but I think more people will have more ideas. The links are on the top.

Update - XML
---
OK, I have messed the XML because of not escaping ampersand. Damn you, XML.

I made quick and *really really hacky* perl scripts that will make them both valid and well formed, see <https://github.com/runn1ng/pb-archive-make-valid>. 

The script needs perl, bash and sed, so you will need Linux (OS X will *maybe* be sufficient but I have nowhere to try).

