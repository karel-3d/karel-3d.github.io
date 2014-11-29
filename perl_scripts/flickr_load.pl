use warnings;
use strict;
use 5.010;

use Flickr::API;

my $secret = $ARGV[0];
 my $api = Flickr::API->new({
    'key'    => 'a33562e1aa82c461cea6300d33c83bf9',
    'secret' => $secret,
    'unicode'=> 0,
});


my $response = $api->execute_method( 'flickr.photosets.getPhotos',
         {'photoset_id' => '72157649066427327',
           'extras'=>'url_l, url_q'});

print "Success: $response->{success}\n";
print "error: $response->{error_message}\n";

use Data::Dumper;

#print Dumper $response->{tree}->{children}->[1]->{children};
#my $things= [];
my @things = grep {$_->{type} eq "element"} @{$response->{tree}->{children}->[1]->{children}};
for (@things) {
    print $_->{attributes}->{url_q};
    print "\t";
    print $_->{attributes}->{url_l};
    print "\n";
}
