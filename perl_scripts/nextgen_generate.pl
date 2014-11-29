use strict;
use warnings;

use 5.010;
my $fn = $ARGV[0] || "neexistuje";
if ($fn =~ /\.ng$/) {
    $fn =~ s/\.ng$//;
}
if (! -e $fn.".ng") {
    die "neexistuje";
}

my $newname = $fn;
$newname =~ s/galleries/posts/;

open my $if, "<:utf8", $fn.".ng" or die "cant open in";
open my $of, ">:utf8", $newname.".md" or die "cant open out";


my $hack = 0;

my $max = 1;
my $is_ng = 0;
while (my $line = <$if>) {
    chomp $line;
    if (!$is_ng) {
        if ($line ne "[NG]") {
            print $of $line;
            print $of "\n";
        } else {
            if ($hack) {
                print $of "\n"
            } else {
                print $of "<div id='gall_$max' class='doGallery'>";
            }
            $is_ng = 1;
        }
    } else {
        if ($line eq "[/NG]") {
            if ($hack) {
                print $of "\n";
            } else {
                print $of "</div>\n";
            }
            $max++;
            $is_ng=0;
        } else {
            my ($thumb, $original) = split(/\s+/, $line);
            if ($hack) {
                print $of "\n";
            } else {
                print $of "<a href='$original'>\n";
                print $of "<img src='$thumb' class='obal'>\n";
                print $of "</a>\n";
            }
        }
    }
}

