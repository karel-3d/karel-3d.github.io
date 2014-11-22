---
layout: eman
title: eman basic concepts
---

The basic eman concepts:

Playground 
---

**Playground** is your directory, where you have all your experiments, data, everything.

Step
---

**Step** is one "closed" experiment.

It is basically anything that can be considered a single thing - let's say, "compile moses", "do GIZA alignment", "translate", "evaluate". The definition is kind of blurry :)

However what is important - *step can be dependent on other steps*, and step can be *run*. Step is usually run only *once* (if you want to run the same step, but with different settings, it is a new step).

Every step **has its own directory**, the name is usually in format

    s.type-of-step.hash-of-step.time-of-step

For example

    s.align.5f36ddaf.20121116-1141


This is a unique name of the step.

States
---
Steps have their own **states** - more on them later, maybe.

It's one of:

* NONEXISTENT
* INITED
* INITFAILED
* PREPARED
* PREPFAILED
* STARTING
* RUNNING
* FAILED
* DONE
* ABOLISHED
* OUTDATED

Seeds
---

Every step *type* has its own **seed**. The seed defines everything :) - what is done exactly, what it depends on, everything.

For example, if you look in the [eman.seeds directory in the ufal-smt-playground](https://redmine.ms.mff.cuni.cz/projects/ufal-smt-playground/repository/revisions/master/show/playground/eman.seeds), you will see several seeds. 

Variables
---
Some steps can have **variables**.

The variables define how the step will behave - for example, the name of the corpus it will create, or the type of search for mert, and so on.

*(technical note - those are converted to UNIX environment variables later, so the rules for env. variable names apply here.)*

Every step **is determined** by the seed and variables. This will be useful to know later when cloning steps.

Cloning
---
Steps can be **cloned**. When you clone a step, it will make a new step with the same seed (taken from the eman.seeds directory) and the same variables. 

*important* - you can change seed of the step itself without changing the "mother" seed from *eman.seeds*. However, if you clone the step, it will use the "mother" seed again.

Corpman
---
Eman is somehow using another program called **corpman**; corpman is a black magic to me. It somehow manages your corpora in various phases, but I am never sure what is it actually doing.

It seems to be in a very alpha state.

