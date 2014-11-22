---
layout: eman
title: eman example experiment
---


Let's get started! 

Preparation
---
After you got the repos downloaded, test that

* you have the CPAN modules set up correctly. You will test it easily by for example running `perl -e 'use YAML::XS'`  -- if that works, perl is set up correctly.
* you have eman in your `$PATH`. You can test it by running `eman --man` - you should see the manual.
* you are in the `ufal-smt-playground/playground` directory. You will see there is some mess in there, but the important thing is there is `eman.seeds` directory there.

Babby's first step
---
You can try to create your first step by 

    eman init mosesgiza


This will create the first step, which is building Moses and Giza. This step will be needed for everything else. You can look at status of your steps by

    eman stat


The first step is **INITED**. This means that the step was successfully created.

The name of your step will be `s.mosesgiza.(hash).(date)`. You can use any unique part of that for identifying the step (useful are first few letters of the hash).

The next step after INITED is **PREPARED**. There are some differences between INITED and PREPARED, although I am not 100% sure. AFAIK, INITED means just that the step can be created, PREPARED that it could be run, but that doesn't say anything really.

It has to do something with the black magic with corpman.

You prepare your step by

    eman prepare (the hash)

The step is now prepared to run. You can now run the step...

    eman start (the hash)

You can do *eman start* even just on inited step, so the step *prepare* was not needed at all.

Eman will detect whether you have cluster or not. If you do, it will submit the job to cluster by `qsub`.

Anyway, the step is now **RUNNING**. You can read its output by reading the file

    (name of the step)/log

or (if it's running on cluster)

    (name of the step)/log.o(number of the job)

After the step is done, it will end it either **DONE** state (if all is well), or **FAILED** state (if something bad happened).

Reindexing
---
Because eman and corpman are not perfect, after every big change, we should reindex our inner eman and corpman state by

    eman reindex
    ./corpman reindex


I am not sure what this is doing, but I trust Aleš ;)

Traceback
---

Important part of eman is cloning existing steps, often doing by so-called **tracebacks** of another steps.

Traceback is a "tree" of the given step. Basically, by doing a traceback of a given step, you see the type of the step, the variable of the step, and the same thing for **all steps your step is dependent on**.

That means that basically, with just the traceback of the last step of the experiment, you can reconstruct everything.

Example traceback is in [eman.samples/cs-en-mini.traceback (click to view in UFAL redmine)](https://redmine.ms.mff.cuni.cz/projects/ufal-smt-playground/repository/revisions/master/entry/playground/eman.samples/cs-en-mini.traceback). This traceback takes a small example corpus of Czech and English, trains Moses on them, translates the test set and computes the BLEU scores. Again - we can reconstruct the whole experiment just by this traceback, and we will very soon.

You can do traceback of any step by

    eman traceback

Cloning
---

### Concept
Eman experiments can easily be cloned.

By **cloning** Eman means copying the type of the step and initing the new step from the seed with the same variables as the original step. It does *not* mean copying the results or the state or anything else.

Eman also does this for all the steps below -- but **only** if the step with the given type and variables is not
already there.

You can clone the step by inputting the traceback to STDIN of `eman clone`.

### Cloning example step
We looked at the example traceback in the last step. What we can do now is inputing the traceback to eman.


    cat eman.samples/cs-en-mini.traceback | eman clone


We cloned tons of new steps, all of them inited. We should now reindex just to be sure

    eman reindex
    ./corpman reindex


### Examining cloned steps

If you look at the example traceback, evaluator is the first one. If you look at your playground states


    eman stat


you see all your steps, most inited. If you copy the name of the evaluator, or at least remember the first few letters of the hash, you can look at its traceback too


    eman tb (name of evaluator or the hash)


Starting
---

Finally, you can start the whole thing.

    eman start (name of evaluator dir or the hash)


This will start not only the evaluator step, but more importantly all the steps on which the evaluator depends. 

If you have cluster available, eman will automatically submit jobs to cluster using `qsub`

You can now have a cup of tea. You can watch the progres by, for example,


    eman tb -status


`tb` for traceback and `-status` for status.

Reading BLEU
----
After everything is done and you finished your tea, you can read the scores in <code>(name of evaluator or the hash)/score</code>

Setting variables manually
----
What if you want to set variables manually though? (As we will further down) Easy peasy.

If you do just `eman init corpus`, you will see that it's not possible because you haven't set the variables.

    ~/playground $ eman init corpus

    Executing: INIT_ONLY=yes  EMAN_READONLY=yes ./eman.seed >&2
    The step needs the following variables:
    RUN_COMMAND ...  []
    COMBINE_PARTS ...  []
    TAKE_FROM_COMMAND ...  []
    STEPNAME ... input step name []
    FILENAME ... input file name []
    COLUMN ... input column in the file, or -1 [-1]
    FACTOR ... input factor in the column, or -1 [-1]
    OUTCORP ... output corpus name
        !!! OUTCORP was not defined.
    OUTLANG ... output language name
        !!! OUTLANG was not defined.
    OUTFACTS ... output factors sequence
        !!! OUTFACTS was not defined.
    OUTLINECOUNT ... forward check: expected number of lines
        !!! OUTLINECOUNT was not defined.
    DEPS ... steps we rely on []
    JOBS ... how many jobs to submit, 0 to disable SGE [15]
    DERIVED ... is the corpus derived from an existing one [0]
    Exit code: 1
    Failed to init the step. Removing s.corpus.8db66e86.20121127-0437

You can clearly see which are mandatory (those with !!!).

If you want to set, say, OUTCORP as "supercorpus", you do it easily as you would do with any environment variable. That is:

    ~/playground $ OUTCORP="supercorpus" eman init corpus

    Executing: INIT_ONLY=yes  EMAN_READONLY=yes ./eman.seed >&2
    The step needs the following variables:
    RUN_COMMAND ...  []
    COMBINE_PARTS ...  []
    TAKE_FROM_COMMAND ...  []
    STEPNAME ... input step name []
    FILENAME ... input file name []
    COLUMN ... input column in the file, or -1 [-1]
    FACTOR ... input factor in the column, or -1 [-1]
    OUTCORP ... output corpus name
    OUTLANG ... output language name
        !!! OUTLANG was not defined.
    OUTFACTS ... output factors sequence
        !!! OUTFACTS was not defined.
    OUTLINECOUNT ... forward check: expected number of lines
        !!! OUTLINECOUNT was not defined.
    DEPS ... steps we rely on []
    JOBS ... how many jobs to submit, 0 to disable SGE [15]
    DERIVED ... is the corpus derived from an existing one [0]
    Exit code: 1
    Failed to init the step. Removing s.corpus.c5d4fe77.20121127-0441

(without any semicolon between the definition and the command)

You can see that the OUTCORP is not missing anymore. The rest still is, though.


Initing with start
---
You can write `eman init -start` for starting the step immediately after init, the same with cloning.

I prefer to do this only with "small" steps, like copying corpus, but not with large steps with large traceback trees.
