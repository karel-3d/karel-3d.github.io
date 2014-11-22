---
layout: eman
title: eman prerequisities
---


You will need to have some standard Linux and Bash. Nobody will ever test it on anything else.

Perl is needed, too. You also need these modules (all on CPAN):

* [YAML::XS](https://metacpan.org/pod/YAML::XS)
* [File::Temp](https://metacpan.org/pod/File::Temp)
* [Carp](https://metacpan.org/pod/Carp)
* [Term::ANSIColor](https://metacpan.org/pod/Term::ANSIColor)
* [Getopt::Long](https://metacpan.org/pod/Getopt::Long)
* [Pod::Usage](https://metacpan.org/pod/Pod::Usage)
* [File::Basename](https://metacpan.org/pod/File::Basename)
* [File::Path](https://metacpan.org/pod/File::Path)
* [File::Spec](https://metacpan.org/pod/File::Spec)
* [Cwd](https://metacpan.org/pod/Cwd)
* [Digest](https://metacpan.org/pod/Digest)
* [Fcntl](https://metacpan.org/pod/Fcntl)

On UFAL, we use [Sun Grid Engine](http://gridscheduler.sourceforge.net/) for parallelization. In these notes I will sometimes mention this as "clusters"; what I mean by that is this Sun Grid Engine which runs on UFAL. Again I haven't tested any of this outside of our school network. SGE is **not needed at all**, but it makes everything go faster.

For Moses to work, you will need to have boost installed (it is not needed for eman per se, 
but you won't be able to do much without Moses).


