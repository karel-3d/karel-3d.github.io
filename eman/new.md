---
layout: eman
title: eman running on new data
---

OK, now you tried the toy data. Now you want to learn the machine translation on your valuable data set. What to 
do?

There are two ways I guess.

* you can create the steps yourselves
* you can take some existing experiment, make a traceback, replace the variables and clone.

What I usually do:

* **the corpus** I create as a new step (the "first" way)
* however, for other experiments, I clone existing steps, with changed corpus description and changed corpus step (the "second" way)

Creating a new corpus
--
What is important to note here is that *eman doesn't divide the data to test, train, dev*. You will have to do it
 yourself outside of eman. (So, for example, you can't have dev set size as a variable for a training step.)

This can be seen as a bug or as a feature; anyway, it is 100% intentional.

So, let's suppose you have the data in files like these:

    en.train  fr.train  en.dev  fr.dev  en.test  fr.test

And let's suppose those are just forms, nothing like lemmas or tags.

Let's look at what is needed to create a new corpus out of this.

Variables
---
Needed variables for creating a corpus step are:

* **OUTLINECOUNT** - how many lines will the corpus have. Useful for checking if everything worked all right.
* **OUTFACTS** - the factor. We can't use other factors yet, just "form".
* **OUTLANG** - the name of the language. We want a *single side corpus* in the corpus step! If we have parallel corpus, we will have to divide it into two different corpora with different languages.
* **OUTCORP** - the name of the "whole corpus".
Why the quotes? As I wrote earlier, the corpora is not divided to test-train-dev, so we have to write this to this
name. However, we don't write the language in the name.
So, the expected OUTCORP is something like "supercorpus-train" (not just "supercorpus" and not "supercorpus-train-en")
* **TAKE\_FROM\_COMMAND** - the command that needs to be run to get the corpus.What does that mean exactly?

The corpus is a result from STDOUT of the command.

The command is run from INSIDE THE DIRECTORY beginning with s.corpus.(....), so additional `../` is often needed.

The result **must** have the **exact** same number of lines as OUTLINECOUNT.

Example
---
So, if I have the files as described, I will run commands like these


    OUTCORP=supercorpus-train OUTLANG=en OUTFACTS=form  OUTLINECOUNT=30000 \ 
        TAKE_FROM_COMMAND="cat /path/to/corpus/en.train" eman init -start corpus

    OUTCORP=supercorpus-train OUTLANG=fr OUTFACTS=form  OUTLINECOUNT=30000 \ 
        TAKE_FROM_COMMAND="cat /path/to/corpus/fr.train" eman init -start corpus


and so on and so forth, for train, test and dev.

**WARNING WARNING**

For some reason (if it wasn't corrected already), if you have pipe in the command and any later command is ended before the former command in pipe (for example, `zcat something.tgz | head 1000` where head is ended sooner than zcat), eman thinks the pipe signal is an error signal and breaks everything.

It can be however written as 

    TAKE_FROM_COMMAND="bash -c 'zcat something.tgz | head 1000'"

and everyone is happy, because bash will "eat" the pipe signal.

Corpman black magic
---
We can look at what corpman thinks, because corpman is important for things. First we have to reindex to be sure of things.

    ./corpman reindex

Now we can look at the corpora we have

    ./corpman ls

and if we see corpus we like and we would like it to view (just to check)

    ./corpman -dump sample-cs-en-mini-train/en+form | less

Changing the example
----

So now, we have an "old" example step (from the previous page) with large tree of substeps, and we have a new corpus.

We can now change the old step by **replacing** the parts of the traceback, dealing with corpus, while keeping the other intact. We will use another two features of eman traceback. First:


    eman traceback -s /foo/bar/


which will take the foo and replace it with bar in the whole traceback. (you can "catch" even the variable names, -s /VAR=a/VAR=b/)

*Note - you can do this yourself, by just writing `eman traceback | sed 's/foo/bar/g/'`, it should do 100% the same thing*

Second:

    eman traceback --ignore corpus

You can ignore the corpus steps. **This is good**, because of the corpman magic, the right corpus will be used whenever necessary, but you do **not** want to run the same command as was done for the sample corpus!

So, in our example, we want to replace "sample-cs-en-mini" to "supercorpus" and "cs" to "ru", allright? So we can do

    eman tb s.evaluator.(our hash) --ignore corpus -s /sample-cs-en-mini/umc/ -s /en/ru/ | less


to be sure that we are right, and then

    eman tb s.evaluator.(our hash) --ignore corpus -s /sample-cs-en-mini/umc/ -s /en/ru/ | eman clone


and voila, we have a new step. The hash of the new step - if everything is OK - is printed on the bottom of the output.

We can now start the step by `eman start`, and based on the size of the corpus, we can take either a coffee break or a long sleep.

