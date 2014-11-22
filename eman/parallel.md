---
layout: eman
title: eman parallelized giza, moses
---

NOTE: I changed some stuff in core eman and in steps themselves myself, in order for parallelization to work better, but now I am not sure if these notes are even relevant anymore. I am not at school anymore so I can't try. Sorry!

I know I have added EMAN\_CORES and EMAN\_MEM stuff as step variables, and I don't see it here. So this is probably not relevant anymore. Sorry again! Ask Aleš or Ondřej Bojar :)

Giza
---
For parallel giza, you need to start step mgiza and put it as GIZASTEP (not as MOSESSTEP!) in align steps whenever possible.

You also need to set up CORES for the align steps. (4 seems ideal.)

Moses
---
For parallel moses, you have to set up, for example,


    JOBS=10 MOSESFLAGS="-th 4" \ 
      GRIDFLAGS=" -hard -l mf=30g -l h_vmem=30g -l mnth_free=20g -pe smp 4"


for 10 jobs, each with 4 cores, so it eats (I guess) 40 cores on 10 different machines (if you have cluster).

"th -4" and "-pe smp 4" is important for cores

other stuff in GRIDFLAGS are for sge

